import { useState, useEffect } from 'react';
import styles from './animeDetails.module.css';
import { useCartStore } from '../../stores/cartStore';
import { useEpisodeStore } from '../../stores/episodeStore';


const EPISODE_PRICE = 2.99;

export default function EpisodesAndCharacters({ anime }) {
    const { addToCart } = useCartStore();
    const {
        episodes,
        isLoadingEpisodes,
        fetchEpisodes,
        lastPage,
        characters,
        isLoadingCharacters,
        fetchCharacters
    } = useEpisodeStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [tab, setTab] = useState('episodes');
    const [hoveredCharId, setHoveredCharId] = useState(null);


    useEffect(() => {
        if (tab === 'episodes') {
            fetchEpisodes(anime.mal_id, currentPage);
        }
    }, [anime.mal_id, currentPage, tab, fetchEpisodes]);

    useEffect(() => {
        if (tab === 'characters') {
            fetchCharacters(anime.mal_id);
        }
    }, [anime.mal_id, tab, fetchCharacters]);


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
                    <h3 style={{ color: "#FAC402", marginBottom: "18px", textAlign:'center' }}>Episodes</h3>
                    {isLoadingEpisodes ? (
                        <div style={{ color: "#FAC402", padding: "16px" }}>Loading episodes...</div>
                    ) : (
                        <>
                            <div className={styles.episodesList}>
                                {episodes.map(ep => (
                                    <div key={ep.mal_id || ep.id || ep.number} className={styles.episodeCard}>
                                        <span className={styles.episodeNumber}>Ep {ep.mal_id || ep.number}</span>
                                        <span className={styles.episodeTitle}>{ep.title}</span>
                                        <span className={styles.episodePrice}>{EPISODE_PRICE} €</span>
                                        <button
                                            className={styles.episodeAddBtn}
                                            onClick={() => addToCart({
                                                id: `${anime.mal_id}-${ep.mal_id}`, 
                                                title: `${anime.title} - Ep ${ep.mal_id}: ${ep.title}`,
                                                image: anime.images.jpg.large_image_url,
                                                price: EPISODE_PRICE,
                                                type: 'episode',
                                                // Pass the necessary data under specific keys
                                                animeData: anime,
                                                episodeData: ep
                                            })}
                                        >
                                            Buy Episode
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.episodesPagination}>
                                <button
                                    className={styles.pageBtn}
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Prev
                                </button>
                                {[...Array(lastPage)].map((_, idx) => (
                                    <button
                                        key={idx + 1}
                                        className={currentPage === idx + 1 ? styles.pageBtnActive : styles.pageBtn}
                                        onClick={() => setCurrentPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                                <button
                                    className={styles.pageBtn}
                                    disabled={currentPage === lastPage}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </>
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