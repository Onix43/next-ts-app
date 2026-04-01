import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: string | null;
  loading: boolean;
  toggleLoading: (value: boolean) => void;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      loading: false,
      toggleLoading: value => set({ loading: value }),
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-store' }
  )
);
