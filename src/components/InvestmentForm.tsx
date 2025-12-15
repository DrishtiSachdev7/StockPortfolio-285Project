import { useState } from "react";
import { DollarSign, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StrategyCard from "./StrategyCard";
import { toast } from "@/hooks/use-toast";

interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: "ethical" | "growth" | "index" | "quality" | "value";
}

const strategies: Strategy[] = [
  {
    id: "ethical",
    name: "Ethical Investing",
    description: "Invest in companies with strong ESG practices. Focus on sustainability and social responsibility.",
    icon: "ethical",
  },
  {
    id: "growth",
    name: "Growth Investing",
    description: "Target high-growth companies with potential for significant capital appreciation.",
    icon: "growth",
  },
  {
    id: "index",
    name: "Index Investing",
    description: "Track market indexes for diversified, low-cost exposure to broad markets.",
    icon: "index",
  },
  {
    id: "quality",
    name: "Quality Investing",
    description: "Focus on companies with strong fundamentals, stable earnings, and competitive advantages.",
    icon: "quality",
  },
  {
    id: "value",
    name: "Value Investing",
    description: "Find undervalued stocks trading below their intrinsic value for long-term gains.",
    icon: "value",
  },
];

interface InvestmentFormProps {
  onSubmit: (
    amount: number,
    selectedStrategies: string[],
    splitStrategiesEqually: boolean,
    splitStocksEqually: boolean
  ) => void;
  isLoading?: boolean;
}

const InvestmentForm = ({ onSubmit, isLoading = false }: InvestmentFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [splitStrategiesEqually, setSplitStrategiesEqually] = useState<boolean>(true);
  const [splitStocksEqually, setSplitStocksEqually] = useState<boolean>(true);

  const handleStrategyToggle = (id: string) => {
    setSelectedStrategies((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      }
      if (prev.length >= 2) {
        toast({
          title: "Strategy Limit Reached",
          description: "You can select a maximum of 2 strategies.",
          variant: "destructive",
        });
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount < 5000) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a minimum investment of $5,000.",
        variant: "destructive",
      });
      return;
    }

    if (selectedStrategies.length === 0) {
      toast({
        title: "No Strategy Selected",
        description: "Please select at least one investment strategy.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(numAmount, selectedStrategies, splitStrategiesEqually, splitStocksEqually);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Investment Amount */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Investment Amount
          </h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Enter the amount you wish to invest. Minimum $5,000 USD.
        </p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-lg">
            $
          </span>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10,000"
            className="pl-8 h-14 text-xl font-mono bg-secondary border-border focus:border-primary focus:ring-primary/20"
            min={5000}
          />
        </div>
      </div>

      {/* Strategy Selection */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Investment Strategies
          </h2>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          Select 1 or 2 strategies to diversify your portfolio.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              id={strategy.id}
              name={strategy.name}
              description={strategy.description}
              icon={strategy.icon}
              selected={selectedStrategies.includes(strategy.id)}
              onToggle={handleStrategyToggle}
              disabled={
                selectedStrategies.length >= 2 &&
                !selectedStrategies.includes(strategy.id)
              }
            />
          ))}
        </div>
      </div>

      {/* Split investment among strategies */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Split Investment Among Strategies?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSplitStrategiesEqually(true)}
            className={`w-full p-4 rounded-xl border transition-all ${
              splitStrategiesEqually
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border text-foreground hover:border-primary/50"
            }`}
          >
            Split Equally
          </button>
          <button
            type="button"
            onClick={() => setSplitStrategiesEqually(false)}
            className={`w-full p-4 rounded-xl border transition-all ${
              !splitStrategiesEqually
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border text-foreground hover:border-primary/50"
            }`}
          >
            Split Randomly
          </button>
        </div>
      </div>

      {/* Stock allocation method */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Stock Allocation Method
          </h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          How should we allocate stocks within each strategy?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSplitStocksEqually(true)}
            className={`w-full p-4 rounded-xl border transition-all ${
              splitStocksEqually
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border text-foreground hover:border-primary/50"
            }`}
          >
            Predefined Ratio
          </button>
          <button
            type="button"
            onClick={() => setSplitStocksEqually(false)}
            className={`w-full p-4 rounded-xl border transition-all ${
              !splitStocksEqually
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border text-foreground hover:border-primary/50"
            }`}
          >
            Random Allocation
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || selectedStrategies.length === 0 || !amount}
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Generating Portfolio...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Generate Portfolio
            <ArrowRight className="w-5 h-5" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default InvestmentForm;
