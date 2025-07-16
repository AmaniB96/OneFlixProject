'use client'

import { useEffect, useState } from 'react';
import { useFilterStore } from '@/app/stores/filterStore';
import Image from 'next/image';
import styles from './discover.module.css';
import Link from 'next/link';

export default function Discover() {
  const {
    animeList,
    isLoading,
    pagination,
    categories,
    fetchCategories,
    searchAnimes,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    goToPage
  } = useFilterStore();

  const [searchInput, setSearchInput] = useState(searchQuery);


  // 1. Effet principal qui se déclenche au montage et à chaque changement de filtre
  useEffect(() => {
    // Si les catégories ne sont pas chargées, on les charge d'abord.
    if (categories.length === 0) {
      fetchCategories();
    }
    // On lance toujours une recherche quand les filtres changent.
    searchAnimes(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre, sortBy, searchQuery]); // Dépendances correctes

  // 2. Effet pour le debounce de la barre de recherche
  useEffect(() => {
    const handler = setTimeout(() => {
      // On met à jour le store seulement si la valeur a changé
      if (searchInput !== searchQuery) {
        setSearchQuery(searchInput);
      }
    }, 500); // Délai de 500ms

    // Nettoyage du timer si le composant est démonté ou si searchInput change
    return () => clearTimeout(handler);
  }, [searchInput, searchQuery, setSearchQuery]);

  // 3. Effet pour synchroniser l'input si le store est modifié ailleurs
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);


  // --- FIN DES CORRECTIONS ---

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Discover Anime</h1>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search any anime..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <select className={styles.sort} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="score">Sort by Score</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      <div className={styles.categories}>
        <button
          className={selectedGenre === 'All' || !selectedGenre ? styles.categoryBtnActive : styles.categoryBtn}
          onClick={() => setSelectedGenre('All')}
        >All</button>
        {categories.map(cat => (
          <button
            key={cat.mal_id}
            className={selectedGenre === cat.mal_id ? styles.categoryBtnActive : styles.categoryBtn}
            onClick={() => setSelectedGenre(cat.mal_id)}
          >{cat.name}</button>
        ))}
      </div>

      <div className={styles.animeGrid}>
        {isLoading ? (
          <div className={styles.loaderOverlay}>
            <div className={styles.loading}>Searching...</div>
          </div>
        ) : animeList.length > 0 ? (
          animeList.map(anime => (
            <div key={anime.mal_id} className={styles.animeCard}>
              <Image
                className={styles.cardImage}
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                width={220} height={320}
              />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{anime.title}</h3>
                <p>score: {anime.score || 'N/A'}</p>
                <p>{anime.price.toFixed(2)} €</p>
                <Link href={{ pathname: `/anime/${anime.mal_id}`, query: { price: anime.price } }}>
                  <button className={styles.watchBtn}>Buy Now</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No results found for your query.</p>
        )}
      </div>

      {pagination && !isLoading && animeList.length > 0 && (
        <div className={styles.pagination}>
          <button 
            disabled={pagination.current_page === 1} 
            onClick={() => goToPage(pagination.current_page - 1)}
          >Prev</button>
          <span>Page {pagination.current_page} of {pagination.last_visible_page}</span>
          <button 
            disabled={!pagination.has_next_page} 
            onClick={() => goToPage(pagination.current_page + 1)}
          >Next</button>
        </div>
      )}
    </div>
  );
}