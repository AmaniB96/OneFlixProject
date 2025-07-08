import Image from "next/image"
import styles from './latestAnime.module.css'


export default async function LatestAnime() {

    const res = await fetch('https://api.jikan.moe/v4/seasons/now')
    const data = await res.json()
    const latestAnime= data.data?.slice(6,11) || [];

    return(
        <>
            <section className={styles.latestSection}>
                <div>
                    <div>
                        <h2 className="sectionTitle">Latest Trend</h2>
                    </div>

                    <div className={styles.latestCardDisplay}>
                    {latestAnime.map((element,index) => (
                        
                            <div key={index} className={styles.latestCard}>
                                <Image src={element.images.webp.large_image_url} alt='SNK' fill className={styles.cardImage}/>
                                <span className={styles.rank}>{index+1}</span>
                                <div className={styles.hoverContent}>
                                    <h4>{element.title_english}</h4>
                                    <p>{element.genres[0].name}</p>
                                    <p>{element.synopsis.length > 120 ? element.synopsis.slice(0, 120) + '...': element.synopsis}</p>
                                    <button className={styles.watchBtn}>Buy Now</button>
                                </div>
                            </div>
                    ))}
                   </div> 
                </div>
            </section>

        </>
    )
}