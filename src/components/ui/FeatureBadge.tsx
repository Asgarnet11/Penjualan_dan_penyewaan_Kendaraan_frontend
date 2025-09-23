interface FeatureBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  gradient: string;
}

export default function FeatureBadge({
  icon: Icon,
  text,
  gradient,
}: FeatureBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${gradient} backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300`}
    >
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </div>
  );
}
