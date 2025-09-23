"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Shield, Users, Car, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const menuItems = [
    { href: "/admin/vendors", label: "Verifikasi Vendor", icon: Shield },
    { href: "/admin/users", label: "Manajemen Pengguna", icon: Users },
    { href: "/admin/listings", label: "Manajemen Listing", icon: Car },
  ];

  const baseClasses =
    "flex items-center px-4 py-3 text-gray-200 hover:bg-indigo-700 hover:text-white rounded-lg transition-colors";
  const activeClasses = "bg-indigo-700 text-white font-semibold";

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
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
  );
}
