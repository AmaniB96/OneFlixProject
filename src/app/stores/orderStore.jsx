import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useOrderStore = create(
  persist(
    (set) => ({
      orders: [], // Un tableau pour stocker les objets de commande

      // Fonction pour ajouter une nouvelle commande à l'historique
      addOrder: (newOrder) => {
        set((state) => ({
          orders: [newOrder, ...state.orders], // Ajoute la nouvelle commande au début de la liste
        }));
      },

      // Optionnel : fonction pour vider l'historique (utile au logout)
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'oneflix-order-history', // Nom unique pour le localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);