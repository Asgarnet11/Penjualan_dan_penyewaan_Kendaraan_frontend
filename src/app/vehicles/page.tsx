"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getVehicleById } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";

// State Management
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

// Components
import VehicleImageGallery from "@/components/vehicles/VehicleImageGallery";
import VehicleInfo from "@/components/vehicles/VehicleInfo";
import VehicleSpecs from "@/components/vehicles/VehicleSpecs";
import VehicleActionPanel from "@/components/vehicles/VehicleActionPanel";
import LoadingState from "@/components/vehicles/LoadingState";
import ErrorState from "@/components/vehicles/ErrorState";

// Ikon
import { ChevronLeft } from "lucide-react";

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicleId = params.id as string;

  const { user } = useAuthStore();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) return;

    const fetchVehicle = async () => {
      setIsLoading(true);
      try {
        const data = await getVehicleById(vehicleId);
        setVehicle(data);
      } catch (err: unknown) {
        // <-- PERBAIKAN DI SINI
        const message =
          err instanceof Error ? err.message : "Gagal memuat detail kendaraan";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Kendaraan Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-4">
            Kendaraan yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const isMyOwnListing = user?.id === vehicle.owner_id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors font-medium group"
          >
            <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Kembali ke Daftar Kendaraan
          </Link>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
          {/* Kolom Kiri: Gambar, Deskripsi, Spesifikasi */}
          <div className="xl:col-span-3 space-y-8">
            <VehicleImageGallery vehicle={vehicle} />
            <VehicleInfo vehicle={vehicle} />
            <VehicleSpecs vehicle={vehicle} />
          </div>

          {/* Kolom Kanan: Panel Aksi */}
          <div className="xl:col-span-1">
            <VehicleActionPanel
              vehicle={vehicle}
              vehicleId={vehicleId}
              isMyOwnListing={isMyOwnListing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
