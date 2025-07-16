import { create } from 'zustand';

// Helper function to introduce a delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useEpisodeStore = create((set) => ({
  episodes: [],
  isLoadingEpisodes: false,
  lastPage: 1,
  fetchEpisodes: async (anime, page = 1) => {
    set({ isLoadingEpisodes: true });

    if (anime.type === 'Movie') {
      const movieAsEpisode = {
        mal_id: anime.mal_id,
        title: anime.title,
        synopsis: `Watch the full movie: ${anime.title}.`,
        url: anime.url,
      };
      set({ episodes: [movieAsEpisode], isLoadingEpisodes: false, lastPage: 1 });
      return;
    }

    // --- CORRECTION: ADD RETRY LOGIC ---
    let success = false;
    for (let i = 0; i < 3; i++) { // Try up to 3 times
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes?page=${page}`);
        
        if (res.ok) {
          const data = await res.json();
          set({
            episodes: data.data || [],
            isLoadingEpisodes: false,
            lastPage: data.pagination?.last_visible_page || 1
          });
          success = true;
          break; // Exit loop on success
        }

        if (res.status === 429) {
          console.warn(`Rate limited. Retrying in ${i + 1} second(s)...`);
          await sleep((i + 1) * 1000); // Wait 1s, then 2s
        } else {
          // For other errors (404, etc.), don't retry
          break;
        }
      } catch (error) {
        console.error("Fetch attempt failed:", error);
        // Don't retry on network errors
        break;
      }
    }

    if (!success) {
      // If all retries fail, set to empty
      set({ episodes: [], isLoadingEpisodes: false, lastPage: 1 });
    }
  },
  clearEpisodes: () => set({ episodes: [] }),

  characters: [],
  isLoadingCharacters: false,
  fetchCharacters: async (animeId) => {
    // You might want to add similar retry logic here too
    set({ isLoadingCharacters: true });
    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    const data = await res.json();
    set({ characters: data.data || [], isLoadingCharacters: false });
  },
  clearCharacters: () => set({ characters: [] }),
}));


