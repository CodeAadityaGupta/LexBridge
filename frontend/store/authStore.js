import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  // Simple hydration helper
  hydrate: () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        set({ user: userData, isAuthenticated: true });
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }
}));
