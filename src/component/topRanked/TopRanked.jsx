import Image from 'next/image'
import styles from './topRanked.module.css'
import Link from 'next/link'
import { generateDeterministicPrice } from '@/utils/pricing'; // 1. Importer la fonction de prix

export default async function TopRanked() {

    const res = await fetch('https://api.jikan.moe/v4/top/anime', {
    next: { revalidate: 3600 }});
    const data = await res.json()
    const topRanked = data.data?.slice(0,4) || [];

    // On définit la liste des meilleurs animes pour la rendre plus facile à gérer
    const allTimeBest = [
        { id: 392, title: '1. Yu Yu Hakusho', style: 'yuyu' },
        { id: 5114, title: '2. Fullmetal Alchemist: Brotherhood', style: 'fma' },
        { id: 21, title: '3. One Piece', style: 'op' },
        { id: 20, title: '4. Naruto', style: 'naruto' },
        { id: 11061, title: '5. Hunter x Hunter', style: 'hxh' }
    ];

    return (
        <section className={styles.featured}>
            <div className={styles.container}>
                <h2 className="sectionTitle">Top Ranked</h2>
                <div className={styles.featuredGrid}>
                    {topRanked.map((anime, idx) => {
                        // 2. Générer le prix pour chaque anime
                        const price = generateDeterministicPrice(anime.mal_id);
                        return (
                            // 3. Passer le prix dans l'URL via la prop 'query'
                            <Link 
                                className={styles.featuredItem} 
                                key={anime.mal_id} 
                                href={{
                                    pathname: `/anime/${anime.mal_id}`,
                                    query: { price: price }
                                }}
                            >
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
                        )
                    })}
                </div>
            </div>

            <div className={styles.AllTimeBest}>
                <p className={styles.AllTimeTitle}>All time best animes</p>
                <ul className={styles.bestAnimeCont}>
                    {allTimeBest.map(anime => {
                        const price = generateDeterministicPrice(anime.id);
                        return (
                            <Link 
                                key={anime.id}
                                href={{
                                    pathname: `/anime/${anime.id}`,
                                    query: { price: price }
                                }} 
                                className={`${styles.bestAnimeDiv} ${styles[anime.style]}`}
                            >
                                {anime.title}
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </section>
    )
}