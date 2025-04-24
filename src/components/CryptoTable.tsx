
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from '../utils/formatters';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const CHART_CONFIG = {
  width: 120,
  height: 40,
  points: 20,
};

export const CryptoTable = () => {
  const assets = useSelector((state: RootState) => state.crypto.assets);

  const renderPercentage = (value: number) => {
    const color = value >= 0 ? 'text-green-500' : 'text-red-500';
    const Icon = value >= 0 ? ArrowUp : ArrowDown;
    return (
      <div className={`flex items-center gap-1 ${color} font-medium`}>
        <Icon size={16} />
        {Math.abs(value)}%
      </div>
    );
  };

  const generateMockChartPath = () => {
    const points = Array.from({ length: CHART_CONFIG.points }, () => 
      Math.random() * CHART_CONFIG.height
    );
    
    const pathCommands = points.map((point, index) => {
      const x = (index * CHART_CONFIG.width) / (CHART_CONFIG.points - 1);
      return `${index === 0 ? 'M' : 'L'} ${x} ${point}`;
    });

    return pathCommands.join(' ');
  };

  return (
    <Card className="w-full overflow-hidden border-none shadow-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">1h %</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">7d %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume(24h)</TableHead>
              <TableHead className="text-right">Circulating Supply</TableHead>
              <TableHead className="text-right min-w-[120px]">7D Chart</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id} className="hover:bg-gray-50/50">
                <TableCell>{asset.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={asset.logo} alt={asset.name} className="w-8 h-8" />
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-gray-500">{asset.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${formatNumber(asset.price)}
                </TableCell>
                <TableCell className="text-right">{renderPercentage(asset.change1h)}</TableCell>
                <TableCell className="text-right">{renderPercentage(asset.change24h)}</TableCell>
                <TableCell className="text-right">{renderPercentage(asset.change7d)}</TableCell>
                <TableCell className="text-right">${formatNumber(asset.marketCap)}</TableCell>
                <TableCell className="text-right">${formatNumber(asset.volume24h)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end gap-1">
                    <div>{formatNumber(asset.circulatingSupply)} {asset.symbol}</div>
                    {asset.maxSupply && (
                      <div className="text-sm text-gray-500">
                        Max: {formatNumber(asset.maxSupply)} {asset.symbol}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right p-2">
                  <svg
                    width={CHART_CONFIG.width}
                    height={CHART_CONFIG.height}
                    className="inline-block"
                  >
                    <path
                      d={generateMockChartPath()}
                      fill="none"
                      stroke={asset.change7d >= 0 ? "#22c55e" : "#ef4444"}
                      strokeWidth="2"
                    />
                  </svg>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
