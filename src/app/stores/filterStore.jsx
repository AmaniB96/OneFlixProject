import { create } from "zustand";
// 1. Importer les deux fonctions de pricing
import { generateDeterministicPrice, generateRandomDiscount } from '@/utils/pricing';

// Plus besoin de drapeau `hasFetched` car chaque action peut déclencher un fetch.

export const useFilterStore = create((set, get) => ({
    // --- ÉTAT ---
    categories: [],
    animeList: [], // La seule liste, directement issue de l'API.
    isLoading: false,
    selectedGenre: null,
    searchQuery: '',
    sortBy: 'score', // Attention: le tri est maintenant géré par l'API.
    pagination: null, // Pour stocker les infos de pagination de l'API.

    // --- ACTIONS ---

    fetchCategories: async () => {
        const res = await fetch('https://api.jikan.moe/v4/genres/anime');
        const data = await res.json();
        const filteredCategories = data.data.filter(genre => !['Hentai', 'Ecchi', 'Erotica', 'Adult Cast'].includes(genre.name));
        set({ categories: filteredCategories });
    },

    /**
     * Fonction principale qui recherche les animes en fonction de l'état actuel du store.
     * Elle est appelée à chaque changement de filtre, de recherche, de tri ou de page.
     */
    searchAnimes: async (page = 1) => {
        set({ isLoading: true });
        const { searchQuery, selectedGenre, sortBy } = get();

        const params = new URLSearchParams({
            page: page,
            limit: 20,
            order_by: sortBy,
            sort: 'desc',
        });

        if (searchQuery) {
            params.append('q', searchQuery);
        }
        // Ne pas ajouter le genre si c'est "All" ou null
        if (selectedGenre && selectedGenre !== 'All') {
            params.append('genres', selectedGenre);
        }

        const url = `https://api.jikan.moe/v4/anime?${params.toString()}`;
        try {
            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok || !Array.isArray(data.data)) {
                throw new Error(`API call failed. URL: ${url}. Response: ${JSON.stringify(data)}`);
            }

            const preparedList = data.data.map((anime, index) => {
                // --- LA CORRECTION EST ICI ---
                // Assurez-vous que le prix est un nombre en utilisant parseFloat
                const originalPrice = parseFloat(generateDeterministicPrice(anime.mal_id));

                // Vérifiez si la conversion a réussi. Sinon, utilisez un prix par défaut.
                if (isNaN(originalPrice)) {
                    console.error(`Could not determine price for anime ID: ${anime.mal_id}. Using default price.`);
                    // Vous pouvez retourner l'anime sans prix ou avec un prix par défaut
                    return { ...anime, price: 9.99, isOnSale: false }; 
                }
                
                // Applique une promotion à 1 anime sur 5
                if ((anime.mal_id + index) % 5 === 0) {
                    const discount = generateRandomDiscount();
                    const discountedPrice = originalPrice * discount.multiplier;
                    
                    return {
                        ...anime,
                        price: discountedPrice,
                        originalPrice: originalPrice,
                        isOnSale: true,
                        discountPercent: discount.discountPercent,
                    };
                }

                // Sinon, retourne l'anime avec son prix normal
                return {
                    ...anime,
                    price: originalPrice,
                    isOnSale: false,
                };
            });
            
            const uniqueList = [...new Map(preparedList.map(anime => [anime.mal_id, anime])).values()];

            set({
                animeList: uniqueList,
                pagination: data.pagination,
                isLoading: false
            });

        } catch (error) {
            console.error("Failed to search animes:", error);
            set({ isLoading: false, animeList: [] });
        }
    },

    // --- SETTERS (qui déclenchent une nouvelle recherche) ---

    setSelectedGenre: (genreId) => {
        set({ selectedGenre: genreId });
        get().searchAnimes(); // On relance une recherche avec le nouveau genre.
    },

    setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().searchAnimes(); // On relance une recherche.
    },

    setSortBy: (sortOption) => {
        set({ sortBy: sortOption });
        get().searchAnimes(); // On relance une recherche avec le nouveau tri.
    },
    
    // Pour la pagination
    goToPage: (page) => {
        get().searchAnimes(page);
    }
}));
