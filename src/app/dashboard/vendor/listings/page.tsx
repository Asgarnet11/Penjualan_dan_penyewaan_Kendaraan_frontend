"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyListings, deleteVehicle } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import {
  PlusCircle,
  ClipboardList,
  Edit,
  Trash2,
  Car,
  Package,
} from "lucide-react";
import VehicleCard from "@/components/features/VehicleCard";
import toast from "react-hot-toast";

export default function MyListingsPage() {
  const [listings, setListings] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      const response = await getMyListings();
      setListings(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Fungsi untuk menangani penghapusan
  const handleDelete = async (vehicleId: string) => {
    // Tampilkan dialog konfirmasi
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus listing ini secara permanen?"
      )
    ) {
      const toastId = toast.loading("Menghapus listing...");
      try {
        await deleteVehicle(vehicleId);
        toast.success("Listing berhasil dihapus.", { id: toastId });
        setListings((prevListings) =>
          prevListings.filter((v) => v.id !== vehicleId)
        );
      } catch (err: any) {
        toast.error(err.message, { id: toastId });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Memuat listing Anda...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-red-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Terjadi Kesalahan
              </h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Car className="w-6 h-6 text-teal-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Manajemen Listing
                </h1>
              </div>
              <p className="text-gray-600">
                Lihat, tambah, dan kelola semua kendaraan Anda di sini.
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  {listings.length} Listing Aktif
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link
                href="/dashboard/vendor/orders"
                className="inline-flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 shadow-sm transition-all duration-200 font-medium"
              >
                <ClipboardList className="w-5 h-5 mr-2" />
                Kelola Pesanan
              </Link>
              <Link
                href="/dashboard/vendor/listings/new"
                className="inline-flex items-center justify-center bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-xl hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Tambah Kendaraan
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Anda Belum Punya Listing
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Ayo tambahkan kendaraan pertama Anda untuk mulai disewa atau
                dijual! Dapatkan penghasilan tambahan dengan mudah.
              </p>
              <Link
                href="/dashboard/vendor/listings/new"
                className="inline-flex items-center bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-xl hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Tambah Kendaraan Pertama
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((vehicle) => (
              <div key={vehicle.id} className="relative group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <VehicleCard vehicle={vehicle} />

                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200">
                      <Link
                        href={`/dashboard/vendor/listings/${vehicle.id}/edit`}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Edit Listing"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Hapus Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions on Hover */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/vendor/listings/${vehicle.id}/edit`}
                        className="flex-1 bg-white/95 backdrop-blur-sm text-gray-700 text-center py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 text-sm font-medium border border-gray-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="flex-1 bg-white/95 backdrop-blur-sm text-gray-700 py-2 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200 text-sm font-medium border border-gray-200"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
