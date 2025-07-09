import Image from 'next/image'
import styles from './topRanked.module.css'
import Link from 'next/link'


export default async function TopRanked() {

    const res = await fetch('https://api.jikan.moe/v4/top/anime')
    const data = await res.json()
    const topRanked = data.data?.slice(0,4) || [];

    return (
        <section className={styles.featured}>
            <div className={styles.container}>
                <h2 className="sectionTitle">Top Ranked</h2>
                <div className={styles.featuredGrid}>
                    {topRanked.map((anime, idx) => (
                        <Link className={styles.featuredItem} key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                        <div>
                            <Image
                                src={anime.images.webp.large_image_url}
                                alt={anime.title}
                                fill
                                className={styles.cardImage}
                            />
                            <div className={styles.featuredContent}>
                                <h3 className={styles.featuredTitle}>{anime.title}</h3>
                                <p className={styles.featuredMeta}>
                                    {anime.type} • {anime.year} {anime.studios?.[0]?.name && `• ${anime.studios[0].name}`}
                                </p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className={styles.AllTimeBest}>
                <p className={styles.AllTimeTitle}>All time best animes</p>
                <ul className={styles.bestAnimeCont}>
                    <div className={`${styles.bestAnimeDiv} ${styles.yuyu}`}>1. Yu Yu Hakusho</div>
                    <div className={`${styles.bestAnimeDiv} ${styles.fma}`}>2. Fullmetal Alchemist: Brotherhood</div>
                    <div className={`${styles.bestAnimeDiv} ${styles.op}`}>3. One Piece</div>
                    <div className={`${styles.bestAnimeDiv} ${styles.naruto}`}>4. Naruto</div>
                    <div className={`${styles.bestAnimeDiv} ${styles.hxh}`}>5. Hunter x Hunter</div>
                </ul>
            </div>
        </section>
    )
}