import { useState } from "react";
import { TrendingUp, BarChart2 } from "lucide-react";
import StockTicker from "@/components/StockTicker";
import InvestmentForm from "@/components/InvestmentForm";
import PortfolioResults from "@/components/PortfolioResults";
import MarketOverview from "@/components/MarketOverview";
import { fetchPortfolio, generateMockPortfolio } from "@/lib/portfolioData";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<{
    amount: number;
    stocks: any[];
    weeklyTrend: any[];
    totalValue: number;
    totalChange: number;
    strategies: string[];
  } | null>(null);

  const handleSubmit = async (
    amount: number,
    strategies: string[],
    splitStrategiesEqually: boolean,
    splitStocksEqually: boolean
  ) => {
    setIsLoading(true);

    try {
      const result = await fetchPortfolio(amount, strategies, {
        splitStrategiesEqually,
        splitStocksEqually,
      });
      setPortfolio({
        amount,
        ...result,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Using sample data",
        description: "Live backend is unavailable. Showing simulated portfolio instead.",
      });
      const fallback = generateMockPortfolio(amount, strategies, {
        splitStrategiesEqually,
        splitStocksEqually,
      });
      setPortfolio({
        amount,
        ...fallback,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPortfolio(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-center gap-3 mb-4 fade-in-up">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <BarChart2 className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-4 fade-in-up">
            Stock Portfolio
            <span className="block gradient-text">Suggestion Engine</span>
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto fade-in-up">
            Build a personalized investment portfolio based on your preferred strategies.
            Get real-time stock recommendations and track your portfolio performance.
          </p>
        </div>
      </header>

      {/* Stock Ticker */}
      <StockTicker />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {portfolio ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Your Portfolio
              </h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                Create New Portfolio
              </button>
            </div>
            <PortfolioResults
              amount={portfolio.amount}
              strategies={portfolio.strategies}
              stocks={portfolio.stocks}
              weeklyTrend={portfolio.weeklyTrend}
              totalValue={portfolio.totalValue}
              totalChange={portfolio.totalChange}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Investment Form - Takes 2 columns */}
            <div className="xl:col-span-2">
              <InvestmentForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
            
            {/* Market Overview - Takes 1 column */}
            <div className="xl:col-span-1">
              <MarketOverview />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                Portfolio Engine
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Data is simulated for demonstration purposes. Not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
