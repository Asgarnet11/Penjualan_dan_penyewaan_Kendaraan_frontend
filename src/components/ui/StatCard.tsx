interface StatCardProps {
  number: string;
  label: string;
  color: string;
}

export default function StatCard({ number, label, color }: StatCardProps) {
  return (
    <div className="text-center group">
      <div
        className={`text-3xl sm:text-4xl lg:text-5xl font-black ${color} mb-2 group-hover:scale-110 transition-transform duration-300`}
      >
        {number}
      </div>
      <div className="text-sm sm:text-base text-slate-600 font-medium">
        {label}
      </div>
    </div>
  );
}
