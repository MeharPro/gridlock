
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface StatusIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
  value?: string | number;
  label: string;
}

const StatusIndicator = ({ level, value, label }: StatusIndicatorProps) => {
  const levelColorClass = 
    level === 'Low' ? 'text-green-600' : 
    level === 'Medium' ? 'text-amber-600' : 
    'text-red-600';
  
  return (
    <motion.div 
      className="flex flex-col items-center space-y-1"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className={`text-sm font-medium ${levelColorClass}`}>{level}</span>
      {value !== undefined && (
        <span className="text-h3 font-bold text-text-primary">{value}</span>
      )}
      <span className="text-caption text-text-secondary">{label}</span>
    </motion.div>
  );
};

interface CurrentStatusProps {
  costLevel: 'Low' | 'Medium' | 'High';
  carbonLevel: 'Low' | 'Medium' | 'High';
  renewablePercent: number;
  isLoading?: boolean;
}

const CurrentStatus = ({ 
  costLevel, 
  carbonLevel, 
  renewablePercent, 
  isLoading = false 
}: CurrentStatusProps) => {
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return (
      <div className="flex justify-around items-start p-4 bg-white rounded-xl shadow-sm">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-7 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-14 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }
  
  // Define cost and carbon values based on level
  const getCostValue = () => {
    if (costLevel === 'Low') return '$0.06/kWh';
    if (costLevel === 'Medium') return '$0.08/kWh';
    return '$0.11/kWh';
  };
  
  const getCarbonValue = () => {
    if (carbonLevel === 'Low') return '120 g/kWh';
    if (carbonLevel === 'Medium') return '140 g/kWh';
    return '155 g/kWh';
  };
  
  return (
    <div className={`flex justify-around items-start p-4 bg-white rounded-xl shadow-sm ${isMobile ? 'gap-1' : 'gap-4'}`}>
      <StatusIndicator level={costLevel} value={getCostValue()} label="Cost" />
      <StatusIndicator level={carbonLevel} value={getCarbonValue()} label="Carbon" />
      <StatusIndicator level={renewablePercent >= 50 ? 'High' : renewablePercent >= 30 ? 'Medium' : 'Low'} value={`${renewablePercent}%`} label="Renewable" />
    </div>
  );
};

export default CurrentStatus;
