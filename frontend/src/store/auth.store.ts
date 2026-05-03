import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
  login: (user: User, token: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      permissions: [],

      login: (user, token) => {
        const permissions = user.role?.permissions?.map((rp) => rp.permission.slug) ?? [];
        localStorage.setItem('yatama_token', token);
        set({ user, token, isAuthenticated: true, permissions });
      },

      logout: () => {
        localStorage.removeItem('yatama_token');
        set({ user: null, token: null, isAuthenticated: false, permissions: [] });
      },

      hasPermission: (permission) => {
        const { user, permissions } = get();
        if (!user) return false;
        if (user.role?.slug === 'super_admin') return true;
        return permissions.includes(permission);
      },
    }),
    {
      name: 'yatama-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
