import { create } from "zustand"


export const useFilterStore = create((set, get) => ({
    categories: [],
    fetchCategories: async () => {
        const res = await fetch('https://api.jikan.moe/v4/genres/anime', {
        next: { revalidate: 3600 }});
        const data = await res.json()

        const Filteredcategories = data.data.filter(genre => !['Hentai','Ecchi','Erotica','Adult Cast'].includes(genre.name))

        set({categories: Filteredcategories})},

    selectedGenre: null,
    setSelectedGenre: (genre) => set({ selectedGenre: genre, animeList: [] }),

    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),

    

    animeList: [],
    fetchAnimeByGenre: async (genreId) => {
        const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=25', {
            next: { revalidate: 3600 }
        });
        const data = await res.json();
        let filtered = (data.data || [])
            .filter(anime => anime.score);

        if (genreId && genreId !== 'All') {
            filtered = filtered.filter(anime =>
                anime.genres.some(g => g.mal_id === Number(genreId))
            );
        }

        const unique = [];
        const seen = new Set();
        for (const anime of filtered) {
            if (!seen.has(anime.mal_id)) {
                seen.add(anime.mal_id);
                unique.push(anime);
            }
        }

        const sorted = unique.sort((a, b) => b.score - a.score).slice(0, 15);
        set({ animeList: sorted });
        

    },
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    sortBy: 'score', 
    setSortBy: (sort) => set({ sortBy: sort }),
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    fetchDiscoverAnime: async () => {
        set({ isLoading: true });
        const { selectedGenre, currentPage, sortBy, searchQuery } = get();
        let url = `https://api.jikan.moe/v4/anime?page=${currentPage}&limit=25`;

        if (searchQuery && searchQuery.trim() !== '') {
            url += `&q=${encodeURIComponent(searchQuery.trim())}`;
        }
        if (selectedGenre && selectedGenre !== 'All') {
            url += `&genres=${selectedGenre}`;
        }
        if (sortBy) {
            url += `&order_by=${sortBy}&sort=desc`;
        }

        const res = await fetch(url, { next: { revalidate: 3600 } });
        const data = await res.json();

        const adultRatings = ['Rx', 'R+', 'R', 'R - 17+', 'R+ - Mild Nudity', 'Rx - Hentai'];
        const adultGenres = ['Hentai', 'Ecchi', 'Erotica', 'Adult Cast'];

        const unique = [];
        const seen = new Set();
        for (const anime of data.data || []) {
            const hasAdultGenre = anime.genres?.some(g => adultGenres.includes(g.name));
            const isAdultRating = adultRatings.includes(anime.rating);
            if (!seen.has(anime.mal_id) && !hasAdultGenre && !isAdultRating) {
                seen.add(anime.mal_id);
                unique.push(anime);
            }
        }

        set({
            animeList: unique.map(anime => {
                // Generate base price between 5 and 30
                const base = Math.floor(Math.random() * 26) + 5;
                // Pick a realistic ending
                const endings = [0.95, 0.99, 0.00];
                const ending = endings[Math.floor(Math.random() * endings.length)];
                // Compose the price
                const price = (base + ending).toFixed(2);
                return {
                    ...anime,
                    price
                };
            }),
            lastPage: data.pagination?.last_visible_page || 1,
            isLoading: false
        });
    },
    lastPage: 1,
}))
