'use client'

import Image from 'next/image'
import style from './mainNav.module.css'
import Link from 'next/link'
import { UseAuthstore } from '@/app/stores/authStore'
import { useState } from 'react'



export default function MainNav() {
    const { user,logout } = UseAuthstore();
    const [open, setOpen] = useState(false);

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
                <div>
                    {user ? (
                        <>
                            <span
                                className={style.btn}
                                onClick={() => setOpen(!open)}
                                style={{ cursor: 'pointer' }}
                            >
                                Hi {user.username} ▼
                            </span>
                            {open && (
                                <div className={style.dropdown}>
                                    <button
                                        className={style.dropdownBtn}
                                        onClick={() => {
                                            logout();
                                            setOpen(false);
                                        }}
                                    >
                                        Logout
                                    </button>
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