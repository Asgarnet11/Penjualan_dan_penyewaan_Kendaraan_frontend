import { Vehicle } from "@/types/vehicle";
import {
  Settings,
  GitCommitVertical,
  Droplet,
  Car as CarIcon,
  Hash,
} from "lucide-react";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export default function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs = [
    {
      icon: GitCommitVertical,
      label: "Transmisi",
      value: vehicle.transmission,
      color: "text-teal-600",
    },
    {
      icon: Droplet,
      label: "Bahan Bakar",
      value: vehicle.fuel,
      color: "text-blue-600",
    },
    {
      icon: CarIcon,
      label: "Tipe Kendaraan",
      value: vehicle.vehicle_type,
      color: "text-purple-600",
    },
    {
      icon: Hash,
      label: "Nomor Plat",
      value: vehicle.plate_number,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center">
        <Settings className="w-5 h-5 mr-3 text-teal-600" />
        Spesifikasi Teknis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specs.map((spec, index) => {
          const IconComponent = spec.icon;
          return (
            <div
              key={index}
              className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div
                className={`${spec.color} bg-white p-2 rounded-lg mr-4 shadow-sm`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {spec.label}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {spec.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
