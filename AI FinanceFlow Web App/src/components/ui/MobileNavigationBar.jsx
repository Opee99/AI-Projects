import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileNavigationBar = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Expenses',
      path: '/expense-tracking',
      icon: 'Receipt'
    },
    {
      label: 'Budgets',
      path: '/budget-management',
      icon: 'PiggyBank'
    },
    {
      label: 'Settings',
      path: '/account-settings',
      icon: 'Settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elevation-3 md:hidden ${className}`}>
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems?.map((item) => {
          const isActive = isActivePath(item?.path);
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-1 transition-smooth ${
                isActive 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`p-1 rounded-lg transition-smooth ${
                isActive ? 'bg-primary/10' : 'hover:bg-muted'
              }`}>
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActive ? 'var(--color-primary)' : 'currentColor'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={`text-xs mt-1 font-medium truncate ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item?.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigationBar;