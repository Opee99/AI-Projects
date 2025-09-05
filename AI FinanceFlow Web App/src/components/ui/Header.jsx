import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-card border-b border-border shadow-elevation-1 ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
              onClick={() => handleNavigation('/dashboard')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icon name="DollarSign" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-foreground font-sans">
                FinanceFlow Pro
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="transition-smooth"
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                  className="justify-start transition-smooth"
                >
                  {item?.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;