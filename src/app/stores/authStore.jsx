import { create } from "zustand";

export const UseAuthstore = create((set,get) => ({

    user: null,
    users: [],
    loginError: '',
    registerError:'',

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

    logout: () => set({user:null})
}))