"use client";

import { useEffect, useState } from "react";
import { getAllListingsForAdmin, deleteListingByAdmin } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import toast from "react-hot-toast";
import { Trash2, ShieldCheck, ShieldAlert } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function ListingManagementPage() {
  const [listings, setListings] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const response = await getAllListingsForAdmin();
      setListings(response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data listing.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (vehicleId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus listing ini?")) {
      const toastId = toast.loading("Menghapus listing...");
      try {
        await deleteListingByAdmin(vehicleId);
        toast.success("Listing berhasil dihapus.", { id: toastId });
        setListings((prevListings) =>
          prevListings.filter((l) => l.id !== vehicleId)
        );
      } catch (err: any) {
        toast.error(err.message, { id: toastId });
      }
    }
  };

  const statusChip = (status: string) => {
    let color = "bg-gray-100 text-gray-800";
    if (status === "available") color = "bg-green-100 text-green-800";
    if (status === "rented_out") color = "bg-yellow-100 text-yellow-800";
    if (status === "sold") color = "bg-blue-100 text-blue-800";
    if (status === "maintenance") color = "bg-purple-100 text-purple-800";

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manajemen Listing
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kendaraan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Pemilik (Vendor)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tanggal Dibuat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  Memuat data listing...
                </td>
              </tr>
            ) : (
              listings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {listing.brand} {listing.model}
                    </div>
                    <div className="text-sm text-gray-500">{listing.year}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Di backend, kita perlu JOIN untuk mendapatkan nama vendor */}
                    <span className="font-mono">
                      {listing.owner_id.substring(0, 8)}...
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {statusChip(listing.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(listing.created_at), "dd MMM yyyy", {
                      locale: id,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="text-red-600 hover:text-red-900 font-semibold flex items-center"
                      title="Hapus Listing"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
