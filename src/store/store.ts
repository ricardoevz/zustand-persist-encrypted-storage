import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { encryptedStorage } from '../utils/crypto/encrypted-storage';

interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      logout: () => {
        set({ user: null });
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => encryptedStorage),
    }
  )
);
