import { Car } from "lucide-react";
import { Vehicle } from "@/types/vehicle";

interface VehicleImageGalleryProps {
  vehicle: Vehicle;
}

export default function VehicleImageGallery({
  vehicle,
}: VehicleImageGalleryProps) {
  return (
    <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
      <div className="text-center">
        <Car className="w-20 h-20 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Gambar akan segera tersedia</p>
      </div>
    </div>
  );
}
