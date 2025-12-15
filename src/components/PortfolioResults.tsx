import { TrendingUp, TrendingDown, PieChart, Wallet } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import StockCard from "./StockCard";

interface Stock {
  symbol: string;
  name: string;
  allocation: number;
  price: number;
  shares: number;
  value: number;
  change: number;
  weeklyTrend?: { day: string; price: number }[];
  strategy?: string;
}

interface PortfolioResultsProps {
  amount: number;
  strategies: string[];
  stocks: Stock[];
  weeklyTrend: { day: string; value: number }[];
  totalValue: number;
  totalChange: number;
}

const PortfolioResults = ({
  amount,
  strategies,
  stocks,
  weeklyTrend,
  totalValue,
  totalChange,
}: PortfolioResultsProps) => {
  const stocksWithTrends = stocks.map((stock) => ({
    ...stock,
    weeklyTrend: stock.weeklyTrend?.length ? stock.weeklyTrend : generateStockTrend(stock.price),
  }));

  const stocksPerStrategy =
    strategies.length > 0 ? Math.ceil(stocksWithTrends.length / strategies.length) : 0;

  const strategyValues = strategies.map((strategy, index) => {
    const byName = stocksWithTrends.filter((stock) => stock.strategy === strategy);
    const fallbackStart = index * Math.max(stocksPerStrategy, 3);
    const fallbackEnd = (index + 1) * Math.max(stocksPerStrategy, 3);
    const collection = byName.length
      ? byName
      : stocksWithTrends.slice(fallbackStart, fallbackEnd);

    return collection.reduce((sum, stock) => sum + (stock.value ?? 0), 0);
  });

  return (
    <div className="space-y-8 fade-in-up">
      {/* Total Portfolio Value Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/80 to-accent p-6 glow-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
        <div className="relative flex items-center justify-center gap-3">
          <Wallet className="w-8 h-8 text-primary-foreground" />
          <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
            Total Portfolio Value: ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Strategy Sections */}
      {strategies.map((strategy, strategyIndex) => {
        const byName = stocksWithTrends.filter((stock) => stock.strategy === strategy);
        const fallbackStart = strategyIndex * Math.max(stocksPerStrategy, 3);
        const fallbackEnd = (strategyIndex + 1) * Math.max(stocksPerStrategy, 3);
        const strategyStocks = byName.length
          ? byName
          : stocksWithTrends.slice(fallbackStart, fallbackEnd);
        const strategyValue =
          strategyValues[strategyIndex] || amount / Math.max(strategies.length, 1);

        if (strategyStocks.length === 0) return null;

        return (
          <div key={strategy} className="space-y-6">
            {/* Strategy Header */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center justify-center gap-3">
                <span className="text-3xl">🎯</span>
                {strategy}
              </h2>
              <div className="inline-block px-8 py-3 rounded-full bg-secondary border border-border">
                <span className="text-lg font-semibold text-foreground">
                  Strategy Value: ${strategyValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Stock Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {strategyStocks.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  symbol={stock.symbol}
                  name={stock.name}
                  price={stock.price}
                  shares={stock.shares}
                  allocation={stock.allocation}
                  value={stock.value}
                  weeklyTrend={stock.weeklyTrend}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Portfolio Summary */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Portfolio Summary</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Initial Investment</p>
            <p className="text-2xl font-bold font-mono text-foreground">
              ${amount.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Current Value</p>
            <p className="text-2xl font-bold font-mono text-foreground">
              ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Weekly Change</p>
            <p
              className={`text-2xl font-bold font-mono flex items-center gap-2 ${
                totalChange >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              {totalChange >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              {totalChange >= 0 ? "+" : ""}
              {totalChange.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyTrend}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                stroke="hsl(215, 20%, 55%)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(215, 20%, 55%)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 8%)",
                  border: "1px solid hsl(222, 30%, 16%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 98%)",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                  "Portfolio Value",
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(160, 84%, 39%)"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate stock trend data
function generateStockTrend(basePrice: number): { day: string; price: number }[] {
  const days = ["Dec 8\n2025", "Dec 9", "Dec 10", "Dec 11", "Dec 12"];
  let price = basePrice * 0.98;
  
  return days.map((day) => {
    price += (Math.random() - 0.4) * basePrice * 0.02;
    return { day, price: Math.max(price, basePrice * 0.95) };
  });
}

export default PortfolioResults;
