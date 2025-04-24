
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

export interface EnergyDataPoint {
  time: string;
  price: number;
  carbon?: number;
  renewables?: number;
  period?: 'optimal' | 'mid' | 'peak';
}

interface EnergyTimelineGraphProps {
  data: EnergyDataPoint[];
  currentTime?: string;
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md text-xs">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-primary mt-1">{`Price: $${payload[0].value.toFixed(3)} CAD/kWh`}</p>
        {payload[0].payload.carbon !== undefined && (
          <p className="text-amber-600">{`Carbon: ${payload[0].payload.carbon} g/kWh`}</p>
        )}
        {payload[0].payload.renewables !== undefined && (
          <p className="text-green-600">{`Renewables: ${payload[0].payload.renewables}%`}</p>
        )}
      </div>
    );
  }
  return null;
};

const EnergyTimelineGraph = ({ data, currentTime, isLoading = false }: EnergyTimelineGraphProps) => {
  const isMobile = useIsMobile();
  
  // Find the current time index in the data
  const currentTimeIndex = currentTime 
    ? data.findIndex(item => item.time === currentTime)
    : Math.floor(data.length / 2); // Default to middle if not provided
  
  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.2
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="mt-4 mb-2">
        <div className="h-48 w-full bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="mt-4 mb-2"
      variants={animationVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className={`relative w-full ${isMobile ? 'h-40' : 'h-48'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ 
                top: 5, 
                right: isMobile ? 10 : 20, 
                left: isMobile ? -15 : 0, 
                bottom: 5 
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3d8bfd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3d8bfd" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: isMobile ? 8 : 10, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                interval={isMobile ? 1 : 0} // Show fewer ticks on mobile
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 8 : 10, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                width={isMobile ? 35 : 45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#3d8bfd" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)" 
                animationDuration={1000}
              />
              {currentTimeIndex >= 0 && (
                <ReferenceLine 
                  x={data[currentTimeIndex].time} 
                  stroke="#3d8bfd" 
                  strokeWidth={2} 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Now', 
                    position: 'top', 
                    fill: '#3d8bfd', 
                    fontSize: isMobile ? 8 : 10 
                  }} 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default EnergyTimelineGraph;
