import { create } from 'zustand';

export const useEpisodeStore = create((set) => ({
  episodes: [],
  isLoadingEpisodes: false,
  lastPage: 1,
  fetchEpisodes: async (animeId, page = 1) => {
    set({ isLoadingEpisodes: true });
    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/episodes?page=${page}`);
    const data = await res.json();
    set({
      episodes: data.data || [],
      isLoadingEpisodes: false,
      lastPage: data.pagination?.last_visible_page || 1
    });
  },
  clearEpisodes: () => set({ episodes: [] }),

  characters: [],
  isLoadingCharacters: false,
  fetchCharacters: async (animeId) => {
    set({ isLoadingCharacters: true });
    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    const data = await res.json();
    set({ characters: data.data || [], isLoadingCharacters: false });
  },
  clearCharacters: () => set({ characters: [] }),
}));


