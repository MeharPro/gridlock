
import React from 'react';
import { Home, PieChart, Calendar, Settings, BatteryCharging } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 shadow-lg z-10">
      <Link to="/" className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
        <Home size={20} />
        <span className="nav-item-text">Home</span>
      </Link>
      <Link to="/analytics" className={`nav-item ${currentPath === '/analytics' ? 'active' : ''}`}>
        <PieChart size={20} />
        <span className="nav-item-text">Analytics</span>
      </Link>
      <Link to="/microgrid" className={`nav-item ${currentPath === '/microgrid' ? 'active' : ''}`}>
        <BatteryCharging size={20} />
        <span className="nav-item-text">Grid</span>
      </Link>
      <Link to="/schedule" className={`nav-item ${currentPath === '/schedule' ? 'active' : ''}`}>
        <Calendar size={20} />
        <span className="nav-item-text">Schedule</span>
      </Link>
      <Link to="/settings" className={`nav-item ${currentPath === '/settings' ? 'active' : ''}`}>
        <Settings size={20} />
        <span className="nav-item-text">Settings</span>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
