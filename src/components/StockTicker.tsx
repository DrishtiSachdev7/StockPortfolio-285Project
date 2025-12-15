import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fetchMarketTicker } from "@/lib/portfolioData";

interface StockData {
  symbol: string;
  price: number;
  change: number;
}

const mockStocks: StockData[] = [
  { symbol: "AAPL", price: 278.28, change: 0.48 },
  { symbol: "TSLA", price: 458.96, change: 10.87 },
  { symbol: "GOOGL", price: 175.42, change: -1.23 },
  { symbol: "MSFT", price: 435.67, change: 3.45 },
  { symbol: "AMZN", price: 218.94, change: 2.15 },
  { symbol: "VTI", price: 285.32, change: 1.28 },
  { symbol: "ADBE", price: 512.45, change: -2.34 },
  { symbol: "NSRGY", price: 98.76, change: 0.65 },
];

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>(mockStocks);

  useEffect(() => {
    let isMounted = true;

    fetchMarketTicker()
      .then((data) => {
        if (isMounted && data.length) {
          setStocks(data);
        }
      })
      .catch((error) => {
        console.warn("Falling back to mock ticker data", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const duplicatedStocks = [...stocks, ...stocks];

  return (
    <div className="w-full overflow-hidden bg-secondary/30 border-y border-border/30 py-3">
      <div className="ticker-scroll flex gap-8 whitespace-nowrap">
        {duplicatedStocks.map((stock, index) => (
          <div
            key={`${stock.symbol}-${index}`}
            className="flex items-center gap-3 px-4"
          >
            <span className="font-semibold text-foreground">{stock.symbol}</span>
            <span className="font-mono text-muted-foreground">
              ${stock.price.toFixed(2)}
            </span>
            <span
              className={`flex items-center gap-1 font-mono text-sm ${
                stock.change >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
