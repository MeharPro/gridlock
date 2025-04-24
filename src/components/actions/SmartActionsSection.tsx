
import React, { useMemo } from 'react';
import ActionCarousel from './ActionCarousel';
import { ActionProps } from './ActionCard';
import { toast } from "sonner";

interface SmartActionsSectionProps {
  isLoading?: boolean;
  userPreferences?: any;
}

const SmartActionsSection = ({ isLoading = false, userPreferences = null }: SmartActionsSectionProps) => {
  // Generate actions based on user preferences
  const actions = useMemo(() => {
    let actionsList: ActionProps[] = [
      {
        id: '1',
        icon: 'washer',
        description: 'Run Washing Machine',
        timeRange: 'Today 2 AM - 5 AM',
        savingsText: 'Save ~$0.75 CAD',
        onRemind: () => toast.success('Reminder set for washing machine'),
        onSchedule: () => toast.success('Washing machine scheduled'),
      },
      {
        id: '2',
        icon: 'fan',
        description: 'Turn Off HVAC System',
        timeRange: 'Today 1 PM - 3 PM',
        savingsText: 'Save ~$1.25 CAD',
        onRemind: () => toast.success('Reminder set for HVAC system'),
        onSchedule: () => toast.success('HVAC system scheduled'),
      },
      {
        id: '3',
        icon: 'lightbulb',
        description: 'Dim Living Room Lights',
        timeRange: 'Today 6 PM - 9 PM',
        savingsText: 'Save ~$0.50 CAD',
        onRemind: () => toast.success('Reminder set for lights'),
        onSchedule: () => toast.success('Lights scheduled'),
      }
    ];
    
    // If user has preferences, customize the actions
    if (userPreferences) {
      // If user has solar panels, add solar optimization actions
      if (userPreferences.renewables?.includes('solar')) {
        actionsList.push({
          id: '4',
          icon: 'energy',
          description: 'Optimize Solar Generation',
          timeRange: 'Today 10 AM - 2 PM',
          savingsText: 'Maximize output',
          onRemind: () => toast.success('Reminder set for solar optimization'),
          onSchedule: () => toast.success('Solar optimization scheduled'),
        });
      }
      
      // If user has home battery, add charging action
      if (userPreferences.renewables?.includes('home_battery')) {
        actionsList.push({
          id: '5',
          icon: 'battery',
          description: 'Charge Home Battery',
          timeRange: 'Today 2 AM - 5 AM',
          savingsText: 'Save ~$1.50 CAD',
          onRemind: () => toast.success('Reminder set for battery charging'),
          onSchedule: () => toast.success('Battery charging scheduled'),
        });
      }
      
      // If user has EV charger, add EV charging action
      if (userPreferences.appliances?.includes('ev_charger')) {
        actionsList.push({
          id: '6',
          icon: 'car',
          description: 'Charge Electric Vehicle',
          timeRange: 'Tonight 12 AM - 3 AM',
          savingsText: 'Save ~$2.25 CAD',
          onRemind: () => toast.success('Reminder set for EV charging'),
          onSchedule: () => toast.success('EV charging scheduled'),
        });
      }
    }
    
    return actionsList;
  }, [userPreferences]);

  return (
    <section className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-h2 font-semibold">Smart Actions</h2>
        <button className="text-primary text-sm font-medium">View All</button>
      </div>
      <ActionCarousel actions={actions} isLoading={isLoading} />
    </section>
  );
};

export default SmartActionsSection;
