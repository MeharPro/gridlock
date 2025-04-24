
import React, { useState, useEffect } from 'react';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { User, Home, Zap, Bell, Lock, HelpCircle, LogOut, ChevronRight, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/AuthService';

const Settings = () => {
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isHomeDialogOpen, setIsHomeDialogOpen] = useState(false);
  const [isEnergyDialogOpen, setIsEnergyDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: 'user@example.com',
    phone: ''
  });
  const [homeSettings, setHomeSettings] = useState({
    address: '',
    city: 'Milton',
    province: 'Ontario',
    postalCode: '',
    homeType: 'house'
  });
  const [energySettings, setEnergySettings] = useState({
    provider: 'Ontario Power',
    meterNumber: '',
    plan: 'Time-of-Use',
    renewables: [] as string[]
  });
  const [notificationSettings, setNotificationSettings] = useState({
    priceAlerts: true,
    outageAlerts: true,
    optimalWindowAlerts: true,
    savingTips: true,
    appUpdates: true
  });
  
  useEffect(() => {
    // Load user data from local storage
    const userPreferences = AuthService.getUserPreferences();
    
    if (userPreferences) {
      if (userPreferences.firstName && userPreferences.lastName) {
        setProfile({
          ...profile,
          firstName: userPreferences.firstName,
          lastName: userPreferences.lastName
        });
      }
      
      if (userPreferences.homeType) {
        setHomeSettings({
          ...homeSettings,
          homeType: userPreferences.homeType
        });
      }
      
      if (userPreferences.renewables) {
        setEnergySettings({
          ...energySettings,
          renewables: userPreferences.renewables
        });
      }
    }
  }, []);
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save profile updates
    const userPreferences = AuthService.getUserPreferences() || {};
    localStorage.setItem('userPreferences', JSON.stringify({
      ...userPreferences,
      firstName: profile.firstName,
      lastName: profile.lastName
    }));
    
    toast.success('Profile updated successfully');
    setIsProfileDialogOpen(false);
  };
  
  const handleHomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save home settings updates
    const userPreferences = AuthService.getUserPreferences() || {};
    localStorage.setItem('userPreferences', JSON.stringify({
      ...userPreferences,
      homeType: homeSettings.homeType,
      address: homeSettings.address,
      city: homeSettings.city,
      province: homeSettings.province,
      postalCode: homeSettings.postalCode
    }));
    
    toast.success('Home settings updated successfully');
    setIsHomeDialogOpen(false);
  };
  
  const handleEnergySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save energy settings updates
    const userPreferences = AuthService.getUserPreferences() || {};
    localStorage.setItem('userPreferences', JSON.stringify({
      ...userPreferences,
      provider: energySettings.provider,
      meterNumber: energySettings.meterNumber,
      plan: energySettings.plan,
      renewables: energySettings.renewables
    }));
    
    toast.success('Energy settings updated successfully');
    setIsEnergyDialogOpen(false);
  };
  
  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value
    });
    toast.success(`Notification setting updated`);
  };
  
  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    AuthService.logout();
    navigate('/login');
    toast.success('You have been logged out');
  };
  
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`${isDarkMode ? 'Light' : 'Dark'} mode activated`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>
      </header>
      
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 flex items-center">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {profile.firstName || profile.lastName 
                  ? `${profile.firstName} ${profile.lastName}`
                  : 'Your Account'}
              </h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">ACCOUNT</h3>
            <div className="space-y-1">
              <button 
                onClick={() => setIsProfileDialogOpen(true)}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Personal Information</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              
              <button 
                onClick={() => setIsHomeDialogOpen(true)}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Home Settings</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              
              <button 
                onClick={() => setIsEnergyDialogOpen(true)}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Energy Preferences</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">PREFERENCES</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between w-full p-3">
                <div className="flex items-center">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-gray-500 mr-3" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-500 mr-3" />
                  )}
                  <span>Dark Mode</span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={handleToggleDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between w-full p-3">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Notifications</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">NOTIFICATIONS</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between w-full p-3">
                <span>Price Alerts</span>
                <Switch
                  checked={notificationSettings.priceAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('priceAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between w-full p-3">
                <span>Outage Alerts</span>
                <Switch
                  checked={notificationSettings.outageAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('outageAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between w-full p-3">
                <span>Optimal Window Notifications</span>
                <Switch
                  checked={notificationSettings.optimalWindowAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('optimalWindowAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between w-full p-3">
                <span>Energy Saving Tips</span>
                <Switch
                  checked={notificationSettings.savingTips}
                  onCheckedChange={(checked) => handleNotificationChange('savingTips', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between w-full p-3">
                <span>App Updates</span>
                <Switch
                  checked={notificationSettings.appUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('appUpdates', checked)}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">HELP & SECURITY</h3>
            <div className="space-y-1">
              <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Help Center</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              
              <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              
              <button 
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-md text-red-600"
                onClick={() => setIsLogoutDialogOpen(true)}
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Log Out</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500">GridLocked v1.0.0</p>
          </div>
        </div>
      </div>
      
      {/* Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Personal Information</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={profile.firstName} 
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={profile.lastName} 
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={profile.email} 
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={profile.phone} 
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsProfileDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Home Settings Dialog */}
      <Dialog open={isHomeDialogOpen} onOpenChange={setIsHomeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Home Settings</DialogTitle>
            <DialogDescription>
              Update your home details and location
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleHomeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input 
                id="address" 
                value={homeSettings.address} 
                onChange={(e) => setHomeSettings({...homeSettings, address: e.target.value})}
                placeholder="123 Main St"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={homeSettings.city} 
                  onChange={(e) => setHomeSettings({...homeSettings, city: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select
                  value={homeSettings.province}
                  onValueChange={(value) => setHomeSettings({...homeSettings, province: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ontario">Ontario</SelectItem>
                    <SelectItem value="Quebec">Quebec</SelectItem>
                    <SelectItem value="British Columbia">British Columbia</SelectItem>
                    <SelectItem value="Alberta">Alberta</SelectItem>
                    <SelectItem value="Manitoba">Manitoba</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input 
                id="postalCode" 
                value={homeSettings.postalCode} 
                onChange={(e) => setHomeSettings({...homeSettings, postalCode: e.target.value})}
                placeholder="A1A 1A1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="homeType">Home Type</Label>
              <Select
                value={homeSettings.homeType}
                onValueChange={(value) => setHomeSettings({...homeSettings, homeType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select home type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsHomeDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Energy Preferences Dialog */}
      <Dialog open={isEnergyDialogOpen} onOpenChange={setIsEnergyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Energy Preferences</DialogTitle>
            <DialogDescription>
              Configure your energy settings and provider details
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEnergySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Energy Provider</Label>
              <Select
                value={energySettings.provider}
                onValueChange={(value) => setEnergySettings({...energySettings, provider: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ontario Power">Ontario Power</SelectItem>
                  <SelectItem value="Toronto Hydro">Toronto Hydro</SelectItem>
                  <SelectItem value="Alectra Utilities">Alectra Utilities</SelectItem>
                  <SelectItem value="Hydro One">Hydro One</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meterNumber">Meter Number (Optional)</Label>
              <Input 
                id="meterNumber" 
                value={energySettings.meterNumber} 
                onChange={(e) => setEnergySettings({...energySettings, meterNumber: e.target.value})}
                placeholder="Enter your meter number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plan">Rate Plan</Label>
              <Select
                value={energySettings.plan}
                onValueChange={(value) => setEnergySettings({...energySettings, plan: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Time-of-Use">Time-of-Use</SelectItem>
                  <SelectItem value="Tiered">Tiered</SelectItem>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                  <SelectItem value="Variable">Variable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Renewable Energy Sources</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="solar"
                    checked={energySettings.renewables.includes('solar')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setEnergySettings({
                          ...energySettings,
                          renewables: [...energySettings.renewables, 'solar']
                        });
                      } else {
                        setEnergySettings({
                          ...energySettings,
                          renewables: energySettings.renewables.filter(r => r !== 'solar')
                        });
                      }
                    }}
                  />
                  <Label htmlFor="solar">Solar Panels</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="battery"
                    checked={energySettings.renewables.includes('home_battery')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setEnergySettings({
                          ...energySettings,
                          renewables: [...energySettings.renewables, 'home_battery']
                        });
                      } else {
                        setEnergySettings({
                          ...energySettings,
                          renewables: energySettings.renewables.filter(r => r !== 'home_battery')
                        });
                      }
                    }}
                  />
                  <Label htmlFor="battery">Home Battery</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ev"
                    checked={energySettings.renewables.includes('ev_charger')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setEnergySettings({
                          ...energySettings,
                          renewables: [...energySettings.renewables, 'ev_charger']
                        });
                      } else {
                        setEnergySettings({
                          ...energySettings,
                          renewables: energySettings.renewables.filter(r => r !== 'ev_charger')
                        });
                      }
                    }}
                  />
                  <Label htmlFor="ev">EV Charger</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsEnergyDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Logout Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of GridLocked?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNavBar />
    </div>
  );
};

export default Settings;
