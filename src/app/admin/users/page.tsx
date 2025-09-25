"use client";

import { useEffect, useState } from "react";
import { getAllUsersForAdmin, deleteUser } from "@/lib/api";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsersForAdmin();
      setUsers(response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data pengguna.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat diurungkan."
      )
    ) {
      const toastId = toast.loading("Menghapus pengguna...");
      try {
        await deleteUser(userId);
        toast.success("Pengguna berhasil dihapus.", { id: toastId });
        // Refresh data setelah berhasil menghapus
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message, { id: toastId });
        }
      }
    }

    const roleChip = (role: string) => {
      let color = "bg-gray-100 text-gray-800";
      if (role === "admin") color = "bg-red-100 text-red-800";
      if (role === "vendor") color = "bg-blue-100 text-blue-800";
      if (role === "customer") color = "bg-green-100 text-green-800";
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
          {role.toUpperCase()}
        </span>
      );
    };

    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Manajemen Pengguna
        </h1>

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
                  Peran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tanggal Bergabung
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
                    Memuat data pengguna...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {user.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {roleChip(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {format(new Date(user.created_at), "dd MMM yyyy, HH:mm", {
                        locale: id,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 font-semibold flex items-center disabled:text-gray-400"
                        // Nonaktifkan tombol hapus untuk admin lain agar tidak bisa menghapus diri sendiri/admin lain
                        disabled={user.role === "admin"}
                        title={
                          user.role === "admin"
                            ? "Admin tidak dapat dihapus"
                            : "Hapus Pengguna"
                        }
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
  };
}
