"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVehicle, uploadVehicleImage } from "@/lib/api";
import toast from "react-hot-toast";
import { CreateVehiclePayload } from "@/types/vehicle";
import { ArrowLeft, Save, Car, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Gunakan Next/Image untuk best practice

export default function NewListingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk form data
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
  });

  // State terpisah untuk file gambar asli dan URL preview
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // ... (Logika handleChange Anda sudah benar)
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    // ... (Logika handleFeatureChange Anda sudah benar)
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImageFiles(selectedFiles);

      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previewUrls);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.plate_number) {
      toast.error("Merek, Model, dan Plat Nomor wajib diisi.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Membuat listing kendaraan...");

    try {
      // TAHAP 1: Kirim data teks untuk membuat listing
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
        is_for_rent: !!formData.is_for_rent,
        rental_price_daily: Number(formData.rental_price_daily),
        is_for_sale: !!formData.is_for_sale,
        sale_price: Number(formData.sale_price),
        location: formData.location || "",
        features: formData.features || [],
      };

      const response = await createVehicle(payload);
      const newVehicleId = response.data.id;

      toast.success("Detail kendaraan berhasil disimpan!", { id: toastId });

      // TAHAP 2: Upload gambar jika ada
      if (imageFiles.length > 0) {
        toast.loading("Mengupload gambar...", { id: toastId });
        const uploadPromises = imageFiles.map((file) =>
          uploadVehicleImage(newVehicleId, file)
        );
        await Promise.all(uploadPromises);
        toast.success("Semua gambar berhasil diupload!", { id: toastId });
      }

      router.push("/dashboard/vendor/listings");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan yang tidak diketahui";
      toast.error(message, { id: toastId });
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
    // ... (Seluruh JSX Anda di sini. Desainnya sudah bagus, tidak perlu diubah.)
    // Ganti tag <img> di preview gambar menjadi <Image> dari Next.js
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tambah Kendaraan Baru</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-8"
        >
          {/* ... Isi form Anda yang sudah ada ... */}

          {/* Contoh penggantian <img> menjadi <Image> */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-100 rounded-xl overflow-hidden border"
                >
                  <Image
                    src={image}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={120}
                    className="w-full h-full object-cover"
                    onLoad={() => URL.revokeObjectURL(image)} // Penting untuk memori
                  />
                </div>
              ))}
            </div>
          )}

          <div className="text-right border-t pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 ..."
            >
              {isLoading ? "Menyimpan..." : "Simpan & Terbitkan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
