"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVehicle } from "@/lib/api";
import toast from "react-hot-toast";
import { CreateVehiclePayload } from "@/types/vehicle";
import { ArrowLeft, Save, Car, Plus, MapPin, Camera } from "lucide-react";
import Link from "next/link";

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
    location: "",
    features: [],
    images: [],
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
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: checked
        ? [...(prev.features || []), feature]
        : (prev.features || []).filter((f) => f !== feature),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({ ...prev, images: imageArray }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    if (!formData.brand || !formData.model || !formData.plate_number) {
      toast.error("Harap lengkapi semua field yang wajib diisi.");
      return;
    }

    if (!formData.is_for_rent && !formData.is_for_sale) {
      toast.error("Pilih minimal satu: untuk disewa atau dijual.");
      return;
    }

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
        location: formData.location || "",
        features: formData.features || [],
        images: formData.images || [],
      };

      await createVehicle(payload);
      toast.success("Listing berhasil ditambahkan!", { id: toastId });
      router.push("/dashboard/vendor/listings");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const availableFeatures = [
    "AC",
    "GPS",
    "Bluetooth",
    "USB Charger",
    "Airbags",
    "ABS",
    "Sunroof",
    "Leather Seats",
    "Parking Sensor",
    "Backup Camera",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/vendor/listings"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Plus className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Tambah Kendaraan Baru
                </h1>
                <p className="text-gray-600">
                  Daftarkan kendaraan Anda untuk disewa atau dijual
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">
              {/* Detail Utama */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Car className="w-5 h-5 text-teal-600" />
                  Detail Utama Kendaraan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Merek <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Contoh: Toyota"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Contoh: Avanza"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tahun <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plat Nomor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="plate_number"
                      value={formData.plate_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Contoh: B 1234 ABC"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Warna
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Contoh: Putih Metalik"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Lokasi
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Contoh: Jakarta Selatan"
                    />
                  </div>
                </div>
              </div>

              {/* Spesifikasi */}
              <div className="space-y-6 border-t pt-8">
                <h2 className="text-xl font-semibold text-gray-800">
                  Spesifikasi Kendaraan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipe Kendaraan
                    </label>
                    <select
                      name="vehicle_type"
                      value={formData.vehicle_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="mobil">Mobil</option>
                      <option value="motor">Motor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmisi
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="manual">Manual</option>
                      <option value="matic">Matic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bahan Bakar
                    </label>
                    <select
                      name="fuel"
                      value={formData.fuel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="bensin">Bensin</option>
                      <option value="diesel">Diesel</option>
                      <option value="listrik">Listrik</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi Kendaraan
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Deskripsikan kondisi, fitur, dan keunggulan kendaraan Anda secara detail..."
                  />
                </div>
              </div>

              {/* Harga dan Ketersediaan */}
              <div className="space-y-6 border-t pt-8">
                <h2 className="text-xl font-semibold text-gray-800">
                  Harga dan Ketersediaan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_for_rent"
                        checked={formData.is_for_rent}
                        onChange={handleChange}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label className="ml-3 text-sm font-medium text-gray-700">
                        Tersedia untuk disewa
                      </label>
                    </div>
                    {formData.is_for_rent && (
                      <div className="ml-7">
                        <input
                          type="number"
                          name="rental_price_daily"
                          value={formData.rental_price_daily}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Harga sewa per hari (Rp)"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_for_sale"
                        checked={formData.is_for_sale}
                        onChange={handleChange}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label className="ml-3 text-sm font-medium text-gray-700">
                        Tersedia untuk dijual
                      </label>
                    </div>
                    {formData.is_for_sale && (
                      <div className="ml-7">
                        <input
                          type="number"
                          name="sale_price"
                          value={formData.sale_price}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Harga jual (Rp)"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Fitur */}
              <div className="space-y-6 border-t pt-8">
                <h2 className="text-xl font-semibold text-gray-800">
                  Fitur Kendaraan
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {availableFeatures.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(formData.features || []).includes(feature)}
                        onChange={(e) =>
                          handleFeatureChange(feature, e.target.checked)
                        }
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label className="ml-3 text-sm text-gray-700">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Gambar */}
              <div className="space-y-6 border-t pt-8">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-teal-600" />
                  Foto Kendaraan
                </h2>
                <div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Upload beberapa foto kendaraan (maksimal 5 foto, format
                    JPG/PNG)
                  </p>
                </div>
                {formData.images && formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200"
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gray-50 px-8 py-6 border-t">
              <div className="flex justify-end gap-4">
                <Link
                  href="/dashboard/vendor/listings"
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isLoading ? "Menyimpan..." : "Simpan & Terbitkan Listing"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
