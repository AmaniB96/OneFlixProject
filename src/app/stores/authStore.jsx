import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

// Création du store Zustand avec persistance dans le localStorage
export const useAuthStore = create(
  persist(
    (set,get) => ({

        user: null,
        users: [],
        loginError: '',
        registerError:'',

        // Getter pour savoir si un utilisateur est connecté. Dans Zustand, la fonction get permet d’accéder à l’état actuel du store à l’intérieur des méthodes du store.
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
            // Vérifie si le username existe déjà
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
      name: 'oneflix-auth-storage', // Nom du store dans le localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);