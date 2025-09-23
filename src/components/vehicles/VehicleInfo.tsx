import { Vehicle } from "@/types/vehicle";
import { Info } from "lucide-react";

interface VehicleInfoProps {
  vehicle: Vehicle;
}

export default function VehicleInfo({ vehicle }: VehicleInfoProps) {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2">
          {vehicle.brand} {vehicle.model}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-lg text-gray-600">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            Tahun {vehicle.year}
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {vehicle.color}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
          <Info className="w-5 h-5 mr-3 text-teal-600" />
          Deskripsi Kendaraan
        </h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {vehicle.description ||
              "Deskripsi tidak tersedia untuk kendaraan ini."}
          </p>
        </div>
      </div>
    </div>
  );
}
