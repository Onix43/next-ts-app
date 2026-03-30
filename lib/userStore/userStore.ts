import { create } from 'zustand';

interface UserStore {
  userEmail: string;
  setUser: (userEmail: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>(set => ({
  userEmail: '',
  setUser: user => set({ userEmail: user }),
  clearUser: () => set({ userEmail: '' }),
}));
