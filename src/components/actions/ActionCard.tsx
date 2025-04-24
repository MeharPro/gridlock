
import React from 'react';
import { 
  Lightbulb, Fan, WashingMachine, 
  Refrigerator, Zap, Clock, Battery, 
  Car, Thermometer 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ActionProps {
  id: string;
  icon: string;
  description: string;
  timeRange: string;
  savingsText: string;
  onRemind: () => void;
  onSchedule: () => void;
}

// Map string icon names to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  lightbulb: <Lightbulb className="w-8 h-8 text-primary" />,
  fan: <Fan className="w-8 h-8 text-primary" />,
  washer: <WashingMachine className="w-8 h-8 text-primary" />,
  fridge: <Refrigerator className="w-8 h-8 text-primary" />,
  energy: <Zap className="w-8 h-8 text-primary" />,
  clock: <Clock className="w-8 h-8 text-primary" />,
  battery: <Battery className="w-8 h-8 text-primary" />,
  car: <Car className="w-8 h-8 text-primary" />,
  thermometer: <Thermometer className="w-8 h-8 text-primary" />
};

const ActionCard = ({ 
  icon, 
  description, 
  timeRange, 
  savingsText, 
  onRemind, 
  onSchedule 
}: ActionProps) => {
  return (
    <div className="bg-surface rounded-xl shadow-level-2 p-4 w-64 flex-shrink-0 flex flex-col items-center space-y-2">
      <div className="p-2 bg-primary/10 rounded-full">
        {iconMap[icon] || <Zap className="w-8 h-8 text-primary" />}
      </div>
      
      <p className="text-h4 font-medium text-center text-text-primary">{description}</p>
      
      <p className="text-caption text-text-secondary text-center">{timeRange}</p>
      
      <p className="text-body font-bold text-accent text-center">{savingsText}</p>
      
      <div className="flex justify-center space-x-3 pt-2 w-full">
        <Button
          variant="outline" 
          size="sm"
          onClick={onRemind}
          className="text-xs"
        >
          Remind
        </Button>
        
        <Button
          onClick={onSchedule}
          size="sm"
          className="bg-primary text-xs"
        >
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default ActionCard;
