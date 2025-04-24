
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import CurrentStatus from './CurrentStatus';
import EnergyTimelineGraph, { EnergyDataPoint } from './EnergyTimelineGraph';
import NextOptimalWindow from './NextOptimalWindow';
import { motion } from 'framer-motion';

// Enhanced mock data for the energy chart with more detailed price and carbon data
const mockEnergyData: EnergyDataPoint[] = [
  { time: '12 AM', price: 0.062, carbon: 120, renewables: 45, period: 'optimal' },
  { time: '2 AM', price: 0.058, carbon: 115, renewables: 47, period: 'optimal' },
  { time: '4 AM', price: 0.061, carbon: 118, renewables: 46, period: 'optimal' },
  { time: '6 AM', price: 0.075, carbon: 130, renewables: 42, period: 'mid' },
  { time: '8 AM', price: 0.092, carbon: 145, renewables: 38, period: 'mid' },
  { time: '10 AM', price: 0.108, carbon: 155, renewables: 40, period: 'peak' },
  { time: '12 PM', price: 0.115, carbon: 160, renewables: 39, period: 'peak' },
  { time: '2 PM', price: 0.104, carbon: 150, renewables: 43, period: 'peak' },
  { time: '4 PM', price: 0.110, carbon: 158, renewables: 41, period: 'peak' },
  { time: '6 PM', price: 0.098, carbon: 148, renewables: 40, period: 'mid' },
  { time: '8 PM', price: 0.082, carbon: 135, renewables: 42, period: 'mid' },
  { time: '10 PM', price: 0.070, carbon: 125, renewables: 44, period: 'mid' }
];

interface EnergyOutlookSectionProps {
  isLoading?: boolean;
}

const EnergyOutlookSection = ({ isLoading = false }: EnergyOutlookSectionProps) => {
  const isMobile = useIsMobile();
  
  // Get current time to display on the graph
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    return `${hours} ${ampm}`;
  };
  
  // Calculate actual values from the data
  const getCurrentValues = () => {
    const currentTime = getCurrentTime();
    const currentData = mockEnergyData.find(item => item.time === currentTime) || mockEnergyData[0];
    
    let costLevel: 'Low' | 'Medium' | 'High';
    if (currentData.price < 0.07) costLevel = 'Low';
    else if (currentData.price < 0.09) costLevel = 'Medium';
    else costLevel = 'High';
    
    let carbonLevel: 'Low' | 'Medium' | 'High';
    if (currentData.carbon < 125) carbonLevel = 'Low';
    else if (currentData.carbon < 145) carbonLevel = 'Medium';
    else carbonLevel = 'High';
    
    return {
      costLevel,
      carbonLevel,
      renewablePercent: currentData.renewables || 45
    };
  };
  
  const { costLevel, carbonLevel, renewablePercent } = getCurrentValues();
  const currentTime = getCurrentTime();
  const optimalTimeRange = '2 AM - 5 AM';
  const costSaving = '~$0.82 CAD/kWh';
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <motion.section 
      className="flex flex-col space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <h2 className="text-h2 font-semibold">Energy Outlook</h2>
        <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-pill">
          Live Data
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <CurrentStatus 
          costLevel={costLevel}
          carbonLevel={carbonLevel}
          renewablePercent={renewablePercent}
          isLoading={isLoading}
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-h4 font-medium text-text-primary">Today's Rates</h3>
          <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
              <span className="text-xs text-text-secondary">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div>
              <span className="text-xs text-text-secondary">Mid</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
              <span className="text-xs text-text-secondary">Peak</span>
            </div>
          </div>
        </div>
        
        <EnergyTimelineGraph 
          data={mockEnergyData} 
          currentTime={currentTime}
          isLoading={isLoading}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <NextOptimalWindow 
          timeRange={optimalTimeRange}
          costSaving={costSaving}
          isLoading={isLoading}
        />
      </motion.div>
    </motion.section>
  );
};

export default EnergyOutlookSection;
