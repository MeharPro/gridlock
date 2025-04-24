
import React from 'react';
import { Clock, Zap } from 'lucide-react';

interface NextOptimalWindowProps {
  timeRange: string;
  costSaving?: string;
  isLoading?: boolean;
}

const NextOptimalWindow = ({ timeRange, costSaving = '~$0.75 CAD/kWh', isLoading = false }: NextOptimalWindowProps) => {
  if (isLoading) {
    return (
      <div className="text-center p-4 bg-surface rounded-lg shadow-level-1 animate-pulse">
        <div className="h-6 w-3/4 bg-gray-200 mx-auto rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 mx-auto rounded mt-2"></div>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-surface rounded-lg shadow-level-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-optimal-bg rounded-full mr-3">
            <Clock className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-body font-medium">Next Low Cost Window</p>
            <p className="text-primary font-semibold">{timeRange}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center text-caption text-text-secondary">
            <Zap className="w-3 h-3 mr-1" />
            <span>Save {costSaving}</span>
          </div>
          <button className="text-xs text-primary font-medium mt-1">Set Reminder</button>
        </div>
      </div>
    </div>
  );
};

export default NextOptimalWindow;
