'use client'

import { useCartStore } from '../../stores/cartStore';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cart.module.css';
import { useAuthStore } from '../../stores/authStore';
import { useSession } from 'next-auth/react';
import { useCollectionStore } from '../../stores/collectionStore';
import { useOrderStore } from '../../stores/orderStore';
import { useBalanceStore } from '../../stores/balanceStore'; // Importer le store du solde
import { calculateDiscountedTotal } from '../../../utils/promo';

function getCardType(number) {
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'AMEX';
    return '';
}

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore();
    const { addAnime, addEpisode } = useCollectionStore();
    const { addOrder } = useOrderStore();
    const { balance, deductBalance } = useBalanceStore(); // Récupérer le solde et la fonction de déduction
    const [step, setStep] = useState('cart');
    const [paymentInfo, setPaymentInfo] = useState({ name: '', card: '', email: '', method: 'card' });
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' ou 'balance'
    const total = calculateDiscountedTotal(cart);
    const canPayWithBalance = balance >= total;

    // logique d'auth
    const { user } = useAuthStore();
    const { data: session } = useSession();
    const isAuthenticated = !!session || !!user;
    const router = useRouter();

   
    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/features/auth?redirect=/features/cart');
        }
    }, [isAuthenticated, router]);

    function handlePay(e) {
        e.preventDefault();

        if (paymentMethod === 'balance') {
            if (!canPayWithBalance) {
                alert("Your balance is insufficient for this purchase.");
                return;
            }
            // Déduire le montant du solde
            deductBalance(total);
        }

        const newOrder = {
            id: `order-${Date.now()}`,
            date: new Date().toISOString(),
            totalAmount: total,
            items: [...cart]
        };
        addOrder(newOrder);

        cart.forEach(item => {
            if (item.type === 'anime' && item.animeData) {
                addAnime(item.animeData); 
            } else if (item.type === 'episode' && item.animeData && item.episodeData) {
                addEpisode(item.animeData, item.episodeData);
            }
        });

        setStep('success');
        clearCart();
    }

    const cardType = getCardType(paymentInfo.card);

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.cartTitle}>Your Cart</h2>
            {step === 'cart' && (
                <>
                    {cart.length === 0 ? (
                        <div style={{ color: '#FAC402', padding: 16 }}>Your cart is empty.</div>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <Image src={item.image} alt={item.title} width={40} height={40} style={{ borderRadius: '8px' }} />
                                    <span className={styles.cartItemTitle}>{item.title}</span>
                                    <span className={styles.cartItemPrice}>{parseFloat(item.price).toFixed(2)} €</span>
                                    <button onClick={() => removeFromCart(item.id)} className={styles.cartRemoveBtn}>✕</button>
                                </div>
                            ))}
                            <div className={styles.cartTotal}>
                                {cart.length >= 5 && (
                                    <div className={styles.discountMessage}>
                                        4+1 discount applied !
                                    </div>
                                )}
                                Total: {total.toFixed(2)} €
                            </div>
                            <form onSubmit={handlePay} className={styles.cartForm}>
                                {/* Sélecteur de méthode de paiement */}
                                <div className={styles.paymentMethodSelector}>
                                    <label>
                                        <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                        Pay with Credit Card
                                    </label>
                                    <label className={!canPayWithBalance ? styles.disabled : ''}>
                                        <input type="radio" name="paymentMethod" value="balance" checked={paymentMethod === 'balance'} onChange={() => setPaymentMethod('balance')} disabled={!canPayWithBalance} />
                                        Pay with Balance ({balance.toFixed(2)} €)
                                    </label>
                                </div>

                                {/* Afficher les champs de la carte uniquement si cette méthode est sélectionnée */}
                                {paymentMethod === 'card' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Name on card"
                                            required
                                            value={paymentInfo.name}
                                            onChange={e => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                                            className={styles.cartInput}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            value={paymentInfo.email}
                                            onChange={e => setPaymentInfo({ ...paymentInfo, email: e.target.value })}
                                            className={styles.cartInput}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            required
                                            value={paymentInfo.card}
                                            onChange={e => setPaymentInfo({ ...paymentInfo, card: e.target.value })}
                                            className={styles.cartInput}
                                        />
                                        {cardType && (
                                            <div className={styles.cardType}>
                                                Detected card type: <strong>{cardType}</strong>
                                            </div>
                                        )}
                                    </>
                                )}
                                {paymentMethod === 'paypal' && (
                                    <div className={styles.paypalMock}>
                                        <p style={{ color: '#FAC402', marginBottom: 8 }}>
                                            You will be redirected to PayPal .
                                        </p>
                                        <input
                                            type="email"
                                            placeholder="PayPal Email"
                                            required
                                            value={paymentInfo.email}
                                            onChange={e => setPaymentInfo({ ...paymentInfo, email: e.target.value })}
                                            className={styles.cartInput}
                                        />
                                    </div>
                                )}
                                <button type="submit" className={styles.cartPayBtn}>
                                    Pay {total.toFixed(2)} €
                                </button>
                            </form>
                            <div className={styles.deliveryDetails}>
                                <h4>Delivery Details</h4>
                                <p>
                                    After payment, your movies/episodes will be available instantly in your account.<br />
                                    You will also receive a confirmation email with access instructions.
                                </p>
                            </div>
                            <div className={styles.legalSection}>
                                <h4>Legal & Policies</h4>
                                <p style={{ fontSize: '0.95rem', color: '#FAC402', marginTop: 8 }}>
                                    By completing your purchase, you agree to our terms and policies.
                                </p>
                            </div>
                        </>
                    )}
                </>
            )}
            {step === 'success' && (
                <div className={styles.successAnimationContainer}>
                    <div className={styles.checkmarkWrapper}>
                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                            <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h3 className={styles.successTitle}>Payment Successful!</h3>
                    <p className={styles.successText}>Thank you for your purchase.</p>
                    <p className={styles.successText}>Your digital products are now available in your account.</p>
                    <button 
                        onClick={() => router.push('/features/collection')} 
                        className={styles.successButton}
                    >
                        Go to My Collection
                    </button>
                </div>
            )}
        </div>
    );
}