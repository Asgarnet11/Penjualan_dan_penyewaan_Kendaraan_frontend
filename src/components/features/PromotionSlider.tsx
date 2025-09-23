"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Vehicle } from "@/types/vehicle";
import { getVehicles } from "@/lib/api";
import VehicleCard from "./VehicleCard";

export default function PromotionSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ambil beberapa kendaraan untuk ditampilkan di slider
    const fetchFeaturedVehicles = async () => {
      try {
        const response = await getVehicles();
        // Kita ambil 6 unit pertama sebagai unggulan
        setVehicles(response.data.slice(0, 6));
      } catch (error) {
        console.error("Gagal memuat kendaraan unggulan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturedVehicles();
  }, []);

  if (isLoading) {
    return <div className="text-center p-10">Memuat unit pilihan...</div>;
  }

  if (vehicles.length === 0) {
    return null; // Jangan tampilkan apa-apa jika tidak ada data
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Unit Pilihan Minggu Ini
          </h2>
          <p className="text-gray-500 mt-2">
            Temukan penawaran terbaik untuk kendaraan paling populer.
          </p>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {vehicles.map((vehicle) => (
              // Atur lebar slide di sini. 3 slide di layar besar, 1 di mobile.
              <div
                key={vehicle.id}
                className="embla__slide p-4 md:basis-1/2 lg:basis-1/3"
              >
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        </div>

        {/* Indikator Titik (Dots) */}
        <div className="flex justify-center mt-6 space-x-2">
          {emblaApi &&
            [...Array(emblaApi.scrollSnapList().length)].map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi.scrollTo(index)}
                className={`w-3 h-3 rounded-full ${
                  index === (emblaApi.selectedScrollSnap() ?? 0)
                    ? "bg-teal-500"
                    : "bg-gray-300"
                }`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
