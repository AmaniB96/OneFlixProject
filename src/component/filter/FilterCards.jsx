'use client'
import { useFilterStore } from '@/app/stores/filterStore'
import styles from './filterCards.module.css'
import Image from 'next/image'
import Link from 'next/link'


export default function FilterCards() {

    const animeList = useFilterStore(state => state.animeList)

    if (!animeList || animeList.length === 0) {
      return <div className={styles.FilterSection}>No anime found for this genre.</div>
    }
    
    return(
        <div className={styles.cardWrapper}>
            {animeList.map(anime => (
                <div className={styles.card} key={anime.mal_id}>
                    <div className={styles.cardImageWrapper}>
                        <Image src={anime.images.jpg.large_image_url} alt={anime.title} fill className={styles.cardImage}/>
                        <div className={styles.cardOverlay}>
                            <div className={styles.cardRating}>
                                <span>★</span>
                                <span>{anime.score || 'N/A'}</span>
                            </div>
                            <Link href={`/anime/${anime.mal_id}`} className={styles.cardButton}>Watch Now</Link>
                        </div>
                    </div>
                    <div className={styles.cardInfo}>
                        <h3 className={styles.cardTitle}>{anime.title}</h3>
                        <div className={styles.cardMeta}>
                            <span className={styles.cardYear}>{anime.year}</span>
                            <span className={styles.cardEpisodes}>{anime.episodes} Episodes</span>
                        </div>
                        <div className={styles.cardTags}>
                            {anime.genres.map(g => (
                                <span className={styles.tag} key={g.mal_id}>{g.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}