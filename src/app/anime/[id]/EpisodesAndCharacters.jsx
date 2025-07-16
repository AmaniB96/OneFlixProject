'use client'
import { useState, useEffect } from 'react';
import { useEpisodeStore } from '../../stores/episodeStore';
import { useCartStore } from '../../stores/cartStore';
import styles from './animeDetails.module.css';

export default function EpisodesAndCharacters({ anime, ownedEpisodes }) {
    const { episodes, isLoading: isLoadingEpisodes, fetchEpisodes, lastPage, characters, isLoadingCharacters, fetchCharacters } = useEpisodeStore();
    const { cart, addToCart } = useCartStore();
    const [tab, setTab] = useState('episodes');
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredCharId, setHoveredCharId] = useState(null);

    // --- CORRECTION IS HERE ---
    // We extract the ID to use it as a stable dependency.
    const animeId = anime.mal_id;

    useEffect(() => {
        // We still pass the full 'anime' object to the function,
        // but the effect only re-runs if the ID or page changes.
        fetchEpisodes(anime, currentPage);
    }, [animeId, currentPage, fetchEpisodes]); // Use the stable 'animeId' here

    useEffect(() => {
        if (tab === 'characters') {
            fetchCharacters(animeId);
        }
    }, [animeId, tab, fetchCharacters]); // Also use the stable 'animeId' here

    const EPISODE_PRICE = 1.99;

    const episodesToDisplay = episodes; // We filter later based on ownership
    const isFullAnimeInCart = cart.some(item => item.id === anime.mal_id);

    return (
        <div className={styles.episodesSection}>
            <div className={styles.tabs}>
                <button
                    className={tab === 'episodes' ? styles.tabActive : styles.tab}
                    onClick={() => setTab('episodes')}
                >
                    Episodes
                </button>
                <button
                    className={tab === 'characters' ? styles.tabActive : styles.tab}
                    onClick={() => setTab('characters')}
                >
                    Main Characters & Voice Actors
                </button>
            </div>
            {tab === 'episodes' && (
                <>
                    <h3 style={{ color: "#FAC402", marginBottom: "18px", textAlign:'center' }}>
                        {anime.type === 'Movie' ? 'Movie' : 'Episodes'}
                    </h3>
                    {isLoadingEpisodes ? (
                        <div style={{ color: "#FAC402", padding: "16px" }}>Loading...</div>
                    ) : (
                        episodesToDisplay.length > 0 ? (
                            <div className={styles.episodesList}>
                                {episodesToDisplay.map(ep => {
                                    const isMovie = anime.type === 'Movie';
                                    const episodeId = isMovie ? anime.mal_id : `${anime.mal_id}-${ep.mal_id}`;
                                    
                                    // --- LOGIC CORRECTION IS HERE ---
                                    // 1. Check if the specific episode is owned
                                    const isEpisodeOwned = ownedEpisodes === 'all' || 
                                        (Array.isArray(ownedEpisodes) && ownedEpisodes.some(ownedEp => ownedEp.mal_id === ep.mal_id));

                                    // 2. Check if it's in the cart (only relevant if not owned)
                                    const isEpisodeInCart = cart.some(item => item.id === episodeId);
                                    const isButtonDisabled = isFullAnimeInCart || isEpisodeInCart;
                                    const cartTitle = isMovie ? anime.title : `${anime.title} - Ep ${ep.mal_id}: ${ep.title}`;

                                    return (
                                        <div key={ep.mal_id} className={styles.episodeCard}>
                                            <span className={styles.episodeNumber}>
                                                {isMovie ? 'Movie' : `Ep ${ep.mal_id}`}
                                            </span>
                                            <span className={styles.episodeTitle}>{ep.title}</span>
                                            
                                            {/* 3. Use a ternary operator to show Play or Buy */}
                                            {isEpisodeOwned ? (
                                                <a 
                                                    href={ep.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className={styles.playBtn}
                                                >
                                                    Play
                                                </a>
                                            ) : (
                                                <>
                                                    <span className={styles.episodePrice}>{EPISODE_PRICE.toFixed(2)} €</span>
                                                    <button
                                                        className={styles.episodeAddBtn}
                                                        disabled={isButtonDisabled}
                                                        onClick={() => addToCart({
                                                            id: episodeId, 
                                                            title: cartTitle,
                                                            image: anime.images.jpg.large_image_url,
                                                            price: EPISODE_PRICE,
                                                            type: isMovie ? 'movie' : 'episode',
                                                            animeData: anime,
                                                            episodeData: ep
                                                        })}
                                                    >
                                                        {isFullAnimeInCart ? 'Full Anime in Cart' : isEpisodeInCart ? 'In Cart' : isMovie ? 'Buy Movie' : 'Buy Episode'}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ color: "#FAC402", padding: "16px", textAlign: "center" }}>
                                No episodes found for this anime.
                            </div>
                        )
                    )}
                </>
            )}
            {tab === 'characters' && (
                <>
                    <h3 style={{ color: "#FAC402", marginBottom: "18px", textAlign:'center' }}>Main Characters & Voice Actors</h3>
                    {isLoadingCharacters ? (
                        <div style={{ color: "#FAC402", padding: "16px" }}>Loading characters...</div>
                    ) : (
                        <div className={styles.charactersList}>
                            {characters
                                .filter(char => char.role === 'Main')
                                .map(char => {
                                    const charId = char.character.mal_id;
                                    const charImg = char.character.images?.jpg?.image_url;
                                    const vaImg = char.voice_actors?.[0]?.person.images?.jpg?.image_url;
                                    const showVaImg = hoveredCharId === charId && vaImg;
                                    return (
                                        <div key={charId} className={styles.characterCard}>
                                            <img
                                                src={showVaImg ? vaImg : charImg}
                                                alt={char.character.name}
                                                className={styles.characterImg}
                                                width={60}
                                                height={60}
                                                onMouseEnter={() => setHoveredCharId(charId)}
                                                onMouseLeave={() => setHoveredCharId(null)}
                                            />
                                            <div>
                                                <span className={styles.characterName}>{char.character.name}</span>
                                                {char.voice_actors?.length > 0 && (
                                                    <span className={styles.voiceActor}>
                                                        VA: {char.voice_actors[0].person.name} ({char.voice_actors[0].language})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}