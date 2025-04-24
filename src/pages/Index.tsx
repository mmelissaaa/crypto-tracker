
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { CryptoTable } from '../components/CryptoTable';
import { WebSocketSimulator } from '../services/websocketSimulator';

const Index = () => {
  useEffect(() => {
    const ws = new WebSocketSimulator();
    ws.start();
    return () => ws.stop();
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Cryptocurrency Prices</h1>
            <p className="text-gray-500 mt-2">Real-time crypto market data</p>
          </div>
          <CryptoTable />
        </div>
      </div>
    </Provider>
  );
};

export default Index;
