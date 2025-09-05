import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MobileNavigationBar from '../../components/ui/MobileNavigationBar';
import FinancialHealthScore from './components/FinancialHealthScore';
import AccountBalanceCard from './components/AccountBalanceCard';
import ExpenseChart from './components/ExpenseChart';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import UpcomingBillsCard from './components/UpcomingBillsCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import AIInsightsPanel from './components/AIInsightsPanel';
import GoalProgressCard from './components/GoalProgressCard';
import RecentTransactionsCard from './components/RecentTransactionsCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState('default');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleVoiceCommand = () => {
    setIsVoiceListening(!isVoiceListening);
    // Mock voice recognition
    if (!isVoiceListening) {
      setTimeout(() => {
        setIsVoiceListening(false);
        // Simulate voice command processing
        console.log('Voice command processed');
      }, 3000);
    }
  };

  const handleLayoutChange = (layout) => {
    setDashboardLayout(layout);
  };

  const welcomeMessages = {
    en: "Welcome back! Here\'s your financial overview.",
    es: "¡Bienvenido de nuevo! Aquí está tu resumen financiero.",
    bn: "স্বাগতম! এখানে আপনার আর্থিক সংক্ষিপ্ত বিবরণ।"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Financial Dashboard
              </h1>
              <p className="text-muted-foreground">
                {welcomeMessages?.[currentLanguage] || welcomeMessages?.en}
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              {/* Voice Assistant */}
              <Button
                variant={isVoiceListening ? "default" : "outline"}
                size="sm"
                onClick={handleVoiceCommand}
                iconName="Mic"
                iconPosition="left"
                className={isVoiceListening ? "animate-pulse" : ""}
              >
                {isVoiceListening ? "Listening..." : "Voice Assistant"}
              </Button>

              {/* Layout Options */}
              <div className="hidden lg:flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={dashboardLayout === 'default' ? 'default' : 'ghost'}
                  size="xs"
                  onClick={() => handleLayoutChange('default')}
                  iconName="LayoutGrid"
                  iconSize={14}
                />
                <Button
                  variant={dashboardLayout === 'compact' ? 'default' : 'ghost'}
                  size="xs"
                  onClick={() => handleLayoutChange('compact')}
                  iconName="LayoutList"
                  iconSize={14}
                />
              </div>

              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={(e) => {
                  setCurrentLanguage(e?.target?.value);
                  localStorage.setItem('selectedLanguage', e?.target?.value);
                }}
                className="text-sm bg-card border border-border rounded px-3 py-2 text-foreground"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center space-x-2">
                <Icon name="Wallet" size={20} color="var(--color-primary)" />
                <div>
                  <div className="text-sm text-muted-foreground">Net Worth</div>
                  <div className="text-lg font-bold text-foreground">$83,361</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} color="var(--color-success)" />
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Income</div>
                  <div className="text-lg font-bold text-success">$5,200</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingDown" size={20} color="var(--color-destructive)" />
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Expenses</div>
                  <div className="text-lg font-bold text-destructive">$3,400</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center space-x-2">
                <Icon name="PiggyBank" size={20} color="var(--color-accent)" />
                <div>
                  <div className="text-sm text-muted-foreground">Savings Rate</div>
                  <div className="text-lg font-bold text-accent">34.6%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Widgets Grid */}
        <div className={`grid gap-6 ${
          dashboardLayout === 'compact' ?'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' :'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
        }`}>
          {/* Financial Health Score - Always prominent */}
          <div className="lg:col-span-1">
            <FinancialHealthScore />
          </div>

          {/* Account Balances */}
          <div className="lg:col-span-1">
            <AccountBalanceCard />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActionsPanel />
          </div>

          {/* Expense Chart - Larger on desktop */}
          <div className={dashboardLayout === 'compact' ? 'lg:col-span-2' : 'xl:col-span-2'}>
            <ExpenseChart />
          </div>

          {/* Income vs Expense Chart */}
          <div className={dashboardLayout === 'compact' ? 'lg:col-span-2' : 'xl:col-span-2'}>
            <IncomeVsExpenseChart />
          </div>

          {/* Upcoming Bills */}
          <div className="lg:col-span-1">
            <UpcomingBillsCard />
          </div>

          {/* AI Insights Panel */}
          <div className="lg:col-span-1">
            <AIInsightsPanel />
          </div>

          {/* Goal Progress */}
          <div className="lg:col-span-1">
            <GoalProgressCard />
          </div>

          {/* Recent Transactions - Full width on mobile, spans 2 on larger screens */}
          <div className={dashboardLayout === 'compact' ? 'lg:col-span-2' : 'xl:col-span-2'}>
            <RecentTransactionsCard />
          </div>
        </div>

        {/* Bottom Action Bar - Desktop Only */}
        <div className="hidden md:flex items-center justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/expense-tracking')}
            iconName="Receipt"
            iconPosition="left"
          >
            View All Expenses
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/budget-management')}
            iconName="PieChart"
            iconPosition="left"
          >
            Manage Budgets
          </Button>
          <Button
            variant="default"
            onClick={() => navigate('/account-settings')}
            iconName="Settings"
            iconPosition="left"
          >
            Account Settings
          </Button>
        </div>
      </main>
      {/* Mobile Navigation */}
      <MobileNavigationBar />
    </div>
  );
};

export default Dashboard;