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
  const { isAuth } = useAuthStore();

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
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat booking", {
        id: toastId,
      });
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
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat pembelian", {
        id: toastId,
      });
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
    } catch (err: any) {
      toast.error(err.message || "Gagal memulai percakapan", { id: toastId });
    }
  };

  const calculateDays = () => {
    if (range?.from && range?.to) {
      return Math.ceil(
        (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
      );
    }
    return 0;
  };

  const totalPrice = calculateDays() * (vehicle.rental_price_daily || 0);

  return (
    <div className="lg:sticky lg:top-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Price Header */}
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-teal-50 p-6 border-b border-gray-100">
          <div className="space-y-4">
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
                  <div className="flex items-center text-xs text-slate-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Minimum 1 hari sewa</span>
                  </div>
                </div>
                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                  Sewa
                </div>
              </div>
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
                  <div className="flex items-center text-xs text-slate-500 mt-1">
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    <span>Harga pembelian</span>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  Jual
                </div>
              </div>
            )}

            {/* Both available separator */}
            {vehicle.is_for_rent && vehicle.is_for_sale && (
              <div className="border-t border-gray-200 pt-4 -mb-2"></div>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Date Picker for Rental */}
          {vehicle.is_for_rent && !isMyOwnListing && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Pilih Tanggal Sewa
                </h3>
                <div className="flex items-center text-sm text-slate-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Tersedia</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={1}
                  pagedNavigation
                  className="flex justify-center"
                  disabled={{ before: new Date() }}
                  classNames={{
                    day_selected: "bg-teal-600 text-white hover:bg-teal-700",
                    day_range_middle: "bg-teal-100 text-teal-900",
                    day_range_start: "bg-teal-600 text-white",
                    day_range_end: "bg-teal-600 text-white",
                    day_today: "bg-blue-100 text-blue-900 font-semibold",
                  }}
                />
              </div>

              {/* Selected Date Summary */}
              {range?.from && range?.to && (
                <div className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Periode sewa:</span>
                      <span className="font-medium text-slate-800">
                        {range.from.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        -{" "}
                        {range.to.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Durasi:</span>
                      <span className="font-medium text-slate-800">
                        {calculateDays()} hari
                      </span>
                    </div>
                    <div className="border-t border-teal-200 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">
                          Total Biaya:
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
              <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-amber-900 mb-1">
                  Ini adalah listing Anda
                </h4>
                <p className="text-sm text-amber-700">
                  Anda tidak dapat melakukan transaksi pada kendaraan sendiri
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Rental Button */}
                {vehicle.is_for_rent && (
                  <button
                    onClick={handleBooking}
                    disabled={isProcessing || !range?.from || !range?.to}
                    className="group w-full flex justify-center items-center bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-teal-700 hover:to-teal-800 focus:ring-4 focus:ring-teal-200 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    )}
                    {isProcessing ? "Memproses..." : "Sewa Sekarang"}
                  </button>
                )}

                {/* Purchase Button */}
                {vehicle.is_for_sale && (
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="group w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    )}
                    {isProcessing ? "Memproses..." : "Beli Sekarang"}
                  </button>
                )}

                {/* Chat Button */}
                <button
                  onClick={handleStartChat}
                  disabled={isProcessing}
                  className="group w-full flex justify-center items-center bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-slate-700 hover:to-slate-800 focus:ring-4 focus:ring-slate-200 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg border border-slate-500"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <MessageSquare className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  )}
                  Chat dengan Vendor
                </button>
              </div>
            )}
          </div>

          {/* Additional Info */}
          {!isMyOwnListing && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center text-xs text-slate-500">
                <span>Transaksi aman dan terpercaya</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
