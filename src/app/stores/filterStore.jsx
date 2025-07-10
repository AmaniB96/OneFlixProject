import { create } from "zustand"


export const useFilterStore = create((set) => ({
    categories: [],
    fetchCategories: async () => {
        const res = await fetch('https://api.jikan.moe/v4/genres/anime')
        const data = await res.json()

        const Filteredcategories = data.data.filter(genre => !['Hentai','Ecchi','Erotica','Adult Cast'].includes(genre.name))

        set({categories: Filteredcategories})},

    selectedGenre: null,
    setSelectedGenre: (genre) => set({ selectedGenre: genre }),

    animeList: [],
    fetchAnimeByGenre: async (genreId) => {
        let url;
        if (!genreId || genreId === 'All') {
            url = `https://api.jikan.moe/v4/top/anime?limit=15`;
        } else {
            url = `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=15`;
        }
        const res = await fetch(url)
        const data = await res.json()
        let filtered = (data.data || [])
            .filter(anime => anime.year >= 2010 && anime.score)
            .sort((a, b) => b.score - a.score)
            .slice(0, 15)
        set({ animeList: filtered })
    }
}))