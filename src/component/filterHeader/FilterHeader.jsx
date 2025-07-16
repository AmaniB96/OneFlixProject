'use client'
import { useEffect } from 'react'
import { useFilterStore } from '../../app/stores/filterStore'
import { useRouter } from 'next/navigation' // 1. Importer le router

export default function FilterHeader() {
  const {
    categories,
    fetchCategories,
    selectedGenre,
    setSelectedGenre
  } = useFilterStore();

  const router = useRouter(); // 2. Initialiser le router

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  // 3. Fonction pour la liste défilante : met juste à jour l'état
  const handleGenre = (genreId) => {
    setSelectedGenre(genreId);
  }

  // 4. Fonction pour le titre principal : met à jour l'état ET redirige
  const handleGenreRedirect = () => {
    // Pas besoin de passer l'ID, on utilise celui déjà dans le store
    router.push('/features/discover');
  }
  
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