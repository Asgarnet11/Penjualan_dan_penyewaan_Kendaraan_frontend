"use client"; // Diperlukan untuk client-side protection

import AdminSidebar from "@/components/features/AdminSidebar";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { Shield, ShieldAlert, Loader2 } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  if (user === null) {
    if (typeof window !== "undefined") router.push("/login");
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Mengalihkan ke Login
          </h2>
          <p className="text-slate-600 mb-6">
            Anda akan diarahkan ke halaman login untuk mengakses dashboard
            admin.
          </p>
          <div className="flex justify-center">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Sedang memproses...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    if (typeof window !== "undefined") router.push("/");
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Akses Ditolak
          </h2>
          <p className="text-slate-600 mb-4">
            Maaf, Anda tidak memiliki izin untuk mengakses dashboard admin.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                Diperlukan akun Administrator
              </span>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-slate-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors focus:ring-4 focus:ring-slate-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay - You'll need to implement mobile sidebar logic */}
      {/* This is a placeholder for future mobile sidebar implementation */}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button - placeholder for future implementation */}
              <button className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div>
                <h1 className="text-xl font-semibold text-slate-800 lg:text-2xl">
                  Dashboard Admin
                </h1>
                <p className="text-sm text-slate-500 hidden sm:block">
                  Kelola sistem dengan mudah dan efisien
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-700">
                  {user.full_name}
                </p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.full_name?.charAt(0)?.toUpperCase() || "A"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
