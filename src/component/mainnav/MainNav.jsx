'use client'

import Image from 'next/image'
import style from './mainNav.module.css'
import Link from 'next/link'
import { UseAuthstore } from '@/app/stores/authStore'
import { useState } from 'react'
import { signOut,useSession } from 'next-auth/react'


export default function MainNav() {
    const { user,logout } = UseAuthstore();
    const [open, setOpen] = useState(false);
    const {data: session} = useSession();

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
                <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                    <Image className={style.cartIcon} alt='cart' width={30} height={30} src='/assets/shopping-bag-svgrepo-com.svg'></Image>

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