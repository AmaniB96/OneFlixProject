import Image from "next/image"
import styles from './latestAnime.module.css'


export default function LatestAnime() {

    return(
        <>
            <section className={styles.latestSection}>
                <div>
                    <div>
                        <h2 className="sectionTitle">Latest Trend</h2>
                    </div>

                    <div className={styles.latestCardDisplay}>
                        <div className={styles.latestCard}>
                            <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                            <span className={styles.rank}>1</span>
                            <div className={styles.hoverContent}>
                                <h4>Attack on Titan</h4>
                                <p>Action • Dark Fantasy</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                <button className={styles.watchBtn}>Buy Now</button>
                            </div>
                        </div>
                        <div className={styles.latestCard}>
                            <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                            <span className={styles.rank}>2</span>
                            <div className={styles.hoverContent}>
                                <h4>Attack on Titan</h4>
                                <p>Action • Dark Fantasy</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                <button className={styles.watchBtn}>Buy Now</button>
                            </div>
                        </div>
                        <div className={styles.latestCard}>
                            <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                            <span className={styles.rank}>3</span>
                            <div className={styles.hoverContent}>
                                <h4>Attack on Titan</h4>
                                <p>Action • Dark Fantasy</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>                                
                                <button className={styles.watchBtn}>Buy Now</button>
                            </div>
                        </div>
                        <div className={styles.latestCard}>
                            <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                            <span className={styles.rank}>4</span>
                            <div className={styles.hoverContent}>
                                <h4>Attack on Titan</h4>
                                <p>Action • Dark Fantasy</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                <button className={styles.watchBtn}>Buy Now</button>
                            </div>
                        </div>
                        <div className={styles.latestCard}>
                            <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                            <span className={styles.rank}>5</span>
                            <div className={styles.hoverContent}>
                                <h4>Attack on Titan</h4>
                                <p>Action • Dark Fantasy</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                <button className={styles.watchBtn}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}