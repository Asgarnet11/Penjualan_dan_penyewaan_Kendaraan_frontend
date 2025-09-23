import { useMemo } from "react";
import StatCard from "../ui/StatCard";

export default function StatsSection() {
  const stats = useMemo(
    () => [
      {
        number: "1000+",
        label: "Kendaraan Tersedia",
        color: "text-emerald-600",
      },
      { number: "50+", label: "Mitra Terpercaya", color: "text-blue-600" },
      { number: "24/7", label: "Layanan Support", color: "text-purple-600" },
      { number: "99%", label: "Kepuasan Pelanggan", color: "text-orange-600" },
    ],
    []
  );

  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
