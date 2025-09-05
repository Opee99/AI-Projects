import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SpendingAnalysis = ({ transactions, categories }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const COLORS = ['#1E40AF', '#059669', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  const categoryData = useMemo(() => {
    const categoryTotals = {};
    transactions?.forEach(transaction => {
      const category = transaction?.category;
      categoryTotals[category] = (categoryTotals?.[category] || 0) + transaction?.amount;
    });

    return Object.entries(categoryTotals)?.map(([category, amount], index) => ({
      name: categories?.find(c => c?.value === category)?.label || category,
      value: amount,
      color: COLORS?.[index % COLORS?.length]
    }));
  }, [transactions, categories]);

  const monthlyData = useMemo(() => {
    const monthlyTotals = {};
    transactions?.forEach(transaction => {
      const month = new Date(transaction.date)?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyTotals[month] = (monthlyTotals?.[month] || 0) + transaction?.amount;
    });

    return Object.entries(monthlyTotals)?.map(([month, amount]) => ({
      month,
      amount
    }));
  }, [transactions]);

  const weeklyTrend = useMemo(() => {
    const weeklyTotals = {};
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date?.setDate(date?.getDate() - i);
      return date?.toISOString()?.split('T')?.[0];
    })?.reverse();

    last7Days?.forEach(date => {
      const dayTransactions = transactions?.filter(t => t?.date === date);
      const total = dayTransactions?.reduce((sum, t) => sum + t?.amount, 0);
      weeklyTotals[date] = total;
    });

    return last7Days?.map(date => ({
      date: new Date(date)?.toLocaleDateString('en-US', { weekday: 'short' }),
      amount: weeklyTotals?.[date] || 0
    }));
  }, [transactions]);

  const totalSpent = transactions?.reduce((sum, transaction) => sum + transaction?.amount, 0);
  const averageTransaction = totalSpent / (transactions?.length || 1);
  const highestCategory = categoryData?.reduce((max, category) => 
    category?.value > (max?.value || 0) ? category : max, null
  );

  const aiInsights = [
    {
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'High Dining Expenses',
      message: `You've spent 23% more on dining this month compared to last month. Consider meal planning to reduce costs.`
    },
    {
      type: 'success',icon: 'TrendingDown',title: 'Transportation Savings',
      message: `Great job! Your transportation costs are down 15% this month. Keep up the good work.`
    },
    {
      type: 'info',icon: 'Lightbulb',title: 'Budget Optimization',
      message: `Based on your spending patterns, you could save $120/month by switching to a different payment method for utilities.`
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'categories', label: 'Categories', icon: 'PieChart' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'insights', label: 'AI Insights', icon: 'Brain' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
          Spending Analysis
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedPeriod === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('week')}
          >
            Week
          </Button>
          <Button
            variant={selectedPeriod === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('month')}
          >
            Month
          </Button>
          <Button
            variant={selectedPeriod === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('year')}
          >
            Year
          </Button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab?.id)}
            iconName={tab?.icon}
            iconPosition="left"
            iconSize={16}
            className="mb-2"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
                </div>
                <Icon name="DollarSign" size={24} className="text-primary" />
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Transaction</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(averageTransaction)}</p>
                </div>
                <Icon name="Calculator" size={24} className="text-accent" />
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Top Category</p>
                  <p className="text-2xl font-bold text-foreground">{highestCategory?.name || 'N/A'}</p>
                </div>
                <Icon name="TrendingUp" size={24} className="text-warning" />
              </div>
            </div>
          </div>

          <div className="h-64">
            <h3 className="text-lg font-medium text-foreground mb-4">Monthly Spending</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                />
                <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <h3 className="text-lg font-medium text-foreground mb-4">Spending by Category</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  >
                    {categoryData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-foreground">Category Breakdown</h3>
              {categoryData?.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category?.color }}
                    />
                    <span className="font-medium text-foreground">{category?.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(category?.value)}</p>
                    <p className="text-sm text-muted-foreground">
                      {((category?.value / totalSpent) * 100)?.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="h-64">
            <h3 className="text-lg font-medium text-foreground mb-4">7-Day Spending Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Spending Velocity</h4>
              <p className="text-2xl font-bold text-primary">{formatCurrency(totalSpent / 30)}</p>
              <p className="text-sm text-muted-foreground">Average daily spending</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Transaction Frequency</h4>
              <p className="text-2xl font-bold text-accent">{(transactions?.length / 30)?.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Transactions per day</p>
            </div>
          </div>
        </div>
      )}
      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground mb-4">AI-Powered Financial Insights</h3>
          {aiInsights?.map((insight, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  insight?.type === 'warning' ? 'bg-warning/10 text-warning' :
                  insight?.type === 'success'? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                }`}>
                  <Icon name={insight?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{insight?.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight?.message}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="font-medium text-primary">Personalized Recommendation</span>
            </div>
            <p className="text-sm text-foreground">
              Based on your spending patterns, we recommend setting up automatic savings of $200/month. 
              This would help you reach your financial goals 18% faster while maintaining your current lifestyle.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingAnalysis;