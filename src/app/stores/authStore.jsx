import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set,get) => ({

        user: null,
        users: [],
        loginError: '',
        registerError:'',

        get isAuthenticated() {
            return !!get().user;
        },
        
        login: (username, password) => {
            const {users} = get();
            const found = users.find(u => username === username && u.password === password)
            if (found) {
                set({user: {username}, loginError:''});
            } else {
                set({loginError: 'Invalid credentials'})
            }
        },

        register: (username, password) => {
            const {users} = get();
            if (users.find(u => u.username === username)) {
                set({registerError: 'Username already exists'});
                return;
            }
            set({
                users: [...users, {username,password}],
                user: {username},
                registerError: ''
            });
        },

        logout: () => set({user:null}),

        // Nouvelle fonction pour mettre à jour les informations utilisateur
        updateUser: (userData) => set({ user: userData }),
    }),
    {
      name: 'oneflix-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);