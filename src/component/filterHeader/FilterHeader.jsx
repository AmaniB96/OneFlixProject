'use client';

import { useEffect } from 'react';
import { useFilterStore } from '../../app/stores/filterStore';
import { useRouter } from 'next/navigation';

export default function FilterHeader() {
  const router = useRouter();
  const {
    categories,
    fetchCategories,
    selectedGenre,
    setSelectedGenre,
    animeList,
    searchAnimes
  } = useFilterStore();

  // Cet effet se déclenche une seule fois au montage du composant.
  useEffect(() => {
    // Si les catégories ne sont pas chargées, on les charge.
    if (categories.length === 0) {
      fetchCategories();
    }
    // Si la liste d'animes est vide, on lance une recherche par défaut.
    if (animeList.length === 0) {
      searchAnimes(); // Appelle searchAnimes avec les filtres par défaut.
    }
  }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'une fois.

  // Gère le changement de genre
  const handleGenre = (genreId) => {
    setSelectedGenre(genreId);
  };

  // Redirige vers la page de découverte
  const handleGenreRedirect = () => {
    router.push('/features/discover');
  };

  // Trouve le nom de la catégorie active
  const activeCategoryName = selectedGenre === 'All' || !selectedGenre
    ? 'All'
    : categories.find(c => c.mal_id === selectedGenre)?.name || 'All';

  return (
    <div id='filter' className='filterSection'>
      <div className="filterTitle">
        <h4 className="sectionTitle">Categories</h4>
      </div>
      <div className="categories">
        {/* Cet élément redirige au clic */}
        <div className="activeCategoryName" onClick={handleGenreRedirect}>
          {activeCategoryName}
        </div>
        <div className="catSlide">
          {/* Ces éléments ne font que changer la catégorie active */}
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