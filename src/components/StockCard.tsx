import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ExternalLink } from "lucide-react";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  shares: number;
  allocation: number;
  value: number;
  weeklyTrend: { day: string; price: number }[];
}

const StockCard = ({
  symbol,
  name,
  price,
  shares,
  allocation,
  value,
  weeklyTrend,
}: StockCardProps) => {
  const priceChange = weeklyTrend.length > 1 
    ? weeklyTrend[weeklyTrend.length - 1].price - weeklyTrend[0].price 
    : 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="glass-card overflow-hidden fade-in-up">
      {/* Header */}
      <div className="p-6 text-center border-b border-border/30">
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://finance.yahoo.com/quote/${symbol}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors mb-4 group"
              >
                {symbol}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>View {symbol} on Yahoo Finance</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Current Price</p>
            <p className="font-mono font-semibold text-foreground">${price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Shares Allocated</p>
            <p className="font-mono font-semibold text-foreground">{shares.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Allocation</p>
            <p className="font-mono font-semibold text-foreground">{allocation}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Invested Amount</p>
            <p className="font-mono font-semibold text-foreground">
              ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 bg-card/30">
        <h4 className="text-sm font-medium text-muted-foreground mb-4">
          Weekly Trend for {symbol}
        </h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyTrend}>
              <XAxis
                dataKey="day"
                stroke="hsl(215, 20%, 55%)"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "hsl(222, 30%, 16%)" }}
              />
              <YAxis
                stroke="hsl(215, 20%, 55%)"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "hsl(222, 30%, 16%)" }}
                domain={["dataMin - 1", "dataMax + 1"]}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                label={{
                  value: "Price (USD)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 10, fill: "hsl(215, 20%, 55%)" },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 8%)",
                  border: "1px solid hsl(222, 30%, 16%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 98%)",
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "hsl(160, 84%, 39%)" : "hsl(0, 72%, 51%)"}
                strokeWidth={2}
                dot={{ fill: isPositive ? "hsl(160, 84%, 39%)" : "hsl(0, 72%, 51%)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">Date</p>
      </div>
    </div>
  );
};

export default StockCard;
