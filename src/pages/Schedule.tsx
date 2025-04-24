import React, { useState } from 'react';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Edit, Zap, TriangleAlert, BatteryCharging, Car } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ScheduledTask {
  id: string;
  title: string;
  date: Date;
  time: string;
  appliance: string;
  applianceIcon: React.ReactNode;
  type: 'economic' | 'carbon' | 'renewable';
  status: 'scheduled' | 'completed' | 'failed';
  recurring: boolean;
  saving?: {
    cost: number;
    carbon: number;
  };
}

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ScheduledTask | null>(null);
  const [newTask, setNewTask] = useState({
    appliance: '',
    type: 'economic',
    time: '',
    recurring: false,
  });
  const [activeView, setActiveView] = useState('list');

  const [tasks, setTasks] = useState<ScheduledTask[]>([
    {
      id: '1',
      title: 'Charge EV',
      date: new Date(),
      time: '01:00 AM - 04:00 AM',
      appliance: 'Electric Vehicle',
      applianceIcon: <Car className="w-5 h-5" />,
      type: 'economic',
      status: 'scheduled',
      recurring: true,
      saving: {
        cost: 2.35,
        carbon: 450,
      }
    },
    {
      id: '2',
      title: 'Run Dishwasher',
      date: new Date(),
      time: '02:00 AM - 03:30 AM',
      appliance: 'Dishwasher',
      applianceIcon: <Zap className="w-5 h-5" />,
      type: 'carbon',
      status: 'scheduled',
      recurring: false,
      saving: {
        cost: 0.50,
        carbon: 120,
      }
    },
    {
      id: '3',
      title: 'Charge Home Battery',
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // tomorrow
      time: '12:00 PM - 03:00 PM',
      appliance: 'Home Battery',
      applianceIcon: <BatteryCharging className="w-5 h-5" />,
      type: 'renewable',
      status: 'scheduled',
      recurring: false,
      saving: {
        cost: 1.15,
        carbon: 350,
      }
    }
  ]);
  
  const handleCreateTask = () => {
    if (!newTask.appliance || !newTask.type || !newTask.time) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    const applianceIconMap: Record<string, React.ReactNode> = {
      'Electric Vehicle': <Car className="w-5 h-5" />,
      'Dishwasher': <Zap className="w-5 h-5" />,
      'Washing Machine': <Zap className="w-5 h-5" />,
      'Home Battery': <BatteryCharging className="w-5 h-5" />,
      'HVAC': <Zap className="w-5 h-5" />,
    };
    
    const newTaskObject: ScheduledTask = {
      id: `task-${tasks.length + 1}`,
      title: newTask.appliance,
      date: date || new Date(),
      time: newTask.time,
      appliance: newTask.appliance,
      applianceIcon: applianceIconMap[newTask.appliance] || <Zap className="w-5 h-5" />,
      type: newTask.type as 'economic' | 'carbon' | 'renewable',
      status: 'scheduled',
      recurring: newTask.recurring,
      saving: {
        cost: Math.random() * 2 + 0.5,
        carbon: Math.floor(Math.random() * 500) + 100,
      }
    };
    
    setTasks([...tasks, newTaskObject]);
    setIsCreateDialogOpen(false);
    toast.success('Task scheduled successfully');
    
    setNewTask({
      appliance: '',
      type: 'economic',
      time: '',
      recurring: false,
    });
  };
  
  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setIsDeleteDialogOpen(false);
      setSelectedTask(null);
      toast.success('Task deleted successfully');
    }
  };
  
  const filteredTasks = date 
    ? tasks.filter(task => 
        task.date.getDate() === date.getDate() && 
        task.date.getMonth() === date.getMonth() && 
        task.date.getFullYear() === date.getFullYear()
      )
    : [];
  
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'economic':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Economic</Badge>;
      case 'carbon':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low Carbon</Badge>;
      case 'renewable':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Renewable</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Energy Schedule</h1>
          <p className="text-gray-500">Optimize your energy usage</p>
        </div>
      </header>
      
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Select Date</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDate(new Date())}
                >
                  Today
                </Button>
              </div>
              
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div className="mt-4">
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
              <h2 className="font-semibold mb-4">Optimal Energy Windows</h2>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Zap className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-700">Best Cost Savings</p>
                      <p className="text-sm text-blue-600">2:00 AM - 5:00 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-100 rounded-md p-3">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <TriangleAlert className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-green-700">Lowest Carbon</p>
                      <p className="text-sm text-green-600">3:00 AM - 6:00 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-100 rounded-full mr-3">
                      <BatteryCharging className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-700">Max Renewable</p>
                      <p className="text-sm text-amber-600">11:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {date ? format(date, 'MMMM d, yyyy') : 'No Date Selected'}
                </h2>
                
                <div className="w-60">
                  <Tabs defaultValue="list" value={activeView} onValueChange={setActiveView}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="list">List View</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>
                  
                    <TabsContent value="list" className="mt-4">
                      {filteredTasks.length === 0 ? (
                        <div className="text-center py-10">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <Calendar className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No tasks scheduled</h3>
                          <p className="text-gray-500 mb-4">Add a task to optimize your energy usage</p>
                          <Button onClick={() => setIsCreateDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Task
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {filteredTasks.map((task) => (
                            <div 
                              key={task.id} 
                              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`p-2 rounded-full mr-3 ${
                                    task.type === 'economic' ? 'bg-blue-100' :
                                    task.type === 'carbon' ? 'bg-green-100' : 'bg-amber-100'
                                  }`}>
                                    {task.applianceIcon}
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{task.title}</h3>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>{task.time}</span>
                                      {task.recurring && (
                                        <Badge variant="outline" className="text-xs">Recurring</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                  {getTaskTypeIcon(task.type)}
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setSelectedTask(task);
                                      setIsDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {task.saving && (
                                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                                  <div>
                                    <span className="text-gray-500">Cost Savings: </span>
                                    <span className="font-medium text-green-600">${task.saving.cost.toFixed(2)} CAD</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Carbon Reduction: </span>
                                    <span className="font-medium text-green-600">{task.saving.carbon} g</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="timeline" className="mt-4">
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-gray-500">Timeline view coming soon</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Task</DialogTitle>
            <DialogDescription>
              Choose an appliance and the optimal time to run it.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="appliance">Appliance</Label>
              <Select
                value={newTask.appliance}
                onValueChange={(value) => setNewTask({...newTask, appliance: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an appliance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electric Vehicle">Electric Vehicle</SelectItem>
                  <SelectItem value="Dishwasher">Dishwasher</SelectItem>
                  <SelectItem value="Washing Machine">Washing Machine</SelectItem>
                  <SelectItem value="Home Battery">Home Battery</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Optimization Type</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={newTask.type === 'economic' ? 'default' : 'outline'}
                  className={newTask.type === 'economic' ? 'border-blue-600' : ''}
                  onClick={() => setNewTask({...newTask, type: 'economic'})}
                >
                  Cost
                </Button>
                <Button
                  type="button"
                  variant={newTask.type === 'carbon' ? 'default' : 'outline'}
                  className={newTask.type === 'carbon' ? 'border-green-600' : ''}
                  onClick={() => setNewTask({...newTask, type: 'carbon'})}
                >
                  Carbon
                </Button>
                <Button
                  type="button"
                  variant={newTask.type === 'renewable' ? 'default' : 'outline'}
                  className={newTask.type === 'renewable' ? 'border-amber-600' : ''}
                  onClick={() => setNewTask({...newTask, type: 'renewable'})}
                >
                  Renewable
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select
                value={newTask.time}
                onValueChange={(value) => setNewTask({...newTask, time: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12:00 AM - 02:00 AM">12:00 AM - 02:00 AM</SelectItem>
                  <SelectItem value="02:00 AM - 04:00 AM">02:00 AM - 04:00 AM</SelectItem>
                  <SelectItem value="04:00 AM - 06:00 AM">04:00 AM - 06:00 AM</SelectItem>
                  <SelectItem value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</SelectItem>
                  <SelectItem value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</SelectItem>
                  <SelectItem value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</SelectItem>
                  <SelectItem value="08:00 PM - 10:00 PM">08:00 PM - 10:00 PM</SelectItem>
                  <SelectItem value="10:00 PM - 12:00 AM">10:00 PM - 12:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={newTask.recurring}
                onCheckedChange={(checked) => setNewTask({...newTask, recurring: checked})}
              />
              <Label htmlFor="recurring">Repeat weekly</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>Schedule Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTask && (
            <div className="border rounded-md p-3 mb-4">
              <p className="font-medium">{selectedTask.title}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {selectedTask.time} on {format(selectedTask.date, 'MMM d, yyyy')}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNavBar />
    </div>
  );
};

export default Schedule;
