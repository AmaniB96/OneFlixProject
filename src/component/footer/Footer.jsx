'use client' // Add this to make it a client component

import { useState } from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast'; 

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        toast.success(`Thank you for subscribing, ${email}!`);
        setEmail('');
    };

    return (
        <footer className={styles.footer}>
            {/* The Toaster component has been removed from here */}
            <div className={styles.footerTop}>
                <div className={styles.footerLogo}>
                    <Image 
                        src="/assets/logotest-removebg-preview.png"
                        alt="Oneflix Logo"
                        width={50}
                        height={50}
                    />
                    <p className={styles.logoText}><span>One</span>flix</p>
                </div>
                <div className={styles.footerLinks}>
                    <div className={styles.linkColumn}>
                        <h3>Explore</h3>
                        <Link href="/">Home</Link>
                        <Link href="/#topRanked">Top Ranked</Link>
                        <Link href="/#latestAnime">Latest Trend</Link>
                        <Link href="/features/collection">My Collection</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h3>More</h3>
                        <Link href="/features/discover">Discover</Link>
                        <Link href="/features/cart">Cart</Link>
                        <Link href="/features/myaccount">My Account</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h3>Social</h3>
                        <Link href="https://github.com/AmaniB96/OneFlixProject">Github</Link>
                        <Link href="https://www.linkedin.com/in/amani-b-783733190/">Linkedin</Link>
                    </div>
                </div>
                <div className={styles.newsletterSection}>
                    <h3>Join Our Newsletter</h3>
                    <p>Get updates on new animes and promotions.</p>
                    <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.newsletterInput}
                        />
                        <button type="submit" className={styles.newsletterButton}>Subscribe</button>
                    </form>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>Projet à but éducatif. Réalisé par Amani.</p>
            </div>
        </footer>
    );
}