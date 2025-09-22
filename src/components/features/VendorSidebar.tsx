"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, ClipboardList, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

// Props untuk menerima state open/close dari layout utama
interface VendorSidebarProps {
  isSidebarOpen: boolean;
}

export default function VendorSidebar({ isSidebarOpen }: VendorSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const menuItems = [
    { href: "/dashboard/vendor/listings", label: "Listing Saya", icon: List },
    {
      href: "/dashboard/vendor/orders",
      label: "Kelola Pesanan",
      icon: ClipboardList,
    },
  ];

  const baseClasses =
    "flex items-center px-4 py-3 text-gray-200 hover:bg-teal-700 hover:text-white rounded-lg transition-colors";
  const activeClasses = "bg-teal-700 text-white font-semibold";

  return (
    <>
      {/* Sidebar untuk Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <Image
            src="/assets/logo-full-white.png" // Anda perlu membuat versi putih dari logo Anda
            alt="Sultra Otomotif Logo"
            width={150}
            height={35}
            priority
          />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${baseClasses} ${
                pathname.startsWith(item.href) ? activeClasses : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-gray-700">
          <button
            onClick={logout}
            className={`${baseClasses} w-full text-red-400 hover:bg-red-500 hover:text-white`}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar untuk Mobile (Slide-in) */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Konten mobile sidebar sama dengan desktop */}
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <Image
            src="/assets/logo-full-white.png"
            alt="Logo"
            width={150}
            height={35}
          />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${baseClasses} ${
                pathname.startsWith(item.href) ? activeClasses : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-gray-700">
          <button
            onClick={logout}
            className={`${baseClasses} w-full text-red-400 hover:bg-red-500 hover:text-white`}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
