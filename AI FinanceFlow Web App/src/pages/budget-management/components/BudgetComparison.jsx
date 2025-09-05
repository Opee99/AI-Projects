import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BudgetComparison = ({ budgets }) => {
  const [comparisonPeriod, setComparisonPeriod] = useState('month');
  const [sortBy, setSortBy] = useState('variance');

  const periodOptions = [
    { value: 'week', label: 'This Week vs Last Week' },
    { value: 'month', label: 'This Month vs Last Month' },
    { value: 'quarter', label: 'This Quarter vs Last Quarter' },
    { value: 'year', label: 'This Year vs Last Year' }
  ];

  const sortOptions = [
    { value: 'variance', label: 'By Variance' },
    { value: 'percentage', label: 'By Percentage' },
    { value: 'amount', label: 'By Amount' },
    { value: 'category', label: 'By Category' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const generateComparisonData = () => {
    return budgets?.map(budget => {
      // Mock previous period data
      const previousSpent = budget?.spent * (0.7 + Math.random() * 0.6);
      const variance = budget?.spent - previousSpent;
      const percentageChange = previousSpent > 0 ? (variance / previousSpent) * 100 : 0;
      const budgetUtilization = (budget?.spent / budget?.allocated) * 100;
      const previousUtilization = (previousSpent / budget?.allocated) * 100;

      return {
        ...budget,
        previousSpent,
        variance,
        percentageChange,
        budgetUtilization,
        previousUtilization,
        trend: variance > 0 ? 'up' : variance < 0 ? 'down' : 'stable'
      };
    });
  };

  const sortComparisonData = (data) => {
    switch (sortBy) {
      case 'variance':
        return [...data]?.sort((a, b) => Math.abs(b?.variance) - Math.abs(a?.variance));
      case 'percentage':
        return [...data]?.sort((a, b) => Math.abs(b?.percentageChange) - Math.abs(a?.percentageChange));
      case 'amount':
        return [...data]?.sort((a, b) => b?.spent - a?.spent);
      case 'category':
        return [...data]?.sort((a, b) => a?.category?.localeCompare(b?.category));
      default:
        return data;
    }
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-error';
    if (variance < 0) return 'text-success';
    return 'text-muted-foreground';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const comparisonData = sortComparisonData(generateComparisonData());

  const totalCurrentSpent = comparisonData?.reduce((sum, item) => sum + item?.spent, 0);
  const totalPreviousSpent = comparisonData?.reduce((sum, item) => sum + item?.previousSpent, 0);
  const totalVariance = totalCurrentSpent - totalPreviousSpent;
  const totalPercentageChange = totalPreviousSpent > 0 ? (totalVariance / totalPreviousSpent) * 100 : 0;

  if (!budgets || budgets?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="BarChart3" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Comparison Data</h3>
        <p className="text-muted-foreground">Create budgets and track spending to see comparisons.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Budget vs Actual Comparison</h2>
          <p className="text-sm text-muted-foreground">
            Compare your spending across different time periods
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={periodOptions}
            value={comparisonPeriod}
            onChange={setComparisonPeriod}
            className="w-48"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-32"
          />
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Period</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(totalCurrentSpent)}</p>
            </div>
            <Icon name="Calendar" size={24} color="var(--color-primary)" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Previous Period</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(totalPreviousSpent)}</p>
            </div>
            <Icon name="History" size={24} color="var(--color-muted-foreground)" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Variance</p>
              <p className={`text-xl font-bold ${getVarianceColor(totalVariance)}`}>
                {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
              </p>
              <p className={`text-sm ${getVarianceColor(totalVariance)}`}>
                {totalPercentageChange >= 0 ? '+' : ''}{totalPercentageChange?.toFixed(1)}%
              </p>
            </div>
            <Icon 
              name={getTrendIcon(totalVariance > 0 ? 'up' : totalVariance < 0 ? 'down' : 'stable')} 
              size={24} 
              color={totalVariance > 0 ? 'var(--color-error)' : totalVariance < 0 ? 'var(--color-success)' : 'var(--color-muted-foreground)'} 
            />
          </div>
        </div>
      </div>
      {/* Detailed Comparison */}
      <div className="space-y-4">
        {comparisonData?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item?.color || 'bg-primary/10'}`}>
                  <Icon 
                    name={item?.icon || 'Wallet'} 
                    size={20} 
                    color={item?.iconColor || 'var(--color-primary)'} 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item?.category}</h3>
                  <p className="text-sm text-muted-foreground">{item?.period}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Icon 
                  name={getTrendIcon(item?.trend)} 
                  size={20} 
                  color={item?.trend === 'up' ? 'var(--color-error)' : item?.trend === 'down' ? 'var(--color-success)' : 'var(--color-muted-foreground)'} 
                />
                <div className="text-right">
                  <p className={`font-semibold ${getVarianceColor(item?.variance)}`}>
                    {item?.variance >= 0 ? '+' : ''}{formatCurrency(item?.variance)}
                  </p>
                  <p className={`text-sm ${getVarianceColor(item?.variance)}`}>
                    {item?.percentageChange >= 0 ? '+' : ''}{item?.percentageChange?.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Current</p>
                <p className="font-medium text-foreground">{formatCurrency(item?.spent)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Previous</p>
                <p className="font-medium text-foreground">{formatCurrency(item?.previousSpent)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-medium text-foreground">{formatCurrency(item?.allocated)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Utilization</p>
                <p className="font-medium text-foreground">
                  {item?.budgetUtilization?.toFixed(1)}%
                  <span className={`ml-1 text-xs ${getVarianceColor(item?.budgetUtilization - item?.previousUtilization)}`}>
                    ({item?.budgetUtilization - item?.previousUtilization >= 0 ? '+' : ''}{(item?.budgetUtilization - item?.previousUtilization)?.toFixed(1)}%)
                  </span>
                </p>
              </div>
            </div>

            {/* Progress bars */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Current Period Progress</span>
                <span>{item?.budgetUtilization?.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    item?.budgetUtilization >= 90 ? 'bg-error' : 
                    item?.budgetUtilization >= 75 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${Math.min(item?.budgetUtilization, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Data refreshes automatically with new transactions</span>
        </div>
        <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default BudgetComparison;