"use client";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Mengarahkan ke login...</p>
        </div>
      </div>
    );
  }

  if (user.role !== "vendor") {
    if (typeof window !== "undefined") router.push("/");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Akses Ditolak
          </h2>
          <p className="text-gray-600">
            Anda tidak memiliki akses ke halaman ini.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex h-screen">
        {/* Overlay untuk mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed md:relative z-50 h-full
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
        >
          <VendorSidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Konten Utama */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar untuk Mobile */}
          <header className="md:hidden bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <h1 className="text-lg font-semibold text-gray-800">
                Dashboard Vendor
              </h1>

              {/* Spacer untuk menjaga title tetap di tengah */}
              <div className="w-9 h-9"></div>
            </div>
          </header>

          {/* Wrapper untuk Konten Halaman */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="min-h-full bg-gradient-to-br from-gray-50 to-white">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
