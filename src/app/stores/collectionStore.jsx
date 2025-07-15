import { create } from "zustand";
// 1. Import the persist middleware
import { persist, createJSONStorage } from 'zustand/middleware';

// 2. Wrap your store creator function with the persist middleware
export const useCollectionStore = create(
  persist(
    (set, get) => ({
      collection: {}, // { [animeId]: { anime, episodes: [episodeObj] } }

      addAnime: (anime) => {
        set(state => ({
          collection: {
            ...state.collection,
            [anime.mal_id]: { anime, episodes: "all" }
          }
        }));
      },

      addEpisode: (anime, episode) => {
        const current = get().collection[anime.mal_id];
        // Ensure we don't add duplicates
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

      // Add this function to clear the collection
      clearCollection: () => set({ collection: {} }),

      getUserEpisodes: (animeId) => {
        const entry = get().collection[animeId];
        if (!entry) return [];
        if (entry.episodes === "all") return "all";
        return entry.episodes;
      }
    }),
    // 3. Configure the persistence
    {
      name: 'oneflix-collection-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);