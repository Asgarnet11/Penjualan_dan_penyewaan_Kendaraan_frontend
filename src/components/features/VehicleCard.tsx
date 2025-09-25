import Link from "next/link";
import Image from "next/image"; // Import Next/Image
import { Vehicle } from "@/types/vehicle";
import { Car, IndianRupee, Calendar } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Ambil gambar utama atau gambar pertama, atau gunakan placeholder
  const primaryImage =
    vehicle.images?.find((img) => img.is_primary) || vehicle.images?.[0];
  const imageUrl = primaryImage?.image_url;

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col">
        {/* Gambar Kendaraan */}
        <div className="w-full h-48 bg-gray-200 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill // Mengisi div parent
              style={{ objectFit: "cover" }} // Setara dengan object-cover
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm text-gray-500">
            {vehicle.year} • {vehicle.transmission}
          </p>
          <h3 className="mt-1 text-lg font-bold text-gray-900 truncate">
            {vehicle.brand} {vehicle.model}
          </h3>

          <div className="mt-4 flex-grow">
            {vehicle.is_for_rent && (
              <div className="flex items-center text-teal-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-semibold">
                  {formatRupiah(vehicle.rental_price_daily)}
                </span>
                <span className="text-sm text-gray-500 ml-1">/ hari</span>
              </div>
            )}
            {vehicle.is_for_sale && (
              <div className="flex items-center text-blue-600 mt-1">
                <IndianRupee className="w-4 h-4 mr-2" />
                <span className="font-semibold">
                  {formatRupiah(vehicle.sale_price)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
