"use client"; // Diperlukan karena menggunakan state untuk mobile menu

import { useState } from "react";
import VendorSidebar from "@/components/features/VendorSidebar";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  // Proteksi Sederhana: jika tidak ada user atau bukan vendor, arahkan ke login
  // Di aplikasi nyata, ini bisa dibuat lebih canggih dengan middleware
  if (user === null) {
    if (typeof window !== "undefined") router.push("/login");
    return (
      <div className="flex justify-center items-center h-screen">
        Mengarahkan ke login...
      </div>
    );
  }
  if (user.role !== "vendor") {
    if (typeof window !== "undefined") router.push("/");
    return (
      <div className="flex justify-center items-center h-screen">
        Akses ditolak.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <VendorSidebar isSidebarOpen={isSidebarOpen} />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar untuk Mobile */}
        <header className="md:hidden flex justify-between items-center bg-white p-4 border-b">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <span className="font-semibold text-lg">Dashboard Vendor</span>
        </header>

        {/* Wrapper untuk Konten Halaman */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children} {/* Di sinilah halaman (page.tsx) akan dirender */}
        </main>
      </div>
    </div>
  );
}
