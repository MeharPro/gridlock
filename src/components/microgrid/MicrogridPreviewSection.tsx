
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { BatteryCharging, MapPin, Users, Zap } from 'lucide-react';

interface MicrogridPreviewSectionProps {
  microgridCount: number;
  isLoading?: boolean;
}

const MicrogridPreviewSection = ({ 
  microgridCount = 2, 
  isLoading = false 
}: MicrogridPreviewSectionProps) => {
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    navigate('/microgrid');
  };
  
  if (isLoading) {
    return (
      <section className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center space-y-3">
        <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </section>
    );
  }
  
  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative w-full h-40 overflow-hidden">
        <img 
          src="/placeholder.svg" 
          alt="Map of Milton area" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end">
          <div className="p-4 w-full">
            <div className="flex items-center text-white mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="font-medium">Milton, ON</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded text-white text-sm flex items-center">
                <BatteryCharging className="w-3 h-3 mr-1" />
                <span>{microgridCount} Nearby Microgrids</span>
              </div>
              <div className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded text-white text-sm flex items-center">
                <Users className="w-3 h-3 mr-1" />
                <span>74 Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-lg">Local Energy Community</h3>
            <p className="text-sm text-gray-500">Share & trade renewable energy</p>
          </div>
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Active
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center">
            <div className="p-1.5 bg-blue-100 rounded-full mr-2">
              <Zap className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <span className="text-gray-700">Available: 65kWh</span>
          </div>
          <div className="text-primary font-medium">
            $0.058/kWh
          </div>
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleExploreClick}
        >
          Explore Local Grids
        </Button>
      </div>
    </section>
  );
};

export default MicrogridPreviewSection;
