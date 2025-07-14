'use client'

import Image from 'next/image'
import style from './mainNav.module.css'
import Link from 'next/link'
import { UseAuthstore } from '@/app/stores/authStore'
import { useState } from 'react'
import { signOut,useSession } from 'next-auth/react'
import {useCartStore} from '../../app/stores/cartStore'


export default function MainNav() {
    const { user,logout } = UseAuthstore();
    const [open, setOpen] = useState(false);
    const {data: session} = useSession();
    const { cart, removeFromCart } = useCartStore();
    const [cartOpen, setCartOpen] = useState(false);

    const username = session?.user?.name || user?.usename;

    const isAuthenticated = !!session || !!user;


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
                    <Image  onMouseEnter={() => setCartOpen(true)}  className={style.cartIcon} alt='cart' width={30} height={30} src='/assets/shopping-bag-svgrepo-com.svg'></Image>
                    {cart.length > 0 && (
                        <span className={style.cartCount}>{cart.length}</span>
                    )}
                    {cartOpen && (
                        <div className={style.cartPreview}>
                            <h4>Cart</h4>
                            {cart.length === 0 ? (
                                <div className={style.cartEmpty}>Your cart is empty</div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className={style.cartItem}>
                                        <Image src={item.image} alt={item.title} width={40} height={40} />
                                        <span>{item.title}</span>
                                        <span style={{whiteSpace:'nowrap', paddingRight:'15px'}}>{item.price} €</span>
                                        <button onClick={() => removeFromCart(item.id)}>✕</button>
                                    </div>
                                ))
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
                                    {session ? (
                                        <button
                                            className={style.dropdownBtn}
                                            onClick={() => {
                                                signOut();
                                                setOpen(false);
                                            }}
                                        >
                                            Logout
                                        </button>
                                    ) : (
                                        <button
                                            className={style.dropdownBtn}
                                            onClick={() => {
                                                logout();
                                                setOpen(false);
                                            }}
                                        >
                                            Logout
                                        </button>
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