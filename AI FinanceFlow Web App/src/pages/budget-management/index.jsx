import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MobileNavigationBar from '../../components/ui/MobileNavigationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import BudgetCard from './components/BudgetCard';
import BudgetCreationForm from './components/BudgetCreationForm';
import BudgetChart from './components/BudgetChart';
import AIBudgetSuggestions from './components/AIBudgetSuggestions';
import BudgetComparison from './components/BudgetComparison';
import BulkBudgetTools from './components/BulkBudgetTools';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('category');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock budget data
  const mockBudgets = [
    {
      id: 1,
      category: "Food & Dining",
      allocated: 800,
      spent: 650,
      currency: "USD",
      period: "Monthly",
      icon: "UtensilsCrossed",
      iconColor: "var(--color-warning)",
      color: "bg-warning/10",
      subcategories: ["Groceries", "Restaurants", "Takeout"],
      alertThreshold: 80,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-04T15:15:16.052Z"
    },
    {
      id: 2,
      category: "Transportation",
      allocated: 400,
      spent: 320,
      currency: "USD",
      period: "Monthly",
      icon: "Car",
      iconColor: "var(--color-primary)",
      color: "bg-primary/10",
      subcategories: ["Gas", "Public Transit", "Parking"],
      alertThreshold: 85,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-04T15:15:16.052Z"
    },
    {
      id: 3,
      category: "Shopping",
      allocated: 600,
      spent: 580,
      currency: "USD",
      period: "Monthly",
      icon: "ShoppingBag",
      iconColor: "var(--color-error)",
      color: "bg-error/10",
      subcategories: ["Clothing", "Electronics", "Home Items"],
      alertThreshold: 75,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-04T15:15:16.052Z"
    },
    {
      id: 4,
      category: "Entertainment",
      allocated: 300,
      spent: 180,
      currency: "USD",
      period: "Monthly",
      icon: "Film",
      iconColor: "var(--color-accent)",
      color: "bg-accent/10",
      subcategories: ["Movies", "Games", "Subscriptions"],
      alertThreshold: 80,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-04T15:15:16.052Z"
    },
    {
      id: 5,
      category: "Bills & Utilities",
      allocated: 500,
      spent: 485,
      currency: "USD",
      period: "Monthly",
      icon: "Receipt",
      iconColor: "var(--color-secondary)",
      color: "bg-secondary/10",
      subcategories: ["Electricity", "Water", "Internet", "Phone"],
      alertThreshold: 90,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-04T15:15:16.052Z"
    },
    {
      id: 6,
      category: "Healthcare",
      allocated: 250,
      spent: 120,
      currency: "USD",
      period: "Monthly",
      icon: "Heart",
      iconColor: "var(--color-success)",
      color: "bg-success/10",
      subcategories: ["Insurance", "Medications", "Doctor Visits"],
      alertThreshold: 70,
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-04T15:15:16.052Z"
    }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('financeflow_language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Initialize with mock data
    setBudgets(mockBudgets);
  }, []);

  const viewOptions = [
    { value: 'overview', label: 'Overview', icon: 'LayoutGrid' },
    { value: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { value: 'ai_suggestions', label: 'AI Suggestions', icon: 'Brain' },
    { value: 'comparison', label: 'Comparison', icon: 'GitCompare' },
    { value: 'bulk_tools', label: 'Bulk Tools', icon: 'Settings' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Food & Dining', label: 'Food & Dining' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Bills & Utilities', label: 'Bills & Utilities' },
    { value: 'Healthcare', label: 'Healthcare' }
  ];

  const sortOptions = [
    { value: 'category', label: 'Category' },
    { value: 'allocated', label: 'Budget Amount' },
    { value: 'spent', label: 'Amount Spent' },
    { value: 'remaining', label: 'Remaining' },
    { value: 'percentage', label: 'Usage %' }
  ];

  const handleCreateBudget = (budgetData) => {
    if (editingBudget) {
      setBudgets(prev => prev?.map(budget => 
        budget?.id === editingBudget?.id ? budgetData : budget
      ));
      setEditingBudget(null);
    } else {
      setBudgets(prev => [...prev, budgetData]);
    }
    setShowCreateForm(false);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setShowCreateForm(true);
  };

  const handleDeleteBudget = (budgetId) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setBudgets(prev => prev?.filter(budget => budget?.id !== budgetId));
    }
  };

  const handleViewDetails = (budget) => {
    // Navigate to detailed budget view (mock implementation)
    console.log('View details for budget:', budget?.category);
  };

  const handleAdoptAISuggestion = (budgetData, suggestion) => {
    setBudgets(prev => [...prev, budgetData]);
    console.log('Adopted AI suggestion:', suggestion?.title);
  };

  const handleBulkUpdate = (updatedBudgets) => {
    if (Array.isArray(updatedBudgets)) {
      setBudgets(updatedBudgets);
    } else {
      setBudgets(prev => prev?.map(budget => {
        const updated = updatedBudgets?.find(u => u?.id === budget?.id);
        return updated || budget;
      }));
    }
  };

  const handleBulkDelete = (budgetIds) => {
    setBudgets(prev => prev?.filter(budget => !budgetIds?.includes(budget?.id)));
  };

  const getFilteredAndSortedBudgets = () => {
    let filtered = budgets;
    
    if (filterCategory !== 'all') {
      filtered = filtered?.filter(budget => budget?.category === filterCategory);
    }

    return filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'allocated':
          return b?.allocated - a?.allocated;
        case 'spent':
          return b?.spent - a?.spent;
        case 'remaining':
          return (b?.allocated - b?.spent) - (a?.allocated - a?.spent);
        case 'percentage':
          return (b?.spent / b?.allocated) - (a?.spent / a?.allocated);
        case 'category':
        default:
          return a?.category?.localeCompare(b?.category);
      }
    });
  };

  const getTotalStats = () => {
    const totalAllocated = budgets?.reduce((sum, budget) => sum + budget?.allocated, 0);
    const totalSpent = budgets?.reduce((sum, budget) => sum + budget?.spent, 0);
    const totalRemaining = totalAllocated - totalSpent;
    const averageUtilization = budgets?.length > 0 ? (totalSpent / totalAllocated) * 100 : 0;

    return { totalAllocated, totalSpent, totalRemaining, averageUtilization };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const stats = getTotalStats();
  const filteredBudgets = getFilteredAndSortedBudgets();

  const renderMainContent = () => {
    switch (activeView) {
      case 'analytics':
        return <BudgetChart budgets={budgets} />;
      case 'ai_suggestions':
        return <AIBudgetSuggestions onAdoptSuggestion={handleAdoptAISuggestion} currentBudgets={budgets} />;
      case 'comparison':
        return <BudgetComparison budgets={budgets} />;
      case 'bulk_tools':
        return <BulkBudgetTools budgets={budgets} onBulkUpdate={handleBulkUpdate} onBulkDelete={handleBulkDelete} />;
      case 'overview':
      default:
        return (
          <div className="space-y-6">
            {/* Budget Creation Form */}
            {showCreateForm && (
              <BudgetCreationForm
                onCreateBudget={handleCreateBudget}
                onCancel={() => {
                  setShowCreateForm(false);
                  setEditingBudget(null);
                }}
                editingBudget={editingBudget}
              />
            )}
            {/* Budget Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBudgets?.map((budget) => (
                <BudgetCard
                  key={budget?.id}
                  budget={budget}
                  onEdit={handleEditBudget}
                  onDelete={handleDeleteBudget}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            {filteredBudgets?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="PiggyBank" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {filterCategory === 'all' ? 'No Budgets Created' : 'No Budgets in This Category'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {filterCategory === 'all' ?'Start managing your finances by creating your first budget' :'Create a budget for this category to start tracking your spending'
                  }
                </p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Create Your First Budget
                </Button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Budget Management</h1>
              <p className="text-muted-foreground">
                Create, monitor, and optimize your budgets with AI-powered insights
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {activeView === 'overview' && (
                <Button
                  onClick={() => setShowCreateForm(true)}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  className="whitespace-nowrap"
                >
                  Create Budget
                </Button>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Allocated</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(stats?.totalAllocated)}</p>
                </div>
                <Icon name="Target" size={24} color="var(--color-primary)" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(stats?.totalSpent)}</p>
                </div>
                <Icon name="CreditCard" size={24} color="var(--color-primary)" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-xl font-bold text-success">{formatCurrency(stats?.totalRemaining)}</p>
                </div>
                <Icon name="PiggyBank" size={24} color="var(--color-success)" />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Usage</p>
                  <p className="text-xl font-bold text-foreground">{stats?.averageUtilization?.toFixed(1)}%</p>
                </div>
                <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
              </div>
            </div>
          </div>

          {/* View Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center bg-muted rounded-lg p-1 overflow-x-auto">
              {viewOptions?.map((view) => (
                <Button
                  key={view?.value}
                  variant={activeView === view?.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView(view?.value)}
                  iconName={view?.icon}
                  iconSize={16}
                  className="transition-smooth whitespace-nowrap"
                >
                  <span className="hidden sm:inline ml-2">{view?.label}</span>
                </Button>
              ))}
            </div>

            {activeView === 'overview' && (
              <div className="flex items-center space-x-3">
                <Select
                  options={categoryOptions}
                  value={filterCategory}
                  onChange={setFilterCategory}
                  className="w-40"
                />
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-32"
                />
              </div>
            )}
          </div>

          {/* Main Content */}
          {renderMainContent()}
        </div>
      </main>
      <MobileNavigationBar />
    </div>
  );
};

export default BudgetManagement;