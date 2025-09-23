"use client";

import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import { useSearch } from "../hooks/useSearch";

const PromotionSection = () => (
  <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          Promosi
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {" "}
            Spesial
          </span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-slate-200">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6">
            <div className="w-8 h-8 border-2 border-white rounded-full border-t-transparent animate-spin" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Segera Hadir!
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Promosi menarik dan penawaran eksklusif akan segera tersedia untuk
            Anda
          </p>
        </div>
      </div>
    </div>
  </section>
);

const DevelopmentSection = () => (
  <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl mb-8 shadow-xl">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
          Fitur
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {" "}
            Mendatang
          </span>
        </h2>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Kami terus berinovasi untuk memberikan pengalaman terbaik. Nantikan
          fitur-fitur menarik yang akan segera hadir!
        </p>

        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200 shadow-lg">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-slate-700">
            Dalam Pengembangan
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  const { searchQuery, setSearchQuery, handleSearch } = useSearch();

  return (
    <>
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

      <main className="min-h-screen">
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        <StatsSection />

        <PromotionSection />

        <HowItWorksSection />

        <DevelopmentSection />
      </main>
    </>
  );
}
