import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useCartStore = create(
  persist(
    (set, get) => ({ // <-- Ajoutez get ici pour accéder à l'état actuel
      cart: [],
      
      addToCart: (item) => {
        // Récupérer le panier actuel
        const currentCart = get().cart;
        
        // Vérifier si l'article existe déjà
        const itemExists = currentCart.some(cartItem => cartItem.id === item.id);

        if (itemExists) {
          // Si l'article existe, ne rien faire et afficher une notification
          toast.error(`${item.title} is already in your cart.`);
          return; // Arrêter la fonction ici
        }

        // Si l'article n'existe pas, l'ajouter au panier
        set((state) => ({ cart: [...state.cart, item] }));
        toast.success(`${item.title} added to cart!`);
      },

      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
      
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'oneflix-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);