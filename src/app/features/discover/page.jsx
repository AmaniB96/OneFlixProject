'use client'

import { useEffect, useState } from 'react';
import { useFilterStore } from '@/app/stores/filterStore';
import Image from 'next/image';
import styles from './discover.module.css';
import Link from 'next/link';

export default function Discover() {
  // --- 1. Récupération de l'état et des actions du store ---
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

  // État local uniquement pour le debounce de la recherche
  const [searchInput, setSearchInput] = useState(searchQuery);

  // --- 2. Effets pour charger les données initiales et gérer la recherche ---

  // Charge les catégories et lance la première recherche au montage du composant.
  useEffect(() => {
    fetchCategories();
    searchAnimes(); // Lance la recherche initiale avec les paramètres par défaut.
  }, [fetchCategories, searchAnimes]);

  // Gère la recherche avec un délai pour ne pas surcharger l'API à chaque frappe.
  useEffect(() => {
    const handler = setTimeout(() => {
      // On ne lance la recherche que si le texte a changé.
      if (searchInput !== searchQuery) {
        setSearchQuery(searchInput);
      }
    }, 500); // Délai de 500ms
    return () => clearTimeout(handler);
  }, [searchInput, searchQuery, setSearchQuery]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Discover Anime</h1>

      {/* --- 3. Contrôles de Filtre, Recherche et Tri --- */}
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

      {/* --- 4. Grille des Animes --- */}
      <div className={styles.animeGrid}>
        {animeList.length > 0 ? (
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
                <p>{anime.price} €</p>
                <Link href={{ pathname: `/anime/${anime.mal_id}`, query: { price: anime.price } }}>
                  <button className={styles.watchBtn}>Buy Now</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No results found for your query.</p>
        )}

        {/* Loader en overlay, centré sur la grille */}
        {isLoading && (
          <div className={styles.loaderOverlay}>
            <div className={styles.loading}>Searching...</div>
          </div>
        )}
      </div>

      {/* --- 5. Contrôles de Pagination (pilotés par l'API) --- */}
      {pagination && (
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