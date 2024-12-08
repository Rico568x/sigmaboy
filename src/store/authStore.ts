import { create } from 'zustand';
import { AuthState } from '../types';

// Simulated maximum users check (in a real app this would be server-side)
const MAX_USERS = 10;
const USERS_KEY = 'social_image_users';

const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (username: string, password: string) => {
    const users = getStoredUsers();
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    set({ user: { id: user.id, username: user.username, createdAt: new Date(user.createdAt) }, isAuthenticated: true });
  },

  register: async (username: string, password: string) => {
    const users = getStoredUsers();
    
    if (users.length >= MAX_USERS) {
      throw new Error('Maximum number of users reached');
    }

    if (users.some((u: any) => u.username === username)) {
      throw new Error('Username already exists');
    }

    const newUser = {
      id: crypto.randomUUID(),
      username,
      password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    set({ 
      user: { id: newUser.id, username: newUser.username, createdAt: new Date(newUser.createdAt) },
      isAuthenticated: true 
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));