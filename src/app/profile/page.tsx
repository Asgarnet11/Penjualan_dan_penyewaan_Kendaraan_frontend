"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getMyProfile, getMyBookings, getMyPurchases } from "@/lib/api";
import { User } from "@/types/user";
import { Booking } from "@/types/booking";
import { SalesTransaction } from "@/types/sales";
import BookingHistoryCard from "@/components/features/BookingHistoryCard";
import PurchaseHistoryCard from "@/components/features/PurchaseHistoryCard";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const { logout } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  // PERBAIKAN DI SINI: Inisialisasi dengan array kosong
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
        // Pastikan backend mengembalikan array kosong jika tidak ada data
        setPurchases(purchasesRes.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-20">Memuat Profil...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Profile Header */}
        {user && (
          <div className="bg-white p-8 rounded-lg shadow-md mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.full_name}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-red-500 hover:text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        )}

        {/* Transaction History with Tabs */}
        <div>
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "bookings"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Riwayat Booking
              </button>
              <button
                onClick={() => setActiveTab("purchases")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "purchases"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Riwayat Pembelian
              </button>
            </nav>
          </div>

          {/* Content for Tabs */}
          {activeTab === "bookings" && (
            <div>
              {bookings.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">
                    Anda belum pernah melakukan booking.
                  </p>
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
              {/* Dengan perbaikan state awal, baris ini sekarang aman */}
              {purchases.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">
                    Anda belum pernah melakukan pembelian.
                  </p>
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
  );
}
