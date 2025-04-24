
import React, { useState } from 'react';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { Battery, BatteryCharging, Home, Lightbulb, Share2, Info, MapPin, Users, AlertCircle, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from 'sonner';

// Mock microgrids data
const microGrids = [
  {
    id: 'grid-1',
    name: 'Milton Community Grid',
    location: 'Milton, Ontario',
    distance: '0.8 km',
    members: 34,
    capacity: 125,
    availableCapacity: 45,
    energyPrice: 0.058,
    status: 'active',
    lastActivity: '2 mins ago',
    renewable: 80,
    carbonIntensity: 'Very Low',
    photos: ['/placeholder.svg']
  },
  {
    id: 'grid-2',
    name: 'Halton Green Energy',
    location: 'Milton, Ontario',
    distance: '1.2 km',
    members: 22,
    capacity: 85,
    availableCapacity: 20,
    energyPrice: 0.062,
    status: 'active',
    lastActivity: '5 mins ago',
    renewable: 70,
    carbonIntensity: 'Low',
    photos: ['/placeholder.svg']
  },
  {
    id: 'grid-3',
    name: 'Ontario Solar Collective',
    location: 'Mississauga, Ontario',
    distance: '3.5 km',
    members: 56,
    capacity: 230,
    availableCapacity: 85,
    energyPrice: 0.055,
    status: 'active',
    lastActivity: 'Just now',
    renewable: 95,
    carbonIntensity: 'Minimal',
    photos: ['/placeholder.svg']
  },
  {
    id: 'grid-4',
    name: 'Burlington Power Share',
    location: 'Burlington, Ontario',
    distance: '5.2 km',
    members: 18,
    capacity: 65,
    availableCapacity: 15,
    energyPrice: 0.065,
    status: 'active',
    lastActivity: '12 mins ago',
    renewable: 60,
    carbonIntensity: 'Medium',
    photos: ['/placeholder.svg']
  }
];

// Mock user's microgrids
const userMicroGrids = [
  {
    id: 'grid-1',
    name: 'Milton Community Grid',
    location: 'Milton, Ontario',
    contribution: 5.2,
    earnings: 12.85,
    status: 'connected'
  }
];

const MicroGrid = () => {
  const [selectedGrid, setSelectedGrid] = useState<any>(null);
  const [joinRequestSent, setJoinRequestSent] = useState<string[]>([]);
  
  const handleJoinGrid = (gridId: string) => {
    setJoinRequestSent([...joinRequestSent, gridId]);
    toast.success('Join request sent successfully!');
  };
  
  const handleViewGrid = (grid: any) => {
    setSelectedGrid(grid);
  };
  
  const handleCloseDetails = () => {
    setSelectedGrid(null);
  };
  
  const hasRequestedToJoin = (gridId: string) => {
    return joinRequestSent.includes(gridId);
  };
  
  const isUserMember = (gridId: string) => {
    return userMicroGrids.some(grid => grid.id === gridId);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Energy Microgrids</h1>
          <p className="text-gray-500">Connect and share renewable energy with your community</p>
        </div>
      </header>
      
      <div className="container mx-auto p-4">
        <Tabs defaultValue="nearby" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="nearby">Nearby Grids</TabsTrigger>
            <TabsTrigger value="my-grids">My Grids</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nearby" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {microGrids.map(grid => (
                <Card key={grid.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/4 h-40 md:h-auto">
                      <img 
                        src={grid.photos[0]} 
                        alt={grid.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-2 left-2 ${
                          grid.renewable > 80 ? 'bg-green-500' : 
                          grid.renewable > 60 ? 'bg-green-400' : 
                          'bg-amber-500'
                        }`}
                      >
                        {grid.renewable}% Renewable
                      </Badge>
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{grid.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {grid.location} ({grid.distance})
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-500">Available capacity</p>
                          <p className="text-lg font-bold">{grid.availableCapacity} kWh</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Energy Price: </span>
                          <span className="font-medium">${grid.energyPrice}/kWh</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Members: </span>
                          <span className="font-medium">{grid.members}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Carbon: </span>
                          <span className="font-medium">{grid.carbonIntensity}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewGrid(grid)}
                        >
                          View Details
                        </Button>
                        
                        {isUserMember(grid.id) ? (
                          <Button variant="secondary" size="sm" disabled>
                            <Check className="w-4 h-4 mr-1" />
                            Connected
                          </Button>
                        ) : hasRequestedToJoin(grid.id) ? (
                          <Button variant="secondary" size="sm" disabled>
                            Request Pending
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleJoinGrid(grid.id)}
                          >
                            Join Grid
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-grids" className="mt-4">
            {userMicroGrids.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {userMicroGrids.map(grid => (
                  <Card key={grid.id}>
                    <CardHeader>
                      <CardTitle>{grid.name}</CardTitle>
                      <CardDescription>{grid.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Your Contribution</p>
                          <p className="text-xl font-bold">{grid.contribution} kWh</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Monthly Earnings</p>
                          <p className="text-xl font-bold text-green-600">${grid.earnings}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleViewGrid(microGrids.find(mg => mg.id === grid.id))}
                      >
                        Manage Connection
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <BatteryCharging className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">You're not part of any microgrids</h3>
                <p className="text-gray-500 mb-4">Join a nearby grid to start sharing renewable energy</p>
                <Button onClick={() => document.querySelector('[value="nearby"]')?.dispatchEvent(new Event('click'))}>
                  Explore Nearby Grids
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Map View</CardTitle>
                <CardDescription>Microgrids in your area</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src="/placeholder.svg" 
                    alt="Map view" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Interactive map coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {selectedGrid && (
          <Dialog open={!!selectedGrid} onOpenChange={() => setSelectedGrid(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedGrid.name}</DialogTitle>
                <DialogDescription>{selectedGrid.location}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img 
                    src={selectedGrid.photos[0]} 
                    alt={selectedGrid.name} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Grid Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span className="font-medium flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          Active
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Members</span>
                        <span className="font-medium">{selectedGrid.members}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Capacity</span>
                        <span className="font-medium">{selectedGrid.capacity} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Available Capacity</span>
                        <span className="font-medium">{selectedGrid.availableCapacity} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Energy Price</span>
                        <span className="font-medium">${selectedGrid.energyPrice}/kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Renewable Percentage</span>
                        <span className="font-medium">{selectedGrid.renewable}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Carbon Intensity</span>
                        <span className="font-medium">{selectedGrid.carbonIntensity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Access to locally produced renewable energy</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Lower electricity costs during peak hours</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reduce your carbon footprint</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Support your local energy community</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Energy resilience during outages</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-medium mt-4 mb-2">Requirements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Smart meter compatible with grid system</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Minimum 2kWh monthly contribution if you have renewables</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <DialogFooter>
                {isUserMember(selectedGrid.id) ? (
                  <div className="w-full flex justify-between items-center">
                    <span className="text-green-600 flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      You're connected to this grid
                    </span>
                    <Button variant="outline" onClick={handleCloseDetails}>
                      Close
                    </Button>
                  </div>
                ) : hasRequestedToJoin(selectedGrid.id) ? (
                  <div className="w-full flex justify-between items-center">
                    <span className="text-amber-600">Request is pending approval</span>
                    <Button variant="outline" onClick={handleCloseDetails}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleCloseDetails}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      handleJoinGrid(selectedGrid.id);
                      handleCloseDetails();
                    }}>
                      Request to Join
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default MicroGrid;
