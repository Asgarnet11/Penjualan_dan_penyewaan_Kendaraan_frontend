// components/sections/HowItWorksSection.tsx
import { useMemo } from "react";
import { Search, Calendar, Car } from "lucide-react";
import StepCard from "../ui/StepCard";

export default function HowItWorksSection() {
  const steps = useMemo(
    () => [
      {
        title: "Pilih Kendaraan",
        description:
          "Temukan kendaraan yang sesuai dengan kebutuhan Anda dari koleksi lengkap kami",
        icon: Search,
      },
      {
        title: "Pesan & Bayar",
        description:
          "Lakukan pemesanan dengan mudah dan pilih metode pembayaran yang sesuai",
        icon: Calendar,
      },
      {
        title: "Nikmati Perjalanan",
        description:
          "Ambil kendaraan dan mulai jelajahi keindahan Sulawesi Tenggara",
        icon: Car,
      },
    ],
    []
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Cara
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Kerjanya
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
