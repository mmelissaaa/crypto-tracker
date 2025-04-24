
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CryptoAsset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  logo: string;
}

interface CryptoState {
  assets: CryptoAsset[];
}

const initialState: CryptoState = {
  assets: [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      logo: "/lovable-uploads/606c24de-873a-4321-9f6c-b5a502c2f06c.png"
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 4532.12,
      change1h: 0.21,
      change24h: 1.54,
      change7d: 8.32,
      marketCap: 545234123789,
      volume24h: 12345678901,
      circulatingSupply: 120.43,
      maxSupply: null,
      logo: "/lovable-uploads/606c24de-873a-4321-9f6c-b5a502c2f06c.png"
    },
    {
      id: 3,
      name: "Tether",
      symbol: "USDT",
      price: 1.00,
      change1h: 0.01,
      change24h: 0.02,
      change7d: 0.01,
      marketCap: 83456789012,
      volume24h: 45678901234,
      circulatingSupply: 83456789012,
      maxSupply: null,
      logo: "/lovable-uploads/606c24de-873a-4321-9f6c-b5a502c2f06c.png"
    },
    {
      id: 4,
      name: "BNB",
      symbol: "BNB",
      price: 567.89,
      change1h: -0.32,
      change24h: -1.21,
      change7d: 5.67,
      marketCap: 87654321098,
      volume24h: 3456789012,
      circulatingSupply: 154.32,
      maxSupply: 200,
      logo: "/lovable-uploads/606c24de-873a-4321-9f6c-b5a502c2f06c.png"
    },
    {
      id: 5,
      name: "Solana",
      symbol: "SOL",
      price: 189.45,
      change1h: 1.23,
      change24h: 4.56,
      change7d: 15.78,
      marketCap: 76543210987,
      volume24h: 5678901234,
      circulatingSupply: 403.21,
      maxSupply: null,
      logo: "/lovable-uploads/606c24de-873a-4321-9f6c-b5a502c2f06c.png"
    }
  ],
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<{ id: number; updates: Partial<CryptoAsset> }>) => {
      const asset = state.assets.find(a => a.id === action.payload.id);
      if (asset) {
        Object.assign(asset, action.payload.updates);
      }
    },
  },
});

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
