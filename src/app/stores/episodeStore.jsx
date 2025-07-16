import { create } from 'zustand';

export const useEpisodeStore = create((set) => ({
  episodes: [],
  isLoadingEpisodes: false,
  lastPage: 1,
  fetchEpisodes: async (anime, page = 1) => {
    set({ isLoadingEpisodes: true });

    // --- CORRECTION : Gérer le cas "Movie" en premier ---
    if (anime.type === 'Movie') {
      // Si c'est un film, on ne cherche pas plus loin. On crée l'épisode de substitution.
      const movieAsEpisode = {
        mal_id: anime.mal_id,
        title: anime.title,
        synopsis: `Watch the full movie: ${anime.title}.`,
        url: anime.url,
      };
      
      set({
        episodes: [movieAsEpisode],
        isLoadingEpisodes: false,
        lastPage: 1
      });
      // On arrête l'exécution de la fonction ici pour ne pas appeler l'API inutilement.
      return; 
    }

    // Pour tous les autres types (TV, OVA, etc.), on appelle l'API.
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes?page=${page}`);
      if (!res.ok) {
        // Si l'API retourne une erreur (ex: 404), on met la liste à vide.
        set({ episodes: [], isLoadingEpisodes: false, lastPage: 1 });
        return;
      }
      const data = await res.json();
      
      set({
        episodes: data.data || [],
        isLoadingEpisodes: false,
        lastPage: data.pagination?.last_visible_page || 1
      });

    } catch (error) {
      console.error("Failed to fetch episodes:", error);
      set({ episodes: [], isLoadingEpisodes: false, lastPage: 1 });
    }
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


