import Image from "next/image"
import styles from './narutoSection.module.css'
import Link from "next/link";
import { generateDeterministicPrice } from '@/utils/pricing';


export default async function NarutoSection() {

    const res = await fetch('https://api.jikan.moe/v4/anime/20/episodes', {
    next: { revalidate: 3600 }
    });
    const data = await res.json()
    const filtered = data.data?.filter(ep => ep.score > 4.50) || [];
    const topNaruto1 = filtered.slice(0, 5);
    const topNaruto2 = filtered.slice(5, 10);

    const resImg= await fetch("https://api.jikan.moe/v4/anime/20/pictures")
    const dataImg= await resImg.json()
    const narutoImg = Array.isArray(dataImg.data)
                    ? dataImg.data.map(img => img.webp.large_image_url).slice(0, 5)
                    : [];
                    const narutoImg2 = Array.isArray(dataImg.data)
                    ? dataImg.data.map(img => img.webp.large_image_url).slice(5, 10)
                    : [];

    return(
        <>
            <section className={styles.narutoSection}>
                <div>
                    <div>
                        <h2 className="sectionTitle">Best of Naruto</h2>
                    </div>
                    
                    <div className={styles.narutoCardSection}>
                        <div className={styles.narutoCardDisplay}>
                            {topNaruto1.map((element, index) => {
                                const imgSrc = narutoImg[index];
                                const price = generateDeterministicPrice(20); 
                                return (
                                    <div key={index} className={styles.narutoCard}>
                                    {imgSrc ? (
                                        <Image src={imgSrc} alt="Naruto" fill className={styles.cardImage} />
                                    ) : (
                                        <Image src='/assets/naruto.jpg' alt="Naruto" fill className={styles.cardImage} />
                                    )}
                                    <span className={styles.rank}>{index + 1}</span>
                                    <div className={styles.hoverContent}>
                                        <h4>{element.title}</h4>
                                        <p>{element.mal_id}</p>
                                        <p style={{ textAlign: 'end' }}>{element.score}</p>
                                        <Link
                                            href={{
                                                pathname: `/anime/20`,
                                                query: { price }
                                            }}
                                            className={styles.watchBtn}
                                        >
                                            Buy Now
                                        </Link>
                                    </div>
                                    </div>
                                );
                                })}
                        </div>

                        <div className={styles.narutoCardDisplay}>
                            {topNaruto2.map((element, index) => {
                                const imgSrc1 = narutoImg2[index];
                                const price = generateDeterministicPrice(20);
                                return (
                                    <div key={index} className={styles.narutoCard}>
                                    {imgSrc1 ? (
                                        <Image src={imgSrc1} alt="Naruto" fill className={styles.cardImage} />
                                    ) : (
                                        <Image src='/assets/naruto.jpg' alt="Naruto" fill className={styles.cardImage} />
                                    )}
                                    <span className={styles.rank}>{index + 6}</span>
                                    <div className={styles.hoverContent}>
                                        <h4>{element.title}</h4>
                                        <p>{element.mal_id}</p>
                                        <p style={{ textAlign: 'end' }}>{element.score}</p>
                                        <Link
                                            href={{
                                                pathname: `/anime/20`,
                                                query: { price }
                                            }}
                                            className={styles.watchBtn}
                                        >
                                            Buy Now
                                        </Link>
                                    </div>
                                    </div>
                                );
                                })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}