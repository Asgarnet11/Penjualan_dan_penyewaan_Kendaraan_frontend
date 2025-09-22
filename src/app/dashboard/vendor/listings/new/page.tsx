"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVehicle } from "@/lib/api";
import toast from "react-hot-toast";
import { CreateVehiclePayload } from "@/types/vehicle";

export default function NewListingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateVehiclePayload>>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    plate_number: "",
    color: "",
    vehicle_type: "mobil",
    transmission: "manual",
    fuel: "bensin",
    description: "",
    is_for_sale: false,
    sale_price: 0,
    is_for_rent: false,
    rental_price_daily: 0,
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Menyimpan listing...");

    try {
      const payload: CreateVehiclePayload = {
        brand: formData.brand!,
        model: formData.model!,
        year: Number(formData.year),
        plate_number: formData.plate_number!,
        color: formData.color!,
        vehicle_type: formData.vehicle_type as "mobil" | "motor",
        transmission: formData.transmission as "manual" | "matic",
        fuel: formData.fuel as "bensin" | "diesel" | "listrik",
        description: formData.description!,
        is_for_rent: formData.is_for_rent!,
        rental_price_daily: Number(formData.rental_price_daily),
        is_for_sale: formData.is_for_sale!,
        sale_price: Number(formData.sale_price),
      };

      await createVehicle(payload);
      toast.success("Listing berhasil ditambahkan!", { id: toastId });
      router.push("/dashboard/vendor/listings");
      router.refresh(); // Meminta Next.js untuk me-refresh data di halaman tujuan
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const FormRow = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );

  const FormField = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col space-y-2">{children}</div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Tambah Kendaraan Baru
      </h1>
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
                  placeholder="e.g., Toyota"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </FormField>
              <FormField>
                <label>Model</label>
                <input
                  name="model"
                  placeholder="e.g., Avanza"
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
                  placeholder="Tahun"
                  onChange={handleChange}
                  defaultValue={new Date().getFullYear()}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </FormField>
              <FormField>
                <label>Plat Nomor</label>
                <input
                  name="plate_number"
                  placeholder="e.g., DT 1234 XX"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </FormField>
            </FormRow>
            <FormField>
              <label>Warna</label>
              <input
                name="color"
                placeholder="e.g., Hitam Metalik"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </FormField>
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
              placeholder="Deskripsi lengkap tentang kondisi, fitur, dan histori kendaraan Anda..."
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
                checked={formData.is_for_rent}
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
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            )}

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_for_sale"
                checked={formData.is_for_sale}
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
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            )}
          </div>
        </section>

        <div className="text-right border-t pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
          >
            {isLoading ? "Menyimpan..." : "Simpan & Terbitkan Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}
