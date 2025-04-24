
import React, { useState, useEffect } from 'react';
import EnergyOutlookSection from './energy/EnergyOutlookSection';
import SmartActionsSection from './actions/SmartActionsSection';
import MicrogridPreviewSection from './microgrid/MicrogridPreviewSection';
import BottomNavBar from './layout/BottomNavBar';
import AuthService from '@/services/AuthService';
import { Button } from '@/components/ui/button';
import { BellRing, Settings, Zap, CreditCard, Thermometer, Calendar, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const HomeDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  
  // Simulate API loading and fetch user preferences
  useEffect(() => {
    const fetchData = async () => {
      // In a real app, this would be API calls
      const preferences = AuthService.getUserPreferences();
      setUserPreferences(preferences);
      
      // Simulate API loading delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);
  
  const getHomeTypeDisplay = () => {
    if (!userPreferences?.homeType) return '';
    
    const homeTypes: Record<string, string> = {
      house: 'House',
      apartment: 'Apartment',
      condo: 'Condo',
      townhouse: 'Townhouse',
      other: 'Home'
    };
    
    return homeTypes[userPreferences.homeType] || '';
  };
  
  const userName = AuthService.getFullName();
  
  return (
    <>
      <main className="flex flex-col min-h-screen bg-gray-50 pb-16">
        <div className="bg-gradient-to-br from-primary to-blue-700 text-white p-5">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold">Hello, {userName}</h1>
                <p className="opacity-90">
                  {userPreferences ? `${getHomeTypeDisplay()} in Milton, ON` : 'Milton, ON'}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => toast.info('Notifications coming soon!')}
                >
                  <BellRing className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-90">Current Usage</p>
                  <p className="text-2xl font-bold">2.4 kWh</p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>0 kWh</span>
                  <span>Daily Budget: 15 kWh</span>
                </div>
                <Progress value={16} className="bg-white/30" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto p-4 -mt-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Today's Cost
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-end">
                  <p className="text-2xl font-bold">$3.45</p>
                  <Badge className="ml-2 mb-1 bg-green-500">-12%</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Carbon Output
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-end">
                  <p className="text-2xl font-bold">1.2 kg</p>
                  <Badge className="ml-2 mb-1 bg-green-500">-8%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="flex items-center justify-start p-6 h-auto" onClick={() => toast.info('Energy bill report coming soon!')}>
              <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <CreditCard className="h-5 w-5 text-blue-700" />
              </div>
              <div className="text-left">
                <p className="font-medium text-base">April Bill Forecast</p>
                <p className="text-sm text-gray-500">$78.50 • Due in 12 days</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center justify-start p-6 h-auto" onClick={() => toast.info('Weather forecast impact coming soon!')}>
              <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <Thermometer className="h-5 w-5 text-amber-700" />
              </div>
              <div className="text-left">
                <p className="font-medium text-base">Weather Impact</p>
                <p className="text-sm text-gray-500">Warm • +5% usage expected</p>
              </div>
            </Button>
          </div>
          
          <EnergyOutlookSection isLoading={isLoading} />
          
          <div className="my-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Energy-saving tasks for today</p>
                <p className="text-sm text-blue-700">3 scheduled tasks • Save up to $2.75</p>
              </div>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700" onClick={() => toast.info('View all tasks')}>
                View
              </Button>
            </div>
          </div>
          
          <SmartActionsSection 
            isLoading={isLoading} 
            userPreferences={userPreferences}
          />
          
          <MicrogridPreviewSection 
            microgridCount={3}
            isLoading={isLoading} 
          />
          
          <div className="mt-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
              <div className="p-2 bg-amber-100 rounded-full mr-3">
                <TriangleAlert className="h-5 w-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-amber-900">Peak Usage Alert</p>
                <p className="text-sm text-amber-700">Expected between 5 PM - 7 PM today</p>
              </div>
              <Button size="sm" variant="outline" className="border-amber-300 text-amber-700" onClick={() => toast.info('View more info')}>
                Details
              </Button>
            </div>
          </div>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
};

export default HomeDashboard;
