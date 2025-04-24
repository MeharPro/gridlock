import React, { useState } from 'react';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Sliders, Download, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const dailyUsageData = [
  { time: '12 AM', energy: 1.2, cost: 0.07, carbon: 90 },
  { time: '3 AM', energy: 0.8, cost: 0.05, carbon: 60 },
  { time: '6 AM', energy: 1.5, cost: 0.09, carbon: 110 },
  { time: '9 AM', energy: 2.3, cost: 0.14, carbon: 170 },
  { time: '12 PM', energy: 3.1, cost: 0.18, carbon: 230 },
  { time: '3 PM', energy: 2.8, cost: 0.17, carbon: 210 },
  { time: '6 PM', energy: 3.5, cost: 0.21, carbon: 260 },
  { time: '9 PM', energy: 2.1, cost: 0.13, carbon: 160 },
];

const weeklyUsageData = [
  { day: 'Mon', energy: 12, cost: 0.72, carbon: 900 },
  { day: 'Tue', energy: 15, cost: 0.90, carbon: 1100 },
  { day: 'Wed', energy: 13, cost: 0.78, carbon: 970 },
  { day: 'Thu', energy: 17, cost: 1.02, carbon: 1250 },
  { day: 'Fri', energy: 14, cost: 0.84, carbon: 1050 },
  { day: 'Sat', energy: 11, cost: 0.66, carbon: 820 },
  { day: 'Sun', energy: 10, cost: 0.60, carbon: 750 },
];

const monthlyUsageData = [
  { name: 'Jan', energy: 320, cost: 19.20, carbon: 23800 },
  { name: 'Feb', energy: 290, cost: 17.40, carbon: 21500 },
  { name: 'Mar', energy: 310, cost: 18.60, carbon: 23000 },
  { name: 'Apr', energy: 340, cost: 20.40, carbon: 25200 },
  { name: 'May', energy: 380, cost: 22.80, carbon: 28100 },
  { name: 'Jun', energy: 420, cost: 25.20, carbon: 31100 },
  { name: 'Jul', energy: 450, cost: 27.00, carbon: 33300 },
  { name: 'Aug', energy: 430, cost: 25.80, carbon: 31900 },
  { name: 'Sep', energy: 370, cost: 22.20, carbon: 27400 },
  { name: 'Oct', energy: 350, cost: 21.00, carbon: 25900 },
  { name: 'Nov', energy: 330, cost: 19.80, carbon: 24400 },
  { name: 'Dec', energy: 360, cost: 21.60, carbon: 26700 },
];

const sourceData = [
  { name: 'Grid', value: 65, color: '#6366F1' },
  { name: 'Solar', value: 25, color: '#10B981' },
  { name: 'Battery', value: 10, color: '#F59E0B' },
];

const usageByDeviceData = [
  { name: 'HVAC', value: 45, color: '#6366F1' },
  { name: 'Appliances', value: 25, color: '#10B981' },
  { name: 'Lighting', value: 15, color: '#F59E0B' },
  { name: 'EV Charging', value: 10, color: '#EC4899' },
  { name: 'Other', value: 5, color: '#8B5CF6' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-md shadow-md">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.name === 'cost' ? ' CAD' : entry.name === 'energy' ? ' kWh' : entry.name === 'carbon' ? ' g' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('day');
  const [activeTab, setActiveTab] = useState('energy');
  const currentDate = new Date();
  
  const getTimeRangeLabel = () => {
    if (timeRange === 'day') {
      return format(currentDate, 'MMMM d, yyyy');
    } else if (timeRange === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${format(startOfWeek, 'MMM d')} - ${format(endOfWeek, 'MMM d, yyyy')}`;
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };

  const getChartData = () => {
    if (timeRange === 'day') return dailyUsageData;
    if (timeRange === 'week') return weeklyUsageData;
    return monthlyUsageData;
  };

  const getXAxisKey = () => {
    if (timeRange === 'day') return 'time';
    if (timeRange === 'week') return 'day';
    return 'name';
  };

  // Calculate totals
  const data = getChartData();
  const totalEnergy = data.reduce((sum, item) => sum + item.energy, 0);
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
  const totalCarbon = data.reduce((sum, item) => sum + item.carbon, 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Energy Analytics</h1>
          <p className="text-gray-500">{getTimeRangeLabel()}</p>
        </div>
      </header>
      
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Energy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalEnergy.toFixed(1)} kWh</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${totalCost.toFixed(2)} CAD</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Carbon Footprint</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalCarbon.toFixed(0)} g</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Energy Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="energy" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="energy">Energy (kWh)</TabsTrigger>
                <TabsTrigger value="cost">Cost (CAD)</TabsTrigger>
                <TabsTrigger value="carbon">Carbon (g)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="energy" className="mt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey={getXAxisKey()} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#6366F1" 
                        fillOpacity={1} 
                        fill="url(#colorEnergy)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="cost" className="mt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey={getXAxisKey()} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="cost" 
                        stroke="#10B981" 
                        fillOpacity={1} 
                        fill="url(#colorCost)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="carbon" className="mt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey={getXAxisKey()} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="carbon" 
                        stroke="#F59E0B" 
                        fillOpacity={1} 
                        fill="url(#colorCarbon)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Source</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-64 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {sourceData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-1" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage by Device</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-64 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={usageByDeviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {usageByDeviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {usageByDeviceData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-1" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default Analytics;
