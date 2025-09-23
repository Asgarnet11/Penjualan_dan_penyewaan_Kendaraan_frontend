interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
}

export default function StepCard({
  number,
  title,
  description,
  icon: Icon,
  isLast = false,
}: StepCardProps) {
  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-bold text-lg shadow-lg">
            {number}
          </div>
        </div>
        <div className="ml-6">
          <div className="flex items-center mb-3">
            <Icon className="w-6 h-6 text-emerald-600 mr-3" />
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-emerald-300 to-teal-300 rounded-full" />
      )}
    </div>
  );
}
