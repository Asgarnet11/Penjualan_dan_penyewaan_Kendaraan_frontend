"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getVehicleById, updateVehicle } from "@/lib/api";
import toast from "react-hot-toast";
import { UpdateVehiclePayload, Vehicle } from "@/types/vehicle";

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<Partial<UpdateVehiclePayload>>({});

  useEffect(() => {
    if (!vehicleId) return;

    const fetchVehicleData = async () => {
      try {
        const vehicle = await getVehicleById(vehicleId);
        setFormData(vehicle);
      } catch (error) {
        toast.error("Gagal memuat data kendaraan.");
        router.back();
      } finally {
        setIsFetching(false);
      }
    };
    fetchVehicleData();
  }, [vehicleId, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // ... (Fungsi handleChange sama persis dengan di halaman 'Tambah Listing Baru')
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Memperbarui listing...");

    try {
      const payload: UpdateVehiclePayload = {
        // ... (Struktur payload sama persis dengan di halaman 'Tambah Listing Baru')
      } as UpdateVehiclePayload;

      await updateVehicle(vehicleId, payload);
      toast.success("Listing berhasil diperbarui!", { id: toastId });
      router.push("/dashboard/vendor/listings");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center p-10">Memuat data form...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Kendaraan</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-8"
      >
        {/* SEMUA INPUT FORM DI SINI SAMA DENGAN new/page.tsx */}
        {/* PERBEDAANNYA: tambahkan properti 'value' atau 'defaultValue' dan 'checked' */}

        {/* Contoh: */}
        <input
          name="brand"
          value={formData.brand || ""}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="is_for_rent"
          checked={formData.is_for_rent || false}
          onChange={handleChange}
        />

        {/* ... (Lengkapi semua field form dengan cara yang sama) ... */}

        <div className="text-right border-t pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
