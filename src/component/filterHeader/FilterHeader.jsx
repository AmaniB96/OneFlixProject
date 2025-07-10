'use client'
import { useEffect } from 'react'
import {useFilterStore} from '../../app/stores/filterStore'

export default function FilterHeader() {

  const categories = useFilterStore(state => state.categories)
  const fetchCategories = useFilterStore(state => state.fetchCategories)
  const setSelectedGenre = useFilterStore(state => state.setSelectedGenre)
  const fetchAnimeByGenre = useFilterStore(state => state.fetchAnimeByGenre)
  const selectedGenre = useFilterStore(state => state.selectedGenre);


   useEffect(() => {
    if (categories.length === 0) fetchCategories()

    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            fetchAnimeByGenre('All')
            setSelectedGenre('All')
        }
    }, [categories, fetchAnimeByGenre, setSelectedGenre])

  const handleGenre = (genreId) => {
    setSelectedGenre(genreId)
    fetchAnimeByGenre(genreId)
  }

  let activeCategoryName = 'All';

  if (selectedGenre && selectedGenre !== 'All') {
    const activeCat = categories.find(cat => cat.mal_id === selectedGenre)
    if (activeCat) activeCategoryName = activeCat.name
  }

  return (
    <div className='filterSection'>
      <div className="filterTitle">
        <h4 className="sectionTitle">Categories</h4>
      </div>
      <div className="categories">
        <div className="activeCategoryName">{activeCategoryName}</div>
        <div className="catSlide">
        <p className={selectedGenre === 'All' ? 'categoryItemActive' : 'categoryItem'} onClick={() => handleGenre('All')}>All</p>
        {categories.map((cat, idx) => (
          <p key={idx} className={cat.mal_id == selectedGenre ? 'categoryItemActive': 'categoryItem'} onClick={() => handleGenre(Number(cat.mal_id))}>{cat.name}</p>
        ))}
        </div>
      </div>
    </div>
  );
}