export default function HeroBackground() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
        style={{ backgroundImage: "url('/assets/hero-background.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/80 to-emerald-900/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-spin-slow" />
      </div>
    </>
  );
}
