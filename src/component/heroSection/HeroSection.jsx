import Link from 'next/link';
import styles from './heroSection.module.css'



export default function HeroSection() {
  return (
    <div className={styles.heroText}>
      <h1>
        Every single animes you ever needed, in <span>ONE</span> place
      </h1>
      <button className="btn"><Link href='/features/discover'>Explore</Link></button>
    </div>
  );
}