'use client'
import { useEffect } from 'react'
import { useFilterStore } from '@/app/stores/filterStore'
import Image from 'next/image';
import styles from './discover.module.css'

export default function Discover() {
  const {
    animeList, fetchDiscoverAnime, currentPage, setCurrentPage,
    categories, fetchCategories, selectedGenre, setSelectedGenre,
    sortBy, setSortBy, searchQuery, setSearchQuery, lastPage
  } = useFilterStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchDiscoverAnime();
  }, [selectedGenre, currentPage, sortBy, searchQuery, fetchDiscoverAnime]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Discover Anime</h1>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search anime..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <div className={styles.categories}>
          <button
            className={selectedGenre === 'All' ? styles.categoryBtnActive : styles.categoryBtn}
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

        <select className={styles.sort} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="score">Score</option>
          <option value="popularity">Popularity</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className={styles.animeGrid}>
        {animeList.map(anime => (
          <div key={anime.mal_id} className={styles.animeCard}>
            <Image
              className={styles.cardImage}
              src={anime.images.jpg.image_url}
              alt={anime.title}
              width={220}
              height={320}
            />
            <h3>{anime.title}</h3>
            <p>Score: {anime.score}</p>
            <p>Year: {anime.year}</p>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span>Page {currentPage} / {lastPage}</span>
        <button disabled={currentPage === lastPage} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  )
}