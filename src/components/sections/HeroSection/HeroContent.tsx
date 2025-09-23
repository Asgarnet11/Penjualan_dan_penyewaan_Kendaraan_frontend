import { useMemo } from "react";
import { MapPin, Car, Shield } from "lucide-react";
import FeatureBadge from "../../ui/FeatureBadge";
import SearchInput from "../../ui/SearchInput";

interface HeroContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export default function HeroContent({
  searchQuery,
  setSearchQuery,
  onSearch,
}: HeroContentProps) {
  const features = useMemo(
    () => [
      {
        icon: MapPin,
        text: "Sulawesi Tenggara",
        gradient: "from-blue-500/80 to-blue-600/80",
      },
      {
        icon: Car,
        text: "1000+ Kendaraan",
        gradient: "from-emerald-500/80 to-emerald-600/80",
      },
      {
        icon: Shield,
        text: "Terpercaya",
        gradient: "from-purple-500/80 to-purple-600/80",
      },
    ],
    []
  );

  return (
    <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Feature Badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up">
        {features.map((feature, index) => (
          <FeatureBadge
            key={index}
            icon={feature.icon}
            text={feature.text}
            gradient={feature.gradient}
          />
        ))}
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
        <span className="block bg-gradient-to-r from-white via-white to-emerald-100 bg-clip-text text-transparent">
          Kendaraan Terbaik
        </span>
        <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mt-2">
          Untuk Perjalanan Anda
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-slate-200 leading-relaxed font-light">
        Jelajahi keindahan Sultra dengan koleksi mobil dan motor premium.
        <span className="text-emerald-300 font-medium">
          {" "}
          Sewa mudah, beli praktis.
        </span>
      </p>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={onSearch}
        />
      </div>

      {/* Popular Searches */}
      <div className="mt-6 text-sm text-slate-300">
        <span className="opacity-75">Populer: </span>
        {["Avanza", "NMAX", "Innova", "PCX"].map((term, index) => (
          <button
            key={term}
            onClick={() => setSearchQuery(term)}
            className="mx-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20 hover:border-white/40"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
