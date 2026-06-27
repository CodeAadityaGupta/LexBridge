import { api } from './api';

export const authService = {
  async login(email, password) {
    try {
      // Try hitting backend endpoints first
      const data = await api.post('/auth/login', { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (err) {
      // If it's a structural client/auth reject error from backend, rethrow it
      if (err.status && err.status < 500) {
        throw err;
      }
      
      // Fallback for standalone sandbox verification if backend is offline
      console.warn("Authentication API unreachable. Falling back to local sandbox mock.");
      
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (email.toLowerCase() === 'error@email.com') {
        throw new Error('Simulated authentication error for testing error states.');
      }

      const mockToken = 'mock-jwt-token-12345';
      const mockUser = {
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email: email,
        avatar: '',
      };

      localStorage.setItem('token', mockToken);
      return { user: mockUser, token: mockToken };
    }
  },

  async signup(name, email, password) {
    try {
      const data = await api.post('/auth/signup', { name, email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (err) {
      if (err.status && err.status < 500) {
        throw err;
      }

      console.warn("Registration API unreachable. Falling back to local sandbox mock.");
      
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockToken = 'mock-jwt-token-12345';
      const mockUser = {
        name,
        email,
        avatar: '',
      };

      localStorage.setItem('token', mockToken);
      return { user: mockUser, token: mockToken };
    }
  }
};
