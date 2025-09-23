"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

// Icons
import {
  LogIn,
  User,
  LogOut,
  Menu as MenuIcon,
  X,
  ChevronDown,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mendapatkan inisial nama untuk avatar
  const userInitial = user?.full_name
    ? user.full_name.charAt(0).toUpperCase()
    : "?";

  // Daftar menu untuk navigasi
  const navLinks = [
    { href: "/vehicles?is_for_rent=true", label: "Sewa" },
    { href: "/vehicles?is_for_sale=true", label: "Beli" },
    { href: "/about", label: "Tentang Kami" },
  ];

  const NavLink = ({
    href,
    children,
    mobile = false,
  }: {
    href: string;
    children: React.ReactNode;
    mobile?: boolean;
  }) => {
    const isActive = pathname === href;

    if (mobile) {
      return (
        <Link
          href={href}
          onClick={() => setIsMenuOpen(false)}
          className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
            isActive
              ? "text-teal-700 bg-teal-50 border-l-4 border-teal-600"
              : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
          }`}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? "text-teal-700 bg-teal-50"
            : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
        }`}
      >
        {children}
        {isActive && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-teal-600 rounded-full"></div>
        )}
      </Link>
    );
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <div className="transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/assets/logo-full.png"
                alt="Sultra Otomotif Logo"
                width={160}
                height={36}
                className="hidden sm:block h-9 w-auto"
                priority
              />
              <Image
                src="/assets/logo-icon.png"
                alt="Sultra Otomotif"
                width={36}
                height={36}
                className="block sm:hidden h-9 w-9"
                priority
              />
            </div>
          </Link>

          {/* Menu Navigasi Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <HeadlessMenu as="div" className="relative">
                <HeadlessMenu.Button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center rounded-full font-semibold text-sm shadow-sm">
                    {userInitial}
                  </div>
                  <span className="max-w-24 truncate">
                    {user.full_name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </HeadlessMenu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/10 focus:outline-none border border-gray-100 overflow-hidden">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-gray-100 mb-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.full_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                              active
                                ? "bg-gray-50 text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            <User className="w-4 h-4 mr-3 text-gray-400" />
                            Profil Saya
                          </Link>
                        )}
                      </HeadlessMenu.Item>

                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <Link
                            href="/chat"
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                              active
                                ? "bg-gray-50 text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            <MessageSquare className="w-4 h-4 mr-3 text-gray-400" />
                            Pesan
                          </Link>
                        )}
                      </HeadlessMenu.Item>

                      {user.role === "vendor" && (
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard/vendor/listings"
                              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                                active
                                  ? "bg-gray-50 text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" />
                              Dashboard Vendor
                            </Link>
                          )}
                        </HeadlessMenu.Item>
                      )}

                      {user.role === "admin" && (
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <Link
                              href="/admin/vendors"
                              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                                active
                                  ? "bg-gray-50 text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" />
                              Admin Panel
                            </Link>
                          )}
                        </HeadlessMenu.Item>
                      )}

                      <div className="border-t border-gray-100 my-2"></div>

                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                              active ? "bg-red-50 text-red-700" : "text-red-600"
                            }`}
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                  </HeadlessMenu.Items>
                </Transition>
              </HeadlessMenu>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login / Daftar</span>
                <span className="sm:hidden">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {user && (
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center rounded-full font-semibold text-sm shadow-sm">
                {userInitial}
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-3" : "top-1"
                  }`}
                ></span>
                <span
                  className={`absolute block w-6 h-0.5 bg-current top-3 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-3" : "top-5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <Transition
          show={isMenuOpen}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 -translate-y-2"
          enterTo="transform opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform opacity-0 -translate-y-2"
        >
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {/* Navigation Links */}
              <div className="space-y-1 mb-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} mobile>
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* User Actions */}
              {user ? (
                <div className="space-y-1 border-t border-gray-100 pt-4">
                  <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center rounded-full font-semibold">
                        {userInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.full_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5 mr-3 text-gray-400" />
                    Profil Saya
                  </Link>

                  <Link
                    href="/chat"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 mr-3 text-gray-400" />
                    Pesan
                  </Link>

                  {user.role === "vendor" && (
                    <Link
                      href="/dashboard/vendor/listings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400" />
                      Dashboard Vendor
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      href="/admin/vendors"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400" />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    <LogIn className="w-5 h-5" />
                    Login / Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Transition>
      </nav>
    </header>
  );
}
