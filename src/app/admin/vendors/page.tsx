"use client";

import { useEffect, useState } from "react";
import { getAllUsersForAdmin, verifyVendor } from "@/lib/api";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

export default function VendorVerificationPage() {
  const [vendors, setVendors] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">(
    "unverified"
  );

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      // Di backend, kita mengambil semua user, lalu filter di frontend
      const response = await getAllUsersForAdmin();
      const allUsers: User[] = response.data;
      setVendors(allUsers.filter((user) => user.role === "vendor"));
    } catch (error) {
      toast.error("Gagal mengambil data vendor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleVerify = async (vendorId: string) => {
    const toastId = toast.loading("Memverifikasi vendor...");
    try {
      await verifyVendor(vendorId);
      toast.success("Vendor berhasil diverifikasi!", { id: toastId });
      fetchVendors(); // Refresh data
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  const filteredVendors = vendors.filter((v) => {
    if (filter === "verified") return v.is_verified;
    if (filter === "unverified") return !v.is_verified;
    return true;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Verifikasi Vendor
      </h1>
      {/* Tombol Filter di sini nanti */}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Memuat...
                </td>
              </tr>
            ) : (
              filteredVendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vendor.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vendor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vendor.is_verified ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Belum Diverifikasi
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!vendor.is_verified && (
                      <button
                        onClick={() => handleVerify(vendor.id)}
                        className="text-teal-600 hover:text-teal-900 font-semibold flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Verifikasi
                      </button>
                    )}
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
