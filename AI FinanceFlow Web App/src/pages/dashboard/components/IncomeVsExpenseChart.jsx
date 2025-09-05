import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const IncomeVsExpenseChart = ({ className = '' }) => {
  const [timeRange, setTimeRange] = useState('6months');

  const data = [
    { month: 'Jan', income: 5200, expenses: 3200, savings: 2000 },
    { month: 'Feb', income: 5200, expenses: 2800, savings: 2400 },
    { month: 'Mar', income: 5400, expenses: 3600, savings: 1800 },
    { month: 'Apr', income: 5200, expenses: 3100, savings: 2100 },
    { month: 'May', income: 5600, expenses: 2900, savings: 2700 },
    { month: 'Jun', income: 5200, expenses: 3400, savings: 1800 }
  ];

  const currentMonth = data?.[data?.length - 1];
  const savingsRate = ((currentMonth?.savings / currentMonth?.income) * 100)?.toFixed(1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: ${entry?.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Income vs Expenses</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e?.target?.value)}
          className="text-sm bg-muted border border-border rounded px-2 py-1 text-foreground"
        >
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Monthly Income</div>
          <div className="text-xl font-bold text-success">${currentMonth?.income?.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Monthly Expenses</div>
          <div className="text-xl font-bold text-destructive">${currentMonth?.expenses?.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Savings Rate</div>
          <div className="text-xl font-bold text-primary">{savingsRate}%</div>
        </div>
      </div>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="var(--color-success)"
              fill="var(--color-success)"
              fillOpacity={0.6}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="2"
              stroke="var(--color-destructive)"
              fill="var(--color-destructive)"
              fillOpacity={0.6}
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span className="text-muted-foreground">Expenses</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="TrendingUp" size={14} color="var(--color-success)" />
          <span className="text-success">Healthy savings trend</span>
        </div>
      </div>
    </div>
  );
};

export default IncomeVsExpenseChart;