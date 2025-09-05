import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigationBar from '../../components/ui/MobileNavigationBar';
import TransactionForm from './components/TransactionForm';
import TransactionFilters from './components/TransactionFilters';
import TransactionList from './components/TransactionList';
import SpendingAnalysis from './components/SpendingAnalysis';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExpenseTracking = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    paymentMethod: '',
    dateRange: { startDate: '', endDate: '' },
    amountRange: { min: '', max: '' }
  });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'BDT', label: 'Bangladeshi Taka (৳)' },
    { value: 'INR', label: 'Indian Rupee (₹)' }
  ];

  const categories = [
    { value: 'food-dining', label: 'Food & Dining' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'education', label: 'Education' },
    { value: 'travel', label: 'Travel' },
    { value: 'income', label: 'Income' },
    { value: 'other', label: 'Other' }
  ];

  const paymentMethods = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'venmo', label: 'Venmo' }
  ];

  const mockTransactions = [
    {
      id: 1,
      date: '2025-01-04',
      description: 'Starbucks Coffee',
      amount: 4.50,
      category: 'food-dining',
      paymentMethod: 'credit-card',
      currency: 'USD',
      timestamp: '2025-01-04T08:30:00Z'
    },
    {
      id: 2,
      date: '2025-01-03',
      description: 'Uber Ride',
      amount: 12.75,
      category: 'transportation',
      paymentMethod: 'debit-card',
      currency: 'USD',
      timestamp: '2025-01-03T18:45:00Z'
    },
    {
      id: 3,
      date: '2025-01-03',
      description: 'Amazon Purchase',
      amount: 89.99,
      category: 'shopping',
      paymentMethod: 'credit-card',
      currency: 'USD',
      timestamp: '2025-01-03T14:20:00Z'
    },
    {
      id: 4,
      date: '2025-01-02',
      description: 'Netflix Subscription',
      amount: 15.99,
      category: 'entertainment',
      paymentMethod: 'credit-card',
      currency: 'USD',
      timestamp: '2025-01-02T12:00:00Z'
    },
    {
      id: 5,
      date: '2025-01-02',
      description: 'Grocery Store',
      amount: 67.43,
      category: 'food-dining',
      paymentMethod: 'debit-card',
      currency: 'USD',
      timestamp: '2025-01-02T16:30:00Z'
    },
    {
      id: 6,
      date: '2025-01-01',
      description: 'Gas Station',
      amount: 45.20,
      category: 'transportation',
      paymentMethod: 'credit-card',
      currency: 'USD',
      timestamp: '2025-01-01T10:15:00Z'
    },
    {
      id: 7,
      date: '2024-12-31',
      description: 'Salary Deposit',
      amount: 3500.00,
      category: 'income',
      paymentMethod: 'bank-transfer',
      currency: 'USD',
      timestamp: '2024-12-31T09:00:00Z'
    },
    {
      id: 8,
      date: '2024-12-30',
      description: 'Electric Bill',
      amount: 89.50,
      category: 'utilities',
      paymentMethod: 'bank-transfer',
      currency: 'USD',
      timestamp: '2024-12-30T11:30:00Z'
    }
  ];

  // Initialize transactions and language
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(mockTransactions);
      const savedLanguage = localStorage.getItem('financeflow_language') || 'en';
      setCurrentLanguage(savedLanguage);
      setIsLoading(false);
    };
    
    initializeData();
  }, []);

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    return transactions?.filter(transaction => {
      // Search filter
      if (filters?.search && !transaction?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters?.category && transaction?.category !== filters?.category) {
        return false;
      }

      // Payment method filter
      if (filters?.paymentMethod && transaction?.paymentMethod !== filters?.paymentMethod) {
        return false;
      }

      // Date range filter
      if (filters?.dateRange?.startDate && transaction?.date < filters?.dateRange?.startDate) {
        return false;
      }
      if (filters?.dateRange?.endDate && transaction?.date > filters?.dateRange?.endDate) {
        return false;
      }

      // Amount range filter
      if (filters?.amountRange?.min && transaction?.amount < parseFloat(filters?.amountRange?.min)) {
        return false;
      }
      if (filters?.amountRange?.max && transaction?.amount > parseFloat(filters?.amountRange?.max)) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleEditTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev?.map(transaction => 
        transaction?.id === updatedTransaction?.id ? updatedTransaction : transaction
      )
    );
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions(prev => prev?.filter(transaction => transaction?.id !== transactionId));
  };

  const handleBulkImport = async (file) => {
    console.log('Importing file:', file?.name);
    
    // Enhanced mock import with better simulation
    const mockImportedTransactions = [
      {
        id: Date.now(),
        date: '2025-01-04',
        description: `Imported: ${file?.name} - Transaction 1`,
        amount: 25.00,
        category: 'other',
        paymentMethod: 'credit-card',
        currency: 'USD',
        timestamp: new Date()?.toISOString()
      },
      {
        id: Date.now() + 1,
        date: '2025-01-04',
        description: `Imported: ${file?.name} - Transaction 2`,
        amount: 50.00,
        category: 'shopping',
        paymentMethod: 'debit-card',
        currency: 'USD',
        timestamp: new Date()?.toISOString()
      }
    ];
    
    setTransactions(prev => [...mockImportedTransactions, ...prev]);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredTransactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `financeflow_transactions_${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  const totalIncome = filteredTransactions?.filter(t => t?.category === 'income')?.reduce((sum, t) => sum + t?.amount, 0);
  const totalExpenses = filteredTransactions?.filter(t => t?.category !== 'income')?.reduce((sum, t) => sum + t?.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your transactions...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        {/* Enhanced Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl shadow-elevation-2">
              <Icon name="Receipt" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Expense Tracking
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your expenses with AI-powered insights and comprehensive analysis
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-6 sm:mt-0">
            <Button
              variant={showAnalysis ? "default" : "outline"}
              onClick={() => setShowAnalysis(!showAnalysis)}
              iconName="BarChart3"
              iconPosition="left"
              className="transition-medium hover:shadow-elevation-1"
            >
              {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl border border-border shadow-elevation-2 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold text-foreground">{filteredTransactions?.length}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Icon name="Receipt" size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl border border-border shadow-elevation-2 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-success/5" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-success">${totalIncome?.toFixed(2)}</p>
                </div>
                <div className="bg-success/10 p-3 rounded-xl">
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl border border-border shadow-elevation-2 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-destructive/5" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-destructive">${totalExpenses?.toFixed(2)}</p>
                </div>
                <div className="bg-destructive/10 p-3 rounded-xl">
                  <Icon name="TrendingDown" size={24} className="text-destructive" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl border border-border shadow-elevation-2 p-6 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${netBalance >= 0 ? 'from-success/10 to-success/5' : 'from-warning/10 to-warning/5'}`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Balance</p>
                  <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-success' : 'text-warning'}`}>
                    ${Math.abs(netBalance)?.toFixed(2)}
                  </p>
                </div>
                <div className={`${netBalance >= 0 ? 'bg-success/10' : 'bg-warning/10'} p-3 rounded-xl`}>
                  <Icon name={netBalance >= 0 ? "PiggyBank" : "AlertTriangle"} size={24} 
                    className={netBalance >= 0 ? "text-success" : "text-warning"} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className={`space-y-6 ${showAnalysis ? 'xl:col-span-2' : 'xl:col-span-3'}`}>
            {/* Transaction Form */}
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              currencies={currencies}
              categories={categories}
              paymentMethods={paymentMethods}
            />

            {/* Transaction Filters */}
            <TransactionFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              paymentMethods={paymentMethods}
              onBulkImport={handleBulkImport}
              onExportData={handleExportData}
            />

            {/* Transaction List */}
            <TransactionList
              transactions={filteredTransactions}
              categories={categories}
              paymentMethods={paymentMethods}
              currencies={currencies}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>

          {/* Spending Analysis Sidebar */}
          <AnimatePresence>
            {showAnalysis && (
              <motion.div 
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.4 }}
                className="xl:col-span-1"
              >
                <SpendingAnalysis
                  transactions={filteredTransactions}
                  categories={categories}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <MobileNavigationBar />
    </div>
  );
};

export default ExpenseTracking;