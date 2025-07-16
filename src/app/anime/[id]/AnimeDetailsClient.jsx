'use client'

import Image from 'next/image';
import styles from './animeDetails.module.css';
import { useCartStore } from '../../stores/cartStore';
// We no longer need useEpisodeStore in this component
// import { useEpisodeStore } from '../../stores/episodeStore';
import { useState } from 'react'; // useEffect is no longer needed here
import EpisodesAndCharacters from './EpisodesAndCharacters';
import { useSearchParams } from 'next/navigation';

export default function AnimeDetails({ anime }) {
    
    const searchParams = useSearchParams();
    const { cart, addToCart } = useCartStore();
    // This is no longer needed here
    // const { episodes, fetchEpisodes } = useEpisodeStore();

    const priceFromQuery = searchParams.get('price');
    const price = anime.price ?? priceFromQuery ?? 'N/A'; 

    const isInCart = cart.some(item => item.id === anime.mal_id);
    const trailerId = anime.trailer?.youtube_id;

    // --- CORRECTION: REMOVE THE USEEFFECT ---
    // This useEffect was causing a race condition with the one in EpisodesAndCharacters.
    // The fetching logic now lives entirely within the child component.
    /*
    useEffect(() => {
        fetchEpisodes(anime.mal_id, currentPage);
    }, [anime.mal_id, currentPage, fetchEpisodes]);
    */

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
                    <div className={styles.price}>{parseFloat(price).toFixed(2)} €</div>
                    
                        {/* 4. Logique conditionnelle pour le bouton */}
                        <button 
                            onClick={() => addToCart({
                                // Pass only the necessary, serializable data
                                id: anime.mal_id, 
                                title: anime.title, 
                                image: anime.images.jpg.large_image_url, 
                                price: parseFloat(price) || 0, // Ensure price is a number
                                type: 'anime',
                                // Pass the full anime object under a separate, specific key
                                animeData: anime 
                            })} 
                            style={{width:'170px'}} 
                            className={styles.trailerLink}
                            disabled={isInCart} // Désactive le bouton si l'article est dans le panier
                        >
                            {isInCart ? 'Already in Cart' : 'Add to Cart +'}
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
        
         {/* This component is now solely responsible for fetching and displaying episodes */}
         <EpisodesAndCharacters anime={anime} />
        </section>
    );
}