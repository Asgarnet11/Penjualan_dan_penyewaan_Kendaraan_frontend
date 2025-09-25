"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/types/vehicle";
import { useAuthStore } from "@/stores/authStore";
import { createBooking, initiatePurchase, startConversation } from "@/lib/api";
import toast from "react-hot-toast";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import {
  Calendar,
  ShoppingBag,
  MessageSquare,
  Clock,
  MapPin,
} from "lucide-react";

interface VehicleActionPanelProps {
  vehicle: Vehicle;
  vehicleId: string;
  isMyOwnListing: boolean;
}

export default function VehicleActionPanel({
  vehicle,
  vehicleId,
  isMyOwnListing,
}: VehicleActionPanelProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const isAuth = !!user;

  const [isProcessing, setIsProcessing] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const handleBooking = async () => {
    if (!isAuth) {
      toast.error("Anda harus login untuk menyewa kendaraan.");
      router.push("/login");
      return;
    }

    if (!range || !range.from || !range.to) {
      toast.error("Silakan pilih tanggal mulai dan selesai sewa.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Memproses booking Anda...");

    try {
      await createBooking(vehicleId, range.from, range.to);
      toast.success(
        "Booking berhasil! Silakan cek profil Anda untuk pembayaran.",
        { id: toastId, duration: 4000 }
      );
      setRange(undefined);
    } catch (err: unknown) {
      // <-- PERBAIKAN DI SINI
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat booking";
      toast.error(message, { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePurchase = async () => {
    if (!isAuth) {
      toast.error("Anda harus login untuk membeli kendaraan.");
      router.push("/login");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Memproses pembelian Anda...");

    try {
      await initiatePurchase(vehicleId);
      toast.success(
        "Pembelian berhasil dimulai! Silakan cek profil Anda untuk pembayaran.",
        { id: toastId, duration: 4000 }
      );
    } catch (err: unknown) {
      // <-- PERBAIKAN DI SINI
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat pembelian";
      toast.error(message, { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartChat = async () => {
    if (!isAuth) {
      toast.error("Anda harus login untuk memulai chat.");
      router.push("/login");
      return;
    }

    const toastId = toast.loading("Memulai percakapan...");

    try {
      const conversation = await startConversation(vehicleId);
      toast.success("Percakapan dimulai!", { id: toastId });
      router.push(`/chat/${conversation.id}`);
    } catch (err: unknown) {
      // <-- PERBAIKAN DI SINI
      const message =
        err instanceof Error ? err.message : "Gagal memulai percakapan";
      toast.error(message, { id: toastId });
    }
  };

  const calculateDays = () => {
    if (range?.from && range?.to) {
      // Tambah 1 hari karena perhitungan inklusif
      return (
        Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      );
    }
    return 0;
  };

  const dayCount = calculateDays();
  const totalPrice = dayCount * (vehicle.rental_price_daily || 0);

  return (
    <div className="lg:sticky lg:top-28">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Price Header */}
        <div className="p-6 border-b border-gray-100">
          {/* Rental Price */}
          {vehicle.is_for_rent && (
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {formatRupiah(vehicle.rental_price_daily)}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    / hari
                  </span>
                </div>
              </div>
              <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                Sewa
              </div>
            </div>
          )}

          {/* Both available separator */}
          {vehicle.is_for_rent && vehicle.is_for_sale && (
            <div className="border-t border-gray-200 my-4"></div>
          )}

          {/* Sale Price */}
          {vehicle.is_for_sale && (
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-700">
                    {formatRupiah(vehicle.sale_price)}
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                Jual
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Date Picker for Rental */}
          {vehicle.is_for_rent && !isMyOwnListing && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Pilih Tanggal Sewa
              </h3>
              <div className="bg-gray-50 rounded-xl p-2 border border-gray-200">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={1}
                  pagedNavigation
                  className="flex justify-center"
                  disabled={{ before: new Date() }}
                  classNames={{
                    day_selected:
                      "bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-700",
                    day_today: "font-bold text-teal-600",
                    day_range_middle: "bg-teal-100 text-teal-900",
                  }}
                />
              </div>

              {/* Selected Date Summary */}
              {range?.from && range?.to && (
                <div className="mt-4 p-4 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Durasi:</span>
                      <span className="font-medium text-slate-800">
                        {dayCount} hari
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">
                          Total Biaya Sewa:
                        </span>
                        <span className="font-bold text-lg text-teal-700">
                          {formatRupiah(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {isMyOwnListing ? (
              <div className="text-center p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-xl">
                <h4 className="font-semibold mb-1">Ini adalah listing Anda</h4>
                <p className="text-sm">
                  Anda tidak dapat melakukan transaksi pada kendaraan sendiri.
                </p>
              </div>
            ) : (
              <>
                {vehicle.is_for_rent && (
                  <button
                    onClick={handleBooking}
                    disabled={isProcessing || !range?.from || !range?.to}
                    className="group w-full flex justify-center items-center bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {isProcessing ? "Memproses..." : "Sewa Sekarang"}
                  </button>
                )}
                {vehicle.is_for_sale && (
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="group w-full flex justify-center items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {isProcessing ? "Memproses..." : "Beli Sekarang"}
                  </button>
                )}
                <button
                  onClick={handleStartChat}
                  disabled={isProcessing}
                  className="group w-full flex justify-center items-center bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat dengan Vendor
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
