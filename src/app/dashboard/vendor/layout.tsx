"use client";

import { useState, useEffect } from "react"; // <-- Import useEffect
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

  // State untuk menandakan apakah pengecekan sudah selesai
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Pindahkan logika proteksi ke dalam useEffect
  useEffect(() => {
    // Cek hanya di sisi client
    if (typeof window !== "undefined") {
      if (user === null) {
        router.push("/login");
      } else if (user.role !== "vendor") {
        router.push("/"); // Arahkan ke homepage jika bukan vendor
      } else {
        // Jika user adalah vendor, hentikan pengecekan
        setIsCheckingAuth(false);
      }
    }
  }, [user, router]);

  // Selama pengecekan, tampilkan layar loading
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p>Memverifikasi akses...</p>
      </div>
    );
  }

  // Setelah pengecekan selesai dan user adalah vendor, tampilkan layout dashboard
  return (
    <div className="flex h-screen bg-gray-100">
      <VendorSidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
