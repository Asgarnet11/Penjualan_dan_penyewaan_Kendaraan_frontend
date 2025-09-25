"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getMyProfile, getMyBookings, getMyPurchases } from "@/lib/api";
import { User } from "@/types/user";
import { Booking } from "@/types/booking";
import { SalesTransaction } from "@/types/sales";
import BookingHistoryCard from "@/components/features/BookingHistoryCard";
import PurchaseHistoryCard from "@/components/features/PurchaseHistoryCard";
import {
  LogOut,
  User as UserIcon,
  Mail,
  Calendar,
  ShoppingCart,
  Car,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation"; // <-- Import useRouter
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter(); // <-- Inisialisasi router
  const { logout, user: authUser } = useAuthStore(); // Ambil user dari store untuk ID
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [purchases, setPurchases] = useState<SalesTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bookings" | "purchases">(
    "bookings"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, bookingsRes, purchasesRes] = await Promise.all([
          getMyProfile(),
          getMyBookings(),
          getMyPurchases(),
        ]);
        setUser(profileRes.data);
        setBookings(bookingsRes.data || []);
        setPurchases(purchasesRes.data || []);
      } catch (err: unknown) {
        // <-- PERBAIKAN 1: Penanganan error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan yang tidak diketahui");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get user initial for avatar
  const userInitial = user?.full_name
    ? user.full_name.charAt(0).toUpperCase()
    : "?";

  // Calculate stats
  const totalBookings = bookings.length;
  const totalPurchases = purchases.length;
  // PERBAIKAN 2: Logika booking aktif disesuaikan dengan status backend
  const activeBookings = bookings.filter(
    (b) => b.status === "rented_out" || b.status === "confirmed"
  ).length;
  // PERBAIKAN 3: Logika transaksi selesai dibuat lebih aman
  const completedBookings = bookings.filter(
    (b) => b.status === "completed"
  ).length;
  const completedPurchases = purchases.filter(
    (p) => p.status === "completed"
  ).length;
  const completedTransactions = completedBookings + completedPurchases;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Memuat Profil...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Profile Header */}
        {user && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="h-32 bg-gradient-to-r from-teal-500 to-blue-600"></div>
            <div className="relative px-6 sm:px-8 pb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 sm:-mt-12 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center rounded-2xl font-bold text-4xl shadow-lg ring-4 ring-white mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                    {user.full_name}
                  </h1>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-2">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="mt-4 sm:mt-0 flex items-center gap-2 text-red-600 hover:text-red-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:bg-red-50 border border-transparent hover:border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Stat cards di sini */}
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav
              className="-mb-px flex space-x-8 px-6 sm:px-8"
              aria-label="Tabs"
            >
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === "bookings"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Car className="w-5 h-5" /> Riwayat Booking{" "}
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                    activeTab === "bookings"
                      ? "bg-teal-100 text-teal-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {totalBookings}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("purchases")}
                className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === "purchases"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <ShoppingCart className="w-5 h-5" /> Riwayat Pembelian{" "}
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                    activeTab === "purchases"
                      ? "bg-teal-100 text-teal-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {totalPurchases}
                </span>
              </button>
            </nav>
          </div>
          <div className="p-6 sm:p-8">
            {activeTab === "bookings" && (
              <div>
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Belum Ada Booking
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Mulai jelajahi kendaraan yang tersedia untuk disewa.
                    </p>
                    <button
                      onClick={() => router.push("/vehicles?is_for_rent=true")}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Mulai Sewa
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                      <BookingHistoryCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "purchases" && (
              <div>
                {purchases.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Belum Ada Pembelian
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Temukan kendaraan impian Anda di marketplace kami.
                    </p>
                    <button
                      onClick={() => router.push("/vehicles?is_for_sale=true")}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.map((purchase) => (
                      <PurchaseHistoryCard
                        key={purchase.id}
                        purchase={purchase}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
