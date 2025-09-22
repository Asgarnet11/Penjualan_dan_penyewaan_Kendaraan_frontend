"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { LogIn, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { isAuth, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Brand */}
        <Link href="/" className="text-2xl font-bold text-teal-600">
          Sultra Otomotif
        </Link>

        {/* Menu Navigasi */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/vehicles?type=rent"
            className="text-gray-600 hover:text-teal-600"
          >
            Sewa
          </Link>
          <Link
            href="/vehicles?type=sale"
            className="text-gray-600 hover:text-teal-600"
          >
            Beli
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-teal-600">
            Tentang Kami
          </Link>
        </div>

        {/* Tombol Aksi (Login/Profil) */}
        <div className="flex items-center space-x-4">
          {isAuth ? (
            // Tampilan jika sudah login
            <>
              <Link
                href="/profile"
                className="flex items-center text-gray-600 hover:text-teal-600"
              >
                <User className="w-5 h-5 mr-2" />
                Profil
              </Link>
              <button
                onClick={logout}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            // Tampilan jika belum login
            <Link
              href="/login"
              className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Login / Daftar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
