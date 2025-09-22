"use client";

import Link from "next/link";
import { Vehicle } from "@/types/vehicle";
import {
  Car,
  Bike,
  IndianRupee,
  Calendar,
  MapPin,
  Fuel,
  Users,
} from "lucide-react";
import Image from "next/image";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  // Format harga agar lebih mudah dibaca
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Ambil gambar utama atau gunakan placeholder
  const primaryImage =
    vehicle.images?.find((img) => img.isPrimary) || vehicle.images?.[0];

  // Icon berdasarkan tipe kendaraan
  const VehicleIcon = vehicle.type === "motor" ? Bike : Car;

  // Badge untuk tipe harga
  const getPriceTypeBadge = () => {
    if (vehicle.priceType === "sewa") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
          Sewa
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Jual
        </span>
      );
    }
  };

  // Status ketersediaan
  const getAvailabilityBadge = () => {
    if (!vehicle.isAvailable) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Tidak Tersedia
        </span>
      );
    }
    return null;
  };

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
        {/* Header dengan badges */}
        <div className="relative">
          {/* Gambar atau Placeholder */}
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
            {primaryImage ? (
              <Image
                src={primaryImage.imageUrl}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <VehicleIcon className="w-16 h-16 text-gray-400" />
            )}

            {/* Overlay dengan gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Badges di pojok kanan atas */}
            <div className="absolute top-3 right-3 flex flex-col gap-1">
              {getPriceTypeBadge()}
              {getAvailabilityBadge()}
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Info dasar */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {vehicle.year}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {vehicle.transmission}
            </p>
          </div>

          {/* Nama kendaraan */}
          <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
            {vehicle.brand} {vehicle.model}
          </h3>

          {/* Nama kendaraan full jika berbeda */}
          {vehicle.name !== `${vehicle.brand} ${vehicle.model}` && (
            <p className="text-sm text-gray-600 truncate mb-2">
              {vehicle.name}
            </p>
          )}

          {/* Info tambahan */}
          <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
            {vehicle.fuelType && (
              <div className="flex items-center">
                <Fuel className="w-3 h-3 mr-1" />
                <span className="capitalize">{vehicle.fuelType}</span>
              </div>
            )}

            {vehicle.seatingCapacity && (
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                <span>{vehicle.seatingCapacity} kursi</span>
              </div>
            )}

            {vehicle.location && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate max-w-20">{vehicle.location}</span>
              </div>
            )}
          </div>

          {/* Harga */}
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div>
                {vehicle.priceType === "sewa" ? (
                  <div className="flex items-center text-teal-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <div>
                      <span className="font-semibold text-base">
                        {formatRupiah(vehicle.price)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/ hari</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-blue-600">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    <span className="font-semibold text-base">
                      {formatRupiah(vehicle.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Vendor info */}
              {vehicle.vendor && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">oleh</p>
                  <p className="text-xs font-medium text-gray-700 truncate max-w-24">
                    {vehicle.vendor.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status tidak tersedia overlay */}
          {!vehicle.isAvailable && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-lg">
              <div className="bg-white px-4 py-2 rounded-lg">
                <p className="text-gray-900 font-medium">Tidak Tersedia</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
