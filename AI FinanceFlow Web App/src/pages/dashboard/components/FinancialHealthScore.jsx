import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialHealthScore = ({ className = '' }) => {
  const healthScore = 78;
  const trend = 'up';
  const trendPercentage = 5.2;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Financial Health Score</h3>
        <div className="flex items-center space-x-1">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            color={trend === 'up' ? 'var(--color-success)' : 'var(--color-destructive)'} 
          />
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
            {trendPercentage}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className={`relative w-32 h-32 rounded-full ${getScoreBackground(healthScore)} flex items-center justify-center`}>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(healthScore)}`}>
              {healthScore}
            </div>
            <div className="text-sm text-muted-foreground">out of 100</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Spending Control</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: '85%' }}></div>
            </div>
            <span className="text-sm font-medium text-foreground">85%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Savings Rate</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full" style={{ width: '72%' }}></div>
            </div>
            <span className="text-sm font-medium text-foreground">72%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Debt Management</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: '78%' }}></div>
            </div>
            <span className="text-sm font-medium text-foreground">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;