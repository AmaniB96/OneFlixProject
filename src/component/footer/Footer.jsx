import styles from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.footer}>
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
                        <Link href="/discover">Home</Link>
                        <Link href="/trending">Top Ranked</Link>
                        <Link href="/genres">Lastest Trend</Link>
                        <Link href="/studios">My Favorites</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h3>More</h3>
                        <Link href="/about">Discover</Link>
                        <Link href="/contact">Cart</Link>
                        <Link href="/help">My account</Link>
                        <Link href="/terms">Terms of Use</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h3>Social</h3>
                        <Link href="">Github</Link>
                        <Link href="">Linkedin</Link>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>Projet à but éducatif. Réalisé par Amani.</p>
            </div>
        </footer>
    );
}