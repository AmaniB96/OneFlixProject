'use client'

import { useEffect, useState } from "react"
import { UseAuthstore } from "../../stores/authStore"
import styles from './auth.module.css'
import { useRouter } from "next/navigation"


export default function Auth() {
    const {user, login, register,logout,loginError,registerError}= UseAuthstore()
    const [isLogin,setIsLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    if (user) {
        return (
            <div className={styles.splitContainer}>
                <div className={styles.leftSide}>
                    <video
                        className={styles.bgVideoLeft}
                        src="/videos/Bleach - TYBW - NCED2 (15).mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.formBox} style={{ position: 'relative', zIndex: 1 }}>
                        <h2>Welcome, {user.username}!</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.splitContainer}>
            <div className={styles.leftSide}>
                <video
                    className={styles.bgVideoLeft}
                    src="/videos/Bleach - TYBW - NCED2 (15).mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
            <div className={styles.rightSide}>
                <form
                    className={styles.formBox}
                    style={{ position: 'relative', zIndex: 1 }}
                    onSubmit={e => {
                        e.preventDefault();
                        isLogin ? login(username, password) : register(username, password);
                    }}
                >
                    <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                    <button type="button" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Create an account' : 'Already have an account? Login'}
                    </button>
                    {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                    {registerError && <div style={{ color: 'red' }}>{registerError}</div>}
                </form>
            </div>
        </div>
    );
}