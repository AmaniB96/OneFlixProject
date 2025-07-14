'use client'

import { useCartStore } from '../../stores/cartStore';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cart.module.css';
import { useAuthStore } from '../../stores/authStore'; // adjust path as needed
import { useSession } from 'next-auth/react';

function getCardType(number) {
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'AMEX';
    return '';
}

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore();
    const [step, setStep] = useState('cart');
    const [paymentInfo, setPaymentInfo] = useState({ name: '', card: '', email: '', method: 'card' });
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

    // Auth logic
    const { user } = useAuthStore();
    const { data: session } = useSession();
    const isAuthenticated = !!session || !!user;
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/features/auth?redirect=/features/cart');
        }
    }, [isAuthenticated, router]);

    function handlePay(e) {
        e.preventDefault();
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
                                    <span className={styles.cartItemPrice}>{item.price} €</span>
                                    <button onClick={() => removeFromCart(item.id)} className={styles.cartRemoveBtn}>✕</button>
                                </div>
                            ))}
                            <div className={styles.cartTotal}>
                                Total: {total} €
                            </div>
                            <form onSubmit={handlePay} className={styles.cartForm}>
                                <label className={styles.cartLabel}>Choose payment method:</label>
                                <div className={styles.paymentMethods}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="method"
                                            value="card"
                                            checked={paymentInfo.method === 'card'}
                                            onChange={e => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                                        /> Credit Card
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="method"
                                            value="paypal"
                                            checked={paymentInfo.method === 'paypal'}
                                            onChange={e => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                                        /> PayPal
                                    </label>
                                </div>
                                {paymentInfo.method === 'card' && (
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
                                {paymentInfo.method === 'paypal' && (
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
                                    Pay {total} €
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
                <div className={styles.cartSuccess}>
                    <h3>Payment Successful!</h3>
                    <p>Thank you for your purchase.</p>
                    <p>Your digital products are now available in your account.</p>
                </div>
            )}
        </div>
    );
}