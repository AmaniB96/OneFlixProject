'use client'
import { useMemo } from 'react'; // 1. Importer useMemo
import { useFilterStore } from '@/app/stores/filterStore'
import styles from './filterCards.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { generateDeterministicPrice } from '@/utils/pricing';

export default function FilterCards() {

    const animeList = useFilterStore(state => state.animeList)

    // 2. On mélange la liste de manière stable avec useMemo
    // La liste ne sera mélangée que lorsque `animeList` changera.
    const shuffledList = useMemo(() => {
        // On crée une copie pour ne pas modifier la liste originale dans le store
        return [...animeList].sort(() => Math.random() - 0.5);
    }, [animeList]);

    if (!shuffledList || shuffledList.length === 0) {
      return <div className={styles.FilterSection}>No anime found for this genre.</div>
    }
    
    return(
        <div className={styles.cardWrapper}>
            {/* 3. On utilise la liste mélangée pour l'affichage */}
            {shuffledList.map(anime => {
                const price = generateDeterministicPrice(anime.mal_id);
                return (
                    <div className={styles.card} key={anime.mal_id}>
                        <div className={styles.cardImageWrapper}>
                            <Image src={anime.images.jpg.large_image_url} alt={anime.title} fill className={styles.cardImage}/>
                            <div className={styles.cardOverlay}>
                                <div className={styles.cardRating}>
                                    <span>★</span>
                                    <span>{anime.score || 'N/A'}</span>
                                </div>
                                <Link 
                                    href={{
                                        pathname: `/anime/${anime.mal_id}`,
                                        query: { price: price }
                                    }} 
                                    className={styles.cardButton}
                                >
                                    Buy Now
                                </Link>
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
                )
            })}
        </div>
    )
}