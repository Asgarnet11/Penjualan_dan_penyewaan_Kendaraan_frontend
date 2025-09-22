import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";

interface AuthState {
  token: string | null;
  user: User | null; // <-- Ganti isAuth dengan data user lengkap
  setUserAndToken: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      setUserAndToken: (user, token) => {
        set({ user, token });
      },
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
