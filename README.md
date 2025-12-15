# Smart Portfolio Builder

A web application that helps users build personalized stock portfolios based on investment strategies. Get real-time stock data, visualize weekly trends, and export portfolio reports.


## Features

- 📊 **5 Investment Strategies**: Ethical, Growth, Index, Quality, and Value Investing
- 📈 **Real-time Stock Data**: Live prices from Yahoo Finance
- 📉 **Weekly Trend Charts**: Visualize stock performance over the past 5 trading days
- 💰 **Portfolio Allocation**: Automatic allocation based on your investment amount
- 📄 **PDF Export**: Download personalized portfolio reports
- 📧 **Email Sharing**: Share investment insights via email
- 🔗 **Yahoo Finance Links**: Click stock symbols to view detailed info

## Tech Stack

### Frontend
- **Vite** - Fast build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Recharts** - Charts and visualizations

### Backend
- **Flask** - Python web framework
- **yfinance** - Yahoo Finance API wrapper
- **Plotly** - Graph generation
- **Flask-CORS** - Cross-origin support

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Python** (v3.9+) - [Download Python](https://www.python.org/downloads/)

### Setup Instructions

You need **2 terminals** to run this project - one for the backend and one for the frontend.

---

### Terminal 1: Backend (Flask API)

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
# .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python app.py
```

✅ Backend will be running at: **http://localhost:5001**

---

### Terminal 2: Frontend (React App)

```bash
# From the project root directory
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend will be running at: **http://localhost:8080** (or the port shown in terminal)


---

## 📁 Project Structure

```
StockPortfolio-285Project/
├── backend/
│   ├── app.py              # Flask API server
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend documentation
├── src/
│   ├── components/         # React components
│   │   ├── InvestmentForm.tsx
│   │   ├── PortfolioResults.tsx
│   │   ├── StockCard.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── lib/
│   │   ├── portfolioData.ts    # API integration
│   │   └── portfolioExport.ts  # PDF/Email export
│   ├── pages/
│   │   └── Index.tsx       # Main page
│   └── App.tsx             # App entry point
├── package.json            # Node.js dependencies
└── README.md               # This file
```

---

## 🎯 Investment Strategies

| Strategy | Stocks | Description |
|----------|--------|-------------|
| **Ethical Investing** | AAPL, ADBE, NSRGY | Companies with strong ESG practices |
| **Growth Investing** | AMZN, TSLA, GOOGL | High-growth potential companies |
| **Index Investing** | VTI, IXUS, ILTB | Diversified ETFs |
| **Quality Investing** | MSFT, JNJ, PG | Blue-chip stable companies |
| **Value Investing** | BRK-B, KO, XOM | Undervalued companies |

---

## 📝 License

This project is for educational purposes (CMPE 285 Project).

---

## 👥 Contributors

- Built with ❤️ for CMPE 285
