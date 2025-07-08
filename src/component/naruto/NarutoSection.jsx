import Image from "next/image"
import styles from './narutoSection.module.css'

export default function NarutoSection() {


    return(
        <>
            <section className={styles.narutoSection}>
                <div>
                    <div>
                        <h2 className="sectionTitle">Best of Naruto</h2>
                    </div>
                    
                    <div className={styles.narutoCardSection}>
                        <div className={styles.narutoCardDisplay}>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>1</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>2</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>3</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>                                
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>4</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>5</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.narutoCardDisplay}>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>6</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>7</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>8</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>                                
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>9</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.narutoCard}>
                                <Image src='/assets/snk.jpg' alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>10</span>
                                <div className={styles.hoverContent}>
                                    <h4>Attack on Titan</h4>
                                    <p>Action • Dark Fantasy</p>
                                    <p style={{textAlign:'end'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime officiis deserunt atque corrupti nobis blanditiis? Quasi est iure porro.</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}