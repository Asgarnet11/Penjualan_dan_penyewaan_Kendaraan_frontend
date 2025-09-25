"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getVehicleById, updateVehicle } from "@/lib/api";
import toast from "react-hot-toast";
import { UpdateVehiclePayload, Vehicle } from "@/types/vehicle";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  // Gunakan Partial<Vehicle> agar bisa menampung semua data dari getVehicleById
  const [formData, setFormData] = useState<Partial<Vehicle>>({});

  useEffect(() => {
    if (!vehicleId) return;

    // Fungsi untuk mengambil data kendaraan yang ada dan mengisi form
    const fetchVehicleData = async () => {
      try {
        const vehicle = await getVehicleById(vehicleId);
        setFormData(vehicle);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Gagal memuat data kendaraan.";
        toast.error(message);
        router.back();
      } finally {
        setIsFetching(false);
      }
    };
    fetchVehicleData();
  }, [vehicleId, router]);

  // Fungsi handleChange yang lengkap untuk menangani semua jenis input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Fungsi handleSubmit yang lengkap untuk mengirim data ke API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Memperbarui listing...");

    try {
      // Membangun payload dengan tipe data yang benar
      const payload: UpdateVehiclePayload = {
        brand: formData.brand!,
        model: formData.model!,
        year: Number(formData.year),
        plate_number: formData.plate_number!,
        color: formData.color!,
        vehicle_type: formData.vehicle_type as "mobil" | "motor",
        transmission: formData.transmission as "manual" | "matic",
        fuel: formData.fuel as "bensin" | "diesel" | "listrik",
        description: formData.description!,
        is_for_rent: !!formData.is_for_rent,
        rental_price_daily: Number(formData.rental_price_daily),
        is_for_sale: !!formData.is_for_sale,
        sale_price: Number(formData.sale_price),
        location: formData.location || "",
        features: formData.features || [],
      };

      await updateVehicle(vehicleId, payload);
      toast.success("Listing berhasil diperbarui!", { id: toastId });
      router.push("/dashboard/vendor/listings");
      router.refresh();
    } catch (err: unknown) {
      // Penanganan error yang type-safe
      if (err instanceof Error) {
        toast.error(err.message, { id: toastId });
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui", { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center p-10">Memuat data form...</div>;
  }

  // Helper komponen untuk merapikan form
  const FormRow = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );

  const FormField = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col space-y-2">{children}</div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Kendaraan</h1>
        <Link
          href="/dashboard/vendor/listings"
          className="flex items-center text-gray-600 hover:text-teal-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-8"
      >
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Detail Utama
          </h2>
          <div className="space-y-6">
            <FormRow>
              <FormField>
                <label>Merek</label>
                <input
                  name="brand"
                  value={formData.brand || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </FormField>
              <FormField>
                <label>Model</label>
                <input
                  name="model"
                  value={formData.model || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField>
                <label>Tahun</label>
                <input
                  name="year"
                  type="number"
                  value={formData.year || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </FormField>
              <FormField>
                <label>Plat Nomor</label>
                <input
                  name="plate_number"
                  value={formData.plate_number || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField>
                <label>Warna</label>
                <input
                  name="color"
                  value={formData.color || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </FormField>
              <FormField>
                <label>Lokasi</label>
                <input
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., Kota Kendari"
                />
              </FormField>
            </FormRow>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Spesifikasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField>
              <label>Tipe Kendaraan</label>
              <select
                name="vehicle_type"
                value={formData.vehicle_type || "mobil"}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="mobil">Mobil</option>
                <option value="motor">Motor</option>
              </select>
            </FormField>
            <FormField>
              <label>Transmisi</label>
              <select
                name="transmission"
                value={formData.transmission || "manual"}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="manual">Manual</option>
                <option value="matic">Matic</option>
              </select>
            </FormField>
            <FormField>
              <label>Bahan Bakar</label>
              <select
                name="fuel"
                value={formData.fuel || "bensin"}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="bensin">Bensin</option>
                <option value="diesel">Diesel</option>
                <option value="listrik">Listrik</option>
              </select>
            </FormField>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Deskripsi & Harga
          </h2>
          <FormField>
            <label>Deskripsi</label>
            <textarea
              name="description"
              value={formData.description || ""}
              rows={5}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </FormField>
          <div className="space-y-4 mt-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_for_rent"
                checked={formData.is_for_rent || false}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-teal-600 rounded"
              />
              <span className="ml-3 text-gray-700 font-medium">
                Tersedia untuk Disewa
              </span>
            </label>
            {formData.is_for_rent && (
              <input
                name="rental_price_daily"
                type="number"
                placeholder="Harga Sewa per Hari (Rp)"
                value={formData.rental_price_daily || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            )}

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_for_sale"
                checked={formData.is_for_sale || false}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-teal-600 rounded"
              />
              <span className="ml-3 text-gray-700 font-medium">
                Tersedia untuk Dijual
              </span>
            </label>
            {formData.is_for_sale && (
              <input
                name="sale_price"
                type="number"
                placeholder="Harga Jual (Rp)"
                value={formData.sale_price || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            )}
          </div>
        </section>

        <div className="text-right border-t pt-6">
          <button
            type="submit"
            disabled={isLoading || isFetching}
            className="inline-flex items-center bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
          >
            <Save className="w-5 h-5 mr-2" />
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
