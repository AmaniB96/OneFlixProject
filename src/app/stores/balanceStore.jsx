import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useBalanceStore = create(
  persist(
    (set) => ({
      balance: 0, // Le solde initial est de 0

      // Fonction pour ajouter du crédit au solde
      addCredit: (amount) => {
        const credit = parseFloat(amount);
        if (isNaN(credit) || credit <= 0) return; // Sécurité : n'ajoute que des nombres valides
        set((state) => ({ balance: state.balance + credit }));
      },

      // Fonction pour déduire un montant du solde (lors d'un achat)
      deductBalance: (amount) => {
        set((state) => ({ balance: state.balance - amount }));
      },

      // Fonction pour vider le solde (au logout)
      clearBalance: () => set({ balance: 0 }),
    }),
    {
      name: 'oneflix-user-balance', // Nom unique pour le localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);