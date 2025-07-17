import { create } from 'zustand';

// Fonction utilitaire pour ajouter un délai (pour le retry)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Création du store Zustand pour la gestion des épisodes et personnages
export const useEpisodeStore = create((set) => ({
  // Liste des épisodes récupérés
  episodes: [],
  // Indique si les épisodes sont en cours de chargement
  isLoadingEpisodes: false,
  // Dernière page disponible pour la pagination des épisodes
  lastPage: 1,

  // Fonction pour récupérer les épisodes d'un anime
  fetchEpisodes: async (anime, page = 1) => {
    set({ isLoadingEpisodes: true });

    // Si l'anime est un film, on le traite comme un seul "épisode"
    if (anime.type === 'Movie') {
      const movieAsEpisode = {
        mal_id: anime.mal_id,
        title: anime.title,
        synopsis: `Regardez le film complet : ${anime.title}.`,
        url: anime.url,
      };
      set({ episodes: [movieAsEpisode], isLoadingEpisodes: false, lastPage: 1 });
      return;
    }

    // --- LOGIQUE DE RETRY EN CAS DE RATE LIMIT ---
    let success = false;
    for (let i = 0; i < 3; i++) { // On tente jusqu'à 3 fois
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/episodes?page=${page}`);
        
        if (res.ok) {
          // Succès : on met à jour le store avec les données reçues
          const data = await res.json();
          set({
            episodes: data.data || [],
            isLoadingEpisodes: false,
            lastPage: data.pagination?.last_visible_page || 1
          });
          success = true;
          break; // On sort de la boucle en cas de succès
        }

        if (res.status === 429) {
          // Si on est limité par le rate limit, on attend avant de réessayer
          console.warn(`Trop de requêtes. Nouvelle tentative dans ${i + 1} seconde(s)...`);
          await sleep((i + 1) * 1000); // Attend 1s, puis 2s, etc.
        } else {
          // Pour les autres erreurs (404, etc.), on ne réessaie pas
          break;
        }
      } catch (error) {
        // Erreur réseau ou autre : on log et on ne réessaie pas
        console.error("Échec de la récupération :", error);
        break;
      }
    }

    if (!success) {
      // Si toutes les tentatives échouent, on vide la liste
      set({ episodes: [], isLoadingEpisodes: false, lastPage: 1 });
    }
  },

  // Fonction pour vider les épisodes du store
  clearEpisodes: () => set({ episodes: [] }),

  // Liste des personnages récupérés
  characters: [],
  // Indique si les personnages sont en cours de chargement
  isLoadingCharacters: false,

  // Fonction pour récupérer les personnages d'un anime
  fetchCharacters: async (animeId) => {
    // (Astuce : tu peux ajouter la logique de retry ici aussi si besoin)
    set({ isLoadingCharacters: true });
    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    const data = await res.json();
    set({ characters: data.data || [], isLoadingCharacters: false });
  },

  // Fonction pour vider les personnages du store
  clearCharacters: () => set({ characters: [] }),
}));


