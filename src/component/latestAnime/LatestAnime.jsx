import Image from "next/image"
import styles from './latestAnime.module.css'
// On n'a plus besoin de Link ici, il est dans le composant client
import BuyButtonClient from "./BuyButtonClient"; // Étape 2: Importer le nouveau composant

export default async function LatestAnime() {

    const res = await fetch('https://api.jikan.moe/v4/seasons/now', {
    next: { revalidate: 3600 }});

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
                                <Image src={element.images.webp.large_image_url} alt={element.title} fill className={styles.cardImage}/>
                                <span className={styles.rank}>{index+1}</span>
                                <div className={styles.hoverContent}>
                                    <h4>{element.title_english || element.title}</h4>
                                    <p>{element.genres[0]?.name}</p>
                                    <p>{element.synopsis.length > 120 ? element.synopsis.slice(0, 120) + '...': element.synopsis}</p>
                                    
                                    {/* Étape 2: Utiliser le composant client et lui passer l'anime */}
                                    <BuyButtonClient anime={element} />
                                    
                                </div>
                            </div>
                    ))}
                   </div> 
                </div>
            </section>

        </>
    )
}