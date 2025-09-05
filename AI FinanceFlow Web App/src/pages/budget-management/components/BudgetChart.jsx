import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BudgetChart = ({ budgets }) => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('current');

  const chartTypeOptions = [
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'pie', label: 'Pie Chart', icon: 'PieChart' },
    { value: 'line', label: 'Trend Line', icon: 'TrendingUp' }
  ];

  const timeRangeOptions = [
    { value: 'current', label: 'Current Period' },
    { value: 'last3', label: 'Last 3 Months' },
    { value: 'last6', label: 'Last 6 Months' },
    { value: 'yearly', label: 'This Year' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const prepareBarChartData = () => {
    return budgets?.map(budget => ({
      category: budget?.category?.length > 12 ? budget?.category?.substring(0, 12) + '...' : budget?.category,
      allocated: budget?.allocated,
      spent: budget?.spent,
      remaining: budget?.allocated - budget?.spent,
      percentage: (budget?.spent / budget?.allocated) * 100
    }));
  };

  const preparePieChartData = () => {
    return budgets?.map(budget => ({
      name: budget?.category,
      value: budget?.spent,
      allocated: budget?.allocated,
      color: budget?.spent / budget?.allocated > 0.9 ? '#EF4444' : 
             budget?.spent / budget?.allocated > 0.75 ? '#F59E0B' : '#10B981'
    }));
  };

  const prepareTrendData = () => {
    // Mock trend data for demonstration
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months?.map((month, index) => ({
      month,
      totalAllocated: budgets?.reduce((sum, budget) => sum + budget?.allocated, 0) * (0.8 + Math.random() * 0.4),
      totalSpent: budgets?.reduce((sum, budget) => sum + budget?.spent, 0) * (0.7 + Math.random() * 0.6)
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {formatCurrency(entry?.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={prepareBarChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="category" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="allocated" fill="var(--color-muted)" name="Allocated" />
              <Bar dataKey="spent" fill="var(--color-primary)" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={preparePieChartData()}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100)?.toFixed(0)}%`}
              >
                {preparePieChartData()?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Spent']}
                content={<CustomTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={prepareTrendData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="totalAllocated" 
                stroke="var(--color-muted-foreground)" 
                strokeWidth={2}
                name="Allocated"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="totalSpent" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                name="Spent"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  if (!budgets || budgets?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="BarChart3" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Budget Data</h3>
        <p className="text-muted-foreground">Create your first budget to see analytics and charts.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Budget Analytics</h2>
          <p className="text-sm text-muted-foreground">Visual analysis of your budget performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          
          <div className="flex items-center bg-muted rounded-lg p-1">
            {chartTypeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={chartType === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType(option?.value)}
                iconName={option?.icon}
                iconSize={16}
                className="transition-smooth"
              >
                <span className="hidden sm:inline ml-2">{option?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        {renderChart()}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(budgets?.reduce((sum, budget) => sum + budget?.allocated, 0))}
          </p>
          <p className="text-sm text-muted-foreground">Total Allocated</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(budgets?.reduce((sum, budget) => sum + budget?.spent, 0))}
          </p>
          <p className="text-sm text-muted-foreground">Total Spent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {formatCurrency(budgets?.reduce((sum, budget) => sum + (budget?.allocated - budget?.spent), 0))}
          </p>
          <p className="text-sm text-muted-foreground">Total Remaining</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {budgets?.length}
          </p>
          <p className="text-sm text-muted-foreground">Active Budgets</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;