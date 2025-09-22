"use client"; // Komponen ini interaktif (memiliki state dan event handler)

import { useState, useEffect } from "react";
import { getVehicleById, createBooking, initiatePurchase } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

// UI & Utility Libraries
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import gaya default kalender
import toast from "react-hot-toast";

// Icons
import {
  Car,
  Calendar,
  Gauge,
  GitCommitVertical,
  Droplet,
  ChevronLeft,
  ShoppingBag,
  Paperclip,
} from "lucide-react";
import Link from "next/link";

export default function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { isAuth } = useAuthStore();

  // State untuk data kendaraan
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  // State untuk UI & Interaksi
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); // Untuk menonaktifkan tombol saat aksi berjalan
  const [error, setError] = useState<string | null>(null);

  // State untuk kalender pemesanan sewa
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    const fetchVehicle = async () => {
      setIsLoading(true);
      try {
        const data = await getVehicleById(params.id);
        setVehicle(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicle();
  }, [params.id]); // Fetch data setiap kali ID di URL berubah

  // Fungsi untuk menangani proses sewa
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
      await createBooking(params.id, range.from, range.to);
      toast.success(
        "Booking berhasil! Silakan cek profil Anda untuk pembayaran.",
        { id: toastId, duration: 4000 }
      );
      setRange(undefined); // Reset kalender setelah berhasil
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  // Fungsi untuk menangani proses pembelian
  const handlePurchase = async () => {
    if (!isAuth) {
      toast.error("Anda harus login untuk membeli kendaraan.");
      router.push("/login");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Memproses pembelian Anda...");

    try {
      await initiatePurchase(params.id);
      toast.success(
        "Pembelian berhasil dimulai! Silakan cek profil Anda untuk pembayaran.",
        { id: toastId, duration: 4000 }
      );
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Memuat detail kendaraan...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!vehicle) {
    return <div className="text-center py-20">Kendaraan tidak ditemukan.</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tombol Kembali */}
        <Link
          href="/"
          className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Kembali ke Daftar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Kolom Kiri: Gambar, Deskripsi, Spesifikasi */}
          <div className="lg:col-span-2">
            {/* Galeri Gambar Placeholder */}
            <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <Car className="w-24 h-24 text-gray-400" />
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="mt-2 text-xl text-gray-500">
              Tahun {vehicle.year} • {vehicle.color}
            </p>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Paperclip className="w-5 h-5 mr-3 text-teal-500" />
                Deskripsi
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Spesifikasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center">
                  <GitCommitVertical className="w-5 h-5 mr-3 text-teal-500" />{" "}
                  Transmisi:{" "}
                  <strong className="ml-2">{vehicle.transmission}</strong>
                </div>
                <div className="flex items-center">
                  <Droplet className="w-5 h-5 mr-3 text-teal-500" /> Bahan
                  Bakar: <strong className="ml-2">{vehicle.fuel}</strong>
                </div>
                <div className="flex items-center">
                  <Car className="w-5 h-5 mr-3 text-teal-500" /> Tipe:{" "}
                  <strong className="ml-2">{vehicle.vehicle_type}</strong>
                </div>
                <div className="flex items-center">
                  <Gauge className="w-5 h-5 mr-3 text-teal-500" /> Plat:{" "}
                  <strong className="ml-2">{vehicle.plate_number}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Panel Aksi (Booking/Beli) */}
          <div className="order-first lg:order-last">
            <div className="sticky top-28 bg-white p-6 rounded-xl shadow-lg border">
              <div className="mb-4">
                {vehicle.is_for_rent && (
                  <p className="text-3xl font-bold text-teal-600">
                    {formatRupiah(vehicle.rental_price_daily)}
                    <span className="text-lg font-normal text-gray-500">
                      {" "}
                      / hari
                    </span>
                  </p>
                )}
                {vehicle.is_for_sale && (
                  <p
                    className={`text-3xl font-bold text-blue-600 ${
                      vehicle.is_for_rent ? "mt-2" : ""
                    }`}
                  >
                    {formatRupiah(vehicle.sale_price)}
                  </p>
                )}
              </div>

              {vehicle.is_for_rent && (
                <div className="border-t pt-4">
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    Pilih Tanggal Sewa
                  </label>
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    numberOfMonths={1}
                    pagedNavigation
                    className="flex justify-center"
                    disabled={{ before: new Date() }} // Nonaktifkan tanggal kemarin
                  />
                </div>
              )}

              <div className="mt-6 space-y-3">
                {vehicle.is_for_rent && (
                  <button
                    onClick={handleBooking}
                    disabled={
                      isProcessing || !range || !range.from || !range.to
                    }
                    className="w-full flex justify-center items-center bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {isProcessing ? "Memproses..." : "Sewa Sekarang"}
                  </button>
                )}
                {vehicle.is_for_sale && (
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {isProcessing ? "Memproses..." : "Beli Sekarang"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
