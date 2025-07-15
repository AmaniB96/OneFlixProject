'use client'

import Image from 'next/image'
import style from './mainNav.module.css'
import Link from 'next/link'
import { useAuthStore } from '@/app/stores/authStore'
import { useState } from 'react'
import { signOut,useSession } from 'next-auth/react'
import { useCartStore } from '../../app/stores/cartStore'
import { useCollectionStore } from '@/app/stores/collectionStore';
import { calculateDiscountedTotal } from '@/utils/promo'; // 1. Importez la nouvelle fonction
import { useOrderStore } from '@/app/stores/orderStore';
import { useBalanceStore } from '@/app/stores/balanceStore'; // Importer le store du solde

export default function MainNav() {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const { cart, removeFromCart, clearCart } = useCartStore();
    const [cartOpen, setCartOpen] = useState(false);
    const clearCollection = useCollectionStore(state => state.clearCollection);
    const { clearOrders } = useOrderStore();
    const { clearBalance } = useBalanceStore(); // Récupérer la fonction

    const username = session?.user?.name || user?.username;
    const isAuthenticated = !!session || !!user;

    const handleLogout = async () => {
        // 1. Clear user-specific data
        clearCollection();
        clearCart();
        clearOrders();
        clearBalance(); // Vider le solde

        // 2. Sign the user out
        await signOut({ callbackUrl: '/' }); // Redirect to home page after logout
    };

    const handleCustomLogout = () => {
        // 1. Clear user-specific data
        clearCollection();
        clearCart();
        clearOrders();
        clearBalance(); //

        // 2. Log out from custom auth store
        logout();
        setOpen(false);
    };

    // 2. Calculez le total en utilisant la fonction
    const total = calculateDiscountedTotal(cart);

    return (
        <div className={style.MainNav}>
            <Link href='/' className={style.logoDiv}>
                <Image
                    className={style.logoOne}
                    src="/assets/logotest-removebg-preview.png"
                    width={80}
                    height={80}
                    alt="Logo"
                />
                <p className={style.logoText}><span>One</span>flix</p>
            </Link>
            <div className={style.leftNavSide}>
                <div onMouseLeave={() => setCartOpen(false)} style={{display:'flex', alignItems:'center', gap:'15px', position:'relative'}}>
                    <div style={{position:'relative'}}><Image  onMouseEnter={() => setCartOpen(true)}  className={style.cartIcon} alt='cart' width={30} height={30} src='/assets/shopping-bag-svgrepo-com.svg'></Image>
                    {cart.length > 0 && (
                        <span className={style.cartCount}>{cart.length}</span>
                    )}</div>
                    {cartOpen && (
                        <div className={style.cartPreview}>
                            <h4>Cart</h4>
                            {cart.length === 0 ? (
                                <div className={style.cartEmpty}>Your cart is empty</div>
                            ) : (
                                <>
                                    {cart.map(item => (
                                        <div key={item.id} className={style.cartItem}>
                                            <Image src={item.image} alt={item.title} width={40} height={40} />
                                            <span>{item.title}</span>
                                            <span style={{whiteSpace:'nowrap', paddingRight:'15px'}}>{item.price} €</span>
                                            <button onClick={() => removeFromCart(item.id)}>✕</button>
                                        </div>
                                    ))}

                                    {/* 3. Affichez un message si la promotion est active */}
                                    {cart.length >= 5 && (
                                        <div className={style.discountMessage}>
                                            Promotion "4+1 gratuit" appliquée !
                                        </div>
                                    )}

                                    <div className={style.cartTotal}>
                                        <strong>Total: </strong>
                                        {/* 4. Affichez le total calculé */}
                                        {total.toFixed(2)} €
                                    </div>
                                    <Link
                                        href='/features/cart'
                                        className={style.checkoutBtn}
                                        onClick={() => setCartOpen(false)} // Ferme le panier en cliquant
                                    >
                                        Checkout
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                    {isAuthenticated ? (
                        <>
                            <span
                                className={style.btn}
                                onClick={() => setOpen(!open)}
                                style={{ cursor: 'pointer' }}
                            >
                                Hi {username} ▼
                            </span>
                            {open && (
                                <div className={style.dropdown}>
                                    {/* Lien vers la page Mon Compte */}
                                    <Link
                                        href="/features/myaccount"
                                        className={style.dropdownBtn}
                                        onClick={() => setOpen(false)} // Ferme le dropdown au clic
                                    >
                                        My Account
                                    </Link>

                                    {/* Logique de déconnexion existante */}
                                    {session ? (
                                        <button className={style.dropdownBtn} onClick={handleLogout}>Logout</button>
                                    ) : (
                                        <button className={style.dropdownBtn} onClick={handleCustomLogout}>Logout</button>
                                    )}
                                </div>
                            )}
                        </>
                    ) : <Link href='/features/auth' className={style.btn}>Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}