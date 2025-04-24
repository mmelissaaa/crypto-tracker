
import { store } from '../store/store';
import { updatePrices } from '../store/cryptoSlice';

export class WebSocketSimulator {
  private interval: NodeJS.Timeout | null = null;
  private lastPrices: Map<number, number> = new Map();

  constructor() {
    // Initialize last prices
    store.getState().crypto.assets.forEach(asset => {
      this.lastPrices.set(asset.id, asset.price);
    });
  }

  private getRandomChange = (volatility: number = 0.002) => {
    return (Math.random() - 0.5) * 2 * volatility;
  };

  private calculateNewPrice = (currentPrice: number, volatility: number = 0.002) => {
    const change = this.getRandomChange(volatility);
    return currentPrice * (1 + change);
  };

  start() {
    this.interval = setInterval(() => {
      store.getState().crypto.assets.forEach(asset => {
        const lastPrice = this.lastPrices.get(asset.id) || asset.price;
        const newPrice = this.calculateNewPrice(lastPrice, asset.symbol === 'USDT' ? 0.0001 : 0.002);
        const priceChange = ((newPrice - lastPrice) / lastPrice) * 100;

        this.lastPrices.set(asset.id, newPrice);

        store.dispatch(
          updatePrices({
            id: asset.id,
            updates: {
              price: parseFloat(newPrice.toFixed(2)),
              change1h: parseFloat((asset.change1h + priceChange / 2).toFixed(2)),
              change24h: parseFloat((asset.change24h + priceChange / 3).toFixed(2)),
              change7d: parseFloat((asset.change7d + priceChange / 7).toFixed(2)),
              volume24h: asset.volume24h * (1 + this.getRandomChange(0.001)),
            },
          })
        );
      });
    }, 2000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
