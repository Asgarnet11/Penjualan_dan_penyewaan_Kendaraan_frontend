"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyListings, deleteVehicle } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import { PlusCircle, ClipboardList, Edit, Trash2 } from "lucide-react";
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
    return <div className="text-center p-10">Memuat listing Anda...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Listing
          </h1>
          <p className="text-gray-500 mt-1">
            Lihat, tambah, dan kelola semua kendaraan Anda di sini.
          </p>
        </div>
        <Link
          href="/dashboard/vendor/orders"
          className="inline-flex items-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
        >
          <ClipboardList className="w-5 h-5 mr-2" />
          Kelola Pesanan
        </Link>
        <Link
          href="/dashboard/vendor/listings/new"
          className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 shadow-sm transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Tambah Kendaraan
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-800">
            Anda Belum Punya Listing
          </h3>
          <p className="text-gray-500 mt-2">
            Ayo tambahkan kendaraan pertama Anda untuk mulai disewa atau dijual!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {listings.map((vehicle) => (
            <div key={vehicle.id} className="relative">
              <VehicleCard vehicle={vehicle} />
              {/* Tombol Aksi di atas Kartu */}
              <div className="absolute top-3 right-3 flex space-x-2 bg-white/70 backdrop-blur-sm p-1 rounded-lg">
                <Link
                  href={`/dashboard/vendor/listings/${vehicle.id}/edit`}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                  title="Edit Listing"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
                  title="Hapus Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
