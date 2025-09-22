"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { LogIn, User, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo & Brand (Responsif) */}
          <Link href="/" className="flex items-center">
            {/* Logo lengkap untuk layar medium ke atas */}
            <Image
              src="/assets/logo-full.svg" // Mengambil dari public/assets/logo-full.png
              alt="Sultra Otomotif Logo"
              width={180}
              height={40}
              className="hidden md:block" // Sembunyikan di layar kecil
              priority // Prioritaskan load logo
            />
            {/* Logo ikon untuk layar kecil */}
            <Image
              src="/assets/logo-icon.svg" // Mengambil dari public/assets/logo-icon.png
              alt="Sultra Otomotif Ikon"
              width={40}
              height={40}
              className="block md:hidden" // Tampilkan hanya di layar kecil
              priority
            />
          </Link>

          {/* Menu Navigasi Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/vehicles?type=rent"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              Sewa
            </Link>
            <Link
              href="/vehicles?type=sale"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              Beli
            </Link>
            <Link
              href="/#about"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              Tentang Kami
            </Link>
          </div>

          {/* Tombol Aksi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profil
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login / Daftar
              </Link>
            )}
          </div>

          {/* Tombol Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Panel Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/vehicles?type=rent"
                className="text-gray-600 hover:text-teal-600 block px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Sewa
              </Link>
              <Link
                href="/vehicles?type=sale"
                className="text-gray-600 hover:text-teal-600 block px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Beli
              </Link>
              <Link
                href="/#about"
                className="text-gray-600 hover:text-teal-600 block px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Tentang Kami
              </Link>
              <div className="border-t pt-4">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      href="/profile"
                      className="flex items-center text-gray-600 hover:text-teal-600 block px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                      <User className="w-5 h-5 mr-2" />
                      Profil
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Login / Daftar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
