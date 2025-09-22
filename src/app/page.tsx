"use client";

import { useEffect, useState } from "react";
import { getVehicles } from "@/lib/api";
import { Vehicle } from "@/types/vehicle";
import VehicleCard from "@/components/features/VehicleCard";

export default function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // Tampilan saat error
  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  // Tampilan utama
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Pilihan Kendaraan
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Jelajahi semua kendaraan yang tersedia untuk disewa atau dibeli.
      </p>

      {vehicles.length === 0 ? (
        <p>Tidak ada kendaraan yang tersedia saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
