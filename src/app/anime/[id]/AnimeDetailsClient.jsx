'use client'

import Image from 'next/image';
import styles from './animeDetails.module.css';
import { useCartStore } from '../../stores/cartStore';


export default function AnimeDetails({ anime }) {

    const trailerId = anime.trailer?.youtube_id;    

    const { addToCart } = useCartStore();

    return (
        <section className={styles.detailsSection}>
            <div className={styles.heroDetails}>
                {trailerId && (
                    <div className={styles.videoBg}>
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
                    <div className={styles.meta}>
                        <span>{anime.type}</span>
                        <span>• {anime.season} {anime.year}</span>
                        <span>• {anime.episodes} episodes</span>
                        {anime.studios?.[0]?.name && <span>• {anime.studios[0].name}</span>}
                        {anime.rating && <span>• {anime.rating}</span>}
                    </div>
                    <div className={styles.score}>
                        <span>⭐ {anime.score || "N/A"}</span>
                        <span>({anime.scored_by || 0} votes)</span>
                    </div>
                    <div className={styles.genres}>
                        {anime.genres?.map((genre) => (
                            <span key={genre.mal_id} className={styles.genre}>
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <div className={styles.price}>{anime.price} €</div>
                    
                        <button onClick={() => addToCart({id: anime.mal_id, title: anime.title, image: anime.images.jpg.large_image_url, price: anime.price})} style={{width:'170px'}} href={anime.trailer.url} target="_blank" rel="noopener noreferrer"className={styles.trailerLink}>
                            Add to cart +
                        </button>
                
                </div>
            </div>
        <div className={styles.additionalInfo}>
            <h3>Synopsis</h3>
            <p className={styles.synopsis}>{anime.synopsis}</p>
            <div className={styles.extraInfo}>
                        <span><strong>Status:</strong> {anime.status}</span>
                        <span><strong>Duration:</strong> {anime.duration}</span>
                        {anime.aired?.string && <span><strong>Aired:</strong> {anime.aired.string}</span>}
                        {anime.source && <span><strong>Source:</strong> {anime.source}</span>}
                    </div>
        </div> 

        </section>
    );
}