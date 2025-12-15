import { Check, Leaf, TrendingUp, BarChart3, Award, DollarSign } from "lucide-react";

interface StrategyCardProps {
  id: string;
  name: string;
  description: string;
  icon: "ethical" | "growth" | "index" | "quality" | "value";
  selected: boolean;
  onToggle: (id: string) => void;
  disabled?: boolean;
}

const iconMap = {
  ethical: Leaf,
  growth: TrendingUp,
  index: BarChart3,
  quality: Award,
  value: DollarSign,
};

const colorMap = {
  ethical: "from-emerald-500 to-teal-600",
  growth: "from-blue-500 to-indigo-600",
  index: "from-violet-500 to-purple-600",
  quality: "from-amber-500 to-orange-600",
  value: "from-rose-500 to-pink-600",
};

const StrategyCard = ({
  id,
  name,
  description,
  icon,
  selected,
  onToggle,
  disabled = false,
}: StrategyCardProps) => {
  const Icon = iconMap[icon];

  return (
    <button
      type="button"
      onClick={() => !disabled && onToggle(id)}
      disabled={disabled}
      className={`strategy-card text-left w-full group ${
        selected ? "selected" : ""
      } ${disabled && !selected ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[icon]} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="w-6 h-6 text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/30"
              }`}
            >
              {selected && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default StrategyCard;
