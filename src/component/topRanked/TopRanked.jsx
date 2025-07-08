import Image from 'next/image'
import styles from './topRanked.module.css'

export default function TopRanked() {
    return (
        <section className={styles.featured}>
            <div className={styles.container}>
                <h2 className='sectionTitle'>Top Ranked</h2>
                <div className={styles.featuredGrid}>
                    <div className={`${styles.featuredItem} ${styles.main}`}>
                        <Image src="/assets/snk.jpg" alt="Anime title" fill className={styles.cardImage}/>
                        <div className={styles.featuredContent}>
                            <h3 className={styles.featuredTitle}>Spirited Away</h3>
                            <p className={styles.featuredMeta}>Film • 2001 • Studio Ghibli</p>
                        </div>
                    </div>
                    <div className={`${styles.featuredItem} ${styles.secondary}`}>
                        <Image src="/assets/snk.jpg" alt="Anime title" fill className={styles.cardImage}/>
                        <div className={styles.featuredContent}>
                            <h3 className={styles.featuredTitle}>Your Name</h3>
                            <p className={styles.featuredMeta}>Film • 2016</p>
                        </div>
                    </div>
                    <div className={`${styles.featuredItem} ${styles.tertiary}`}>
                        <Image src="/assets/snk.jpg" alt="Anime title"fill className={styles.cardImage}/>
                        <div className={styles.featuredContent}>
                            <h3 className={styles.featuredTitle}>Princess Mononoke</h3>
                            <p className={styles.featuredMeta}>Film • 1997</p>
                        </div>
                    </div>
                    <div className={`${styles.featuredItem} ${styles.quaternary}`}>
                        <Image src="/assets/snk.jpg" alt="Anime title"fill className={styles.cardImage}/>
                        <div className={styles.featuredContent}>
                            <h3 className={styles.featuredTitle}>Akira</h3>
                            <p className={styles.featuredMeta}>Film • 1988 • Cyberpunk</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.AllTimeBest}>
                <p className={styles.AllTimeTitle}>All time best animes</p>
                <ul className={styles.bestAnimeCont}>
                    <div className={styles.bestAnimeDiv}>1. Test</div>
                    <div className={styles.bestAnimeDiv}>2. Test</div>
                    <div className={styles.bestAnimeDiv}>3. Test</div>
                    <div className={styles.bestAnimeDiv}>4. Test</div>
                    <div className={styles.bestAnimeDiv}>5. test</div>
                </ul>
            </div>
        </section>
    )
}