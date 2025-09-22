import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Definisikan tipe untuk state dan action
interface AuthState {
  token: string | null;
  isAuth: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

// Kita akan "membungkus" store kita dengan middleware 'persist'
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      // State awal
      token: null,
      isAuth: false,

      // Action untuk login
      setToken: (token: string) => {
        // Saat login, set state seperti biasa.
        // Middleware 'persist' akan otomatis menyimpan state baru ini ke localStorage.
        set({ token: token, isAuth: true });
      },

      // Action untuk logout
      logout: () => {
        // Saat logout, set state kembali ke awal.
        // Middleware 'persist' akan otomatis menghapus state dari localStorage.
        set({ token: null, isAuth: false });
      },
    }),
    {
      // Konfigurasi untuk middleware 'persist'
      name: "auth-storage", // Nama 'key' yang akan digunakan di localStorage
      storage: createJSONStorage(() => localStorage), // Menentukan untuk menggunakan localStorage
    }
  )
);
