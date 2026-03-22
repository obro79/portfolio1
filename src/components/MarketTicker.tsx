import { useState, useEffect, useRef } from 'react';

interface CryptoPrice {
  symbol: string;
  price: number;
  prevPrice: number;
  open24h: number;
}

const PRODUCT_IDS = ['BTC-USD', 'ETH-USD', 'SOL-USD'];
const DISPLAY_SYMBOLS: Record<string, string> = {
  'BTC-USD': 'BTC',
  'ETH-USD': 'ETH',
  'SOL-USD': 'SOL',
};

export default function MarketTicker() {
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    function connect() {
      const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        ws.send(JSON.stringify({
          type: 'subscribe',
          product_ids: PRODUCT_IDS,
          channels: ['ticker'],
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type !== 'ticker') return;

        const productId = data.product_id as string;
        const price = parseFloat(data.price);
        const open24h = parseFloat(data.open_24h);

        setPrices((prev) => ({
          ...prev,
          [productId]: {
            symbol: DISPLAY_SYMBOLS[productId] || productId,
            price,
            prevPrice: prev[productId]?.price ?? price,
            open24h,
          },
        }));
      };

      ws.onclose = () => {
        setConnected(false);
        // Reconnect after 3s
        setTimeout(connect, 3000);
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const entries = PRODUCT_IDS.map((id) => prices[id]).filter(Boolean);

  if (entries.length === 0) {
    return (
      <div className="market-section fade-in-section">
        <div className="section-header">
          <p className="section-command">ws connect coinbase</p>
          <h2 className="section-title">Live Markets</h2>
        </div>
        <div className="market-grid">
          <p style={{ color: 'var(--text-dim)', fontSize: '13px' }}>Connecting to Coinbase WebSocket...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="market-section fade-in-section">
      <div className="section-header">
        <p className="section-command">ws connect coinbase</p>
        <h2 className="section-title">Live Markets</h2>
      </div>
      <div className="market-status">
        <span className={`status-dot ${connected ? 'live' : ''}`} />
        <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          {connected ? 'LIVE' : 'RECONNECTING'}
        </span>
      </div>
      <div className="market-grid">
        {entries.map((entry) => {
          const change = entry.open24h ? ((entry.price - entry.open24h) / entry.open24h) * 100 : 0;
          const direction = entry.price > entry.prevPrice ? 'up' : entry.price < entry.prevPrice ? 'down' : '';

          return (
            <div key={entry.symbol} className={`market-card ${direction}`}>
              <div className="market-card-header">
                <span className="market-symbol">{entry.symbol}</span>
                <span className={`market-change ${change >= 0 ? 'positive' : 'negative'}`}>
                  {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                </span>
              </div>
              <div className={`market-price ${direction}`}>
                ${entry.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="market-open">
                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                  24h open: ${entry.open24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
