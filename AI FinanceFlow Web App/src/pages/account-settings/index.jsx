import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import MobileNavigationBar from '../../components/ui/MobileNavigationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import PreferencesSection from './components/PreferencesSection';
import IntegrationsSection from './components/IntegrationsSection';
import PrivacySection from './components/PrivacySection';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      component: ProfileSection
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecuritySection
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      component: PreferencesSection
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Link',
      component: IntegrationsSection
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Lock',
      component: PrivacySection
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component || ProfileSection;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
                <p className="text-muted-foreground">
                  Manage your profile, security, and preferences
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <Button
                      key={tab?.id}
                      variant={activeTab === tab?.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab?.id)}
                      iconName={tab?.icon}
                      iconPosition="left"
                      iconSize={18}
                      fullWidth
                      className="justify-start transition-smooth"
                    >
                      {tab?.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-6">
              <div className="bg-card rounded-lg border border-border p-2 shadow-elevation-1">
                <div className="flex space-x-1 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <Button
                      key={tab?.id}
                      variant={activeTab === tab?.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab?.id)}
                      iconName={tab?.icon}
                      iconPosition="left"
                      iconSize={16}
                      className="flex-shrink-0 transition-smooth"
                    >
                      {tab?.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Active Tab Indicator for Mobile */}
                <div className="lg:hidden">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon 
                        name={tabs?.find(tab => tab?.id === activeTab)?.icon || 'User'} 
                        size={18} 
                        color="var(--color-primary)" 
                      />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {tabs?.find(tab => tab?.id === activeTab)?.label || 'Profile'}
                    </h2>
                  </div>
                </div>

                {/* Dynamic Content */}
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNavigationBar />
    </div>
  );
};

export default AccountSettings;