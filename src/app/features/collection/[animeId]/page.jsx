'use client'
import { useCollectionStore } from '@/app/stores/collectionStore'
import { useParams } from 'next/navigation'
import EpisodesAndCharacters from '@/app/anime/[id]/EpisodesAndCharacters'
import styles from '@/app/anime/[id]/animeDetails.module.css'
import Image from 'next/image'

export default function CollectionAnimeDetailsPage() {
  const { animeId } = useParams();
  const collection = useCollectionStore(state => state.collection);
  const entry = collection[animeId];

  if (!entry) {
    return <div className={styles.wrapper}>This item is not in your collection.</div>;
  }

  const { anime, episodes: ownedEpisodes } = entry;
  const trailerId = anime.trailer?.youtube_id;

  const synopsisText = anime.synopsis || '';
  const bracketIndex = synopsisText.indexOf('[');
  const shortSynopsis = bracketIndex !== -1 ? synopsisText.substring(0, bracketIndex).trim() : synopsisText;

  return (
    <section className={styles.detailsSection}>
        <div className={styles.heroDetails}>
            {trailerId && (
                <div className={`${styles.videoBg} ${styles.collectionVideoBg}`} >
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailerId}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="Trailer Background"
                    />
                </div>
            )}
            <div className={styles.coverImage}>
                <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className={styles.img}
                />
            </div>
            <div className={styles.heroText}>
                <h1 className={styles.title}>{anime.title_english || anime.title}</h1>
            </div>
        </div>
        
        <div className={styles.additionalInfo}>
            <h3>Synopsis</h3>
            <p className={styles.synopsis}>{shortSynopsis}</p>
        </div> 
        
        {/* On passe les episodes achetés en props */}
        <EpisodesAndCharacters anime={anime} ownedEpisodes={ownedEpisodes} />
    </section>
  );
}