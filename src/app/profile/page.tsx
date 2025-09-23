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
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const { logout } = useAuthStore();
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
        setBookings(bookingsRes.data);
        setPurchases(purchasesRes.data || []);
      } catch (err: any) {
        setError(err.message);
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
  const activeBookings = bookings.filter(
    (b) => b.status === "active" || b.status === "confirmed"
  ).length;
  const completedTransactions = [...bookings, ...purchases].filter(
    (t) => t.status === "completed"
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Memuat Profil
          </h2>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-6">Error: {error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Profile Header */}
        {user && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-teal-500 to-blue-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Profile Content */}
            <div className="relative px-6 sm:px-8 pb-8">
              {/* Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center rounded-2xl font-bold text-2xl shadow-lg ring-4 ring-white mb-4 sm:mb-0 sm:mr-6">
                  {userInitial}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {user.full_name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {user.role === "customer"
                        ? "Pelanggan"
                        : user.role === "vendor"
                        ? "Vendor"
                        : "Admin"}
                    </div>
                    {user.created_at && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        Bergabung{" "}
                        {new Date(user.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-red-50 border border-red-200 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-700">
                        {totalBookings}
                      </p>
                      <p className="text-sm text-blue-600 font-medium">
                        Total Booking
                      </p>
                    </div>
                    <Car className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-emerald-700">
                        {totalPurchases}
                      </p>
                      <p className="text-sm text-emerald-600 font-medium">
                        Total Pembelian
                      </p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-700">
                        {activeBookings}
                      </p>
                      <p className="text-sm text-orange-600 font-medium">
                        Booking Aktif
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-teal-700">
                        {completedTransactions}
                      </p>
                      <p className="text-sm text-teal-600 font-medium">
                        Selesai
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-teal-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs Header */}
          <div className="border-b border-gray-200">
            <div className="px-6 sm:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`relative whitespace-nowrap py-6 px-1 border-b-2 font-semibold text-sm transition-all duration-200 ${
                    activeTab === "bookings"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    Riwayat Booking
                    {totalBookings > 0 && (
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                          activeTab === "bookings"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {totalBookings}
                      </span>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("purchases")}
                  className={`relative whitespace-nowrap py-6 px-1 border-b-2 font-semibold text-sm transition-all duration-200 ${
                    activeTab === "purchases"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Riwayat Pembelian
                    {totalPurchases > 0 && (
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                          activeTab === "purchases"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {totalPurchases}
                      </span>
                    )}
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === "bookings" && (
              <div>
                {bookings.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Car className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Belum Ada Booking
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Anda belum pernah melakukan booking kendaraan. Mulai
                      jelajahi kendaraan yang tersedia untuk disewa.
                    </p>
                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Mulai Booking
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
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingCart className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Belum Ada Pembelian
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Anda belum pernah melakukan pembelian kendaraan. Temukan
                      kendaraan impian Anda di marketplace kami.
                    </p>
                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
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
