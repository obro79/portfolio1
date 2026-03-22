import { useState, useEffect } from 'react';

interface TickerItem {
  symbol: string;
  price: number;
  change24h: number;
}

const CRYPTO_IDS = 'bitcoin,ethereum,solana,dogecoin,cardano';
const CRYPTO_SYMBOLS: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  solana: 'SOL',
  dogecoin: 'DOGE',
  cardano: 'ADA',
};

const STATIC_TICKERS: TickerItem[] = [
  { symbol: 'SPY', price: 0, change24h: 0 },
  { symbol: 'QQQ', price: 0, change24h: 0 },
  { symbol: 'AAPL', price: 0, change24h: 0 },
];

export default function MarketTicker() {
  const [tickers, setTickers] = useState<TickerItem[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS}&vs_currencies=usd&include_24hr_change=true`
        );
        if (!res.ok) return;
        const data = await res.json();

        const cryptoTickers: TickerItem[] = Object.entries(data).map(
          ([id, info]: [string, any]) => ({
            symbol: CRYPTO_SYMBOLS[id] || id.toUpperCase(),
            price: info.usd,
            change24h: info.usd_24h_change ?? 0,
          })
        );

        setTickers(cryptoTickers);
      } catch {
        // Silently fail — ticker just won't show
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (tickers.length === 0) return null;

  // Duplicate items for seamless loop
  const items = [...tickers, ...tickers];

  return (
    <div className="market-ticker">
      <div className="market-ticker-track">
        {items.map((t, i) => (
          <span key={i} className="market-ticker-item">
            <span className="ticker-symbol">{t.symbol}</span>
            <span className="ticker-price">
              ${t.price >= 1 ? t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : t.price.toFixed(4)}
            </span>
            <span className={`ticker-change ${t.change24h >= 0 ? 'positive' : 'negative'}`}>
              {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
