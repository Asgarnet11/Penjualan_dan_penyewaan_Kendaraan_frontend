"use client";

import { useEffect, useState } from "react";
import {
  getVendorBookings,
  getVendorSales,
  updateBookingStatus,
} from "@/lib/api";
import { Booking } from "@/types/booking";
import { SalesTransaction } from "@/types/sales";
import BookingHistoryCard from "@/components/features/BookingHistoryCard";
import PurchaseHistoryCard from "@/components/features/PurchaseHistoryCard";
import { Car, Check, ClipboardList, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageOrdersPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sales, setSales] = useState<SalesTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bookings" | "sales">("bookings");

  const fetchData = async () => {
    // Tidak perlu setIsLoading(true) di sini karena sudah diatur di state awal
    try {
      const [bookingsRes, salesRes] = await Promise.all([
        getVendorBookings(),
        getVendorSales(),
      ]);
      setBookings(bookingsRes.data || []);
      setSales(salesRes.data || []);
      setError(null); // Bersihkan error jika fetch berhasil
    } catch (err: unknown) {
      // <-- PERBAIKAN 1
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (
    bookingId: string,
    status: "rented_out" | "completed" | "cancelled"
  ) => {
    const toastId = toast.loading(
      `Mengubah status menjadi ${status.replace("_", " ")}...`
    );
    try {
      await updateBookingStatus(bookingId, { status });
      toast.success("Status berhasil diperbarui!", { id: toastId });
      // Ambil ulang data untuk merefresh tampilan
      fetchData();
    } catch (err: unknown) {
      // <-- PERBAIKAN 2
      if (err instanceof Error) {
        toast.error(err.message, { id: toastId });
      } else {
        toast.error("Gagal memperbarui status", { id: toastId });
      }
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Memuat data pesanan...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8 border-b pb-4">
        <ClipboardList className="w-8 h-8 mr-4 text-teal-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Pesanan</h1>
          <p className="text-gray-500 mt-1">
            Lihat semua transaksi penyewaan dan penjualan untuk kendaraan Anda.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "bookings"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Pesanan Sewa ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "sales"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Pesanan Penjualan ({sales.length})
          </button>
        </nav>
      </div>

      {/* Konten Tab */}
      {activeTab === "bookings" && (
        <div>
          {bookings.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                Belum ada pesanan sewa yang masuk.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-sm flex flex-col"
                >
                  <BookingHistoryCard booking={booking} />
                  {/* Panel Aksi untuk Vendor */}
                  <div className="bg-gray-50 p-3 mt-auto rounded-b-lg border-t flex justify-end space-x-2">
                    {booking.status === "confirmed" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking.id, "rented_out")
                          }
                          className="text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-md flex items-center transition-colors"
                        >
                          <Car className="w-4 h-4 mr-1" />
                          Mulai Sewa
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking.id, "cancelled")
                          }
                          className="text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-md flex items-center transition-colors"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Batalkan
                        </button>
                      </>
                    )}
                    {booking.status === "rented_out" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(booking.id, "completed")
                        }
                        className="text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-md flex items-center transition-colors"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Selesaikan
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "sales" && (
        <div>
          {sales.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                Belum ada pesanan penjualan yang masuk.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sales.map((purchase) => (
                <PurchaseHistoryCard key={purchase.id} purchase={purchase} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
