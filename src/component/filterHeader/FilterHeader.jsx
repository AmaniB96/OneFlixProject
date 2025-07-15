'use client'
import { useEffect } from 'react'
import { useFilterStore } from '../../app/stores/filterStore'

export default function FilterHeader() {
  // 1. On récupère tout ce dont on a besoin du store en une seule fois pour plus de clarté.
  const {
    categories,
    fetchCategories,
    selectedGenre,
    setSelectedGenre
  } = useFilterStore();

  // 2. On charge les catégories au montage si elles ne sont pas déjà là.
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  // 3. La fonction de gestion est simplifiée.
  // On appelle uniquement setSelectedGenre. Le store se charge lui-même de lancer
  // la nouvelle recherche via la fonction searchAnimes.
  const handleGenre = (genreId) => {
    setSelectedGenre(genreId);
  }

  // 4. Logique pour trouver le nom de la catégorie active (ne change pas).
  let activeCategoryName = 'All';
  if (selectedGenre && selectedGenre !== 'All') {
    const activeCat = categories.find(cat => cat.mal_id === selectedGenre);
    if (activeCat) activeCategoryName = activeCat.name;
  }

  return (
    <div className='filterSection'>
      <div className="filterTitle">
        <h4 className="sectionTitle">Categories</h4>
      </div>
      <div className="categories">
        <div className="activeCategoryName">{activeCategoryName}</div>
        <div className="catSlide">
          <p 
            className={selectedGenre === 'All' || !selectedGenre ? 'categoryItemActive' : 'categoryItem'} 
            onClick={() => handleGenre('All')}
          >
            All
          </p>
          {categories.map((cat) => (
            <p 
              key={cat.mal_id} 
              className={cat.mal_id === selectedGenre ? 'categoryItemActive' : 'categoryItem'} 
              onClick={() => handleGenre(cat.mal_id)}
            >
              {cat.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}