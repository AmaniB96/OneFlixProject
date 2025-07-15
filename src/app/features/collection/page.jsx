'use client'
import { useCollectionStore } from '@/app/stores/collectionStore'
import Link from 'next/link'
import styles from './collection.module.css'
import Image from 'next/image' // Import the Image component

export default function CollectionPage() {
  const collection = useCollectionStore(state => state.collection);

  if (!collection || Object.keys(collection).length === 0) {
    return (
        <div className={styles.wrapper}>
            <h1>Your Collection</h1>
            <div className={styles.empty}>Your collection is empty.</div>
        </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className='sectionTitle'>Your Collection</h1>
      <div className={styles.collectionGrid}>
        {Object.values(collection).map(({ anime, episodes }) => (
          <div key={anime.mal_id} className={styles.animeCard}>
            <Link href={`/features/collection/${anime.mal_id}`}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={anime.images?.jpg?.large_image_url || '/placeholder.jpg'}
                  alt={anime.title}
                  fill
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{anime.title}</h2>
              </div>
            </Link>
            <div className={styles.cardMeta}>
                {episodes === "all" ? (
                    <span className={styles.badge}>Complete Series</span>
                ) : (
                    <span className={styles.badge}>{episodes.length} Episode{episodes.length > 1 ? 's' : ''}</span>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}