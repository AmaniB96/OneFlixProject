import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [], // [{ id, title, image, price }]
  addToCart: (item) => {
    
    const { cart } = get();
    if (cart.find((p) => p.id === item.id)) return;
    set({ cart: [...cart, item] });
  },
  removeFromCart: (id) => {
    set({ cart: get().cart.filter((p) => p.id !== id) });
  },
  clearCart: () => set({ cart: [] }),
}));