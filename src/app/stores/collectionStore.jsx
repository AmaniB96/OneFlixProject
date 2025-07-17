import { create } from "zustand";
// 1. Importe le middleware de persistance
import { persist, createJSONStorage } from 'zustand/middleware';

// 2. Enveloppe la fonction de création du store avec le middleware de persistance
export const useCollectionStore = create(
  persist(
    (set, get) => ({
      collection: {}, // { [animeId]: { anime, episodes: [episodeObj] } }

      // Ajoute un anime à la collection
      addAnime: (anime) => {
        set(state => ({
          collection: {
            ...state.collection,
            [anime.mal_id]: { anime, episodes: "all" }
          }
        }));
      },

      // Ajoute un épisode à la collection pour un anime donné
      addEpisode: (anime, episode) => {
        const current = get().collection[anime.mal_id];
        // Vérifie qu'on n'ajoute pas de doublon
        const isOwned = current?.episodes !== 'all' && current?.episodes?.some(e => e.mal_id === episode.mal_id);
        if (isOwned) return;

        let episodes = current?.episodes === "all" ? "all" : [...(current?.episodes || [])];
        if (episodes !== "all") {
          episodes = [...episodes, episode];
        }
        set(state => ({
          collection: {
            ...state.collection,
            [anime.mal_id]: { anime, episodes }
          }
        }));
      },

      // Fonction pour vider la collection
      clearCollection: () => set({ collection: {} }),

      // Récupère les épisodes possédés pour un anime donné
      getUserEpisodes: (animeId) => {
        const entry = get().collection[animeId];
        if (!entry) return [];
        if (entry.episodes === "all") return "all";
        return entry.episodes;
      }
    }),
    // 3. Configure la persistance
    {
      name: 'oneflix-collection-storage', // nom de l'item dans le storage (doit être unique)
      storage: createJSONStorage(() => localStorage), // (optionnel) par défaut, 'localStorage' est utilisé
    }
  )
);