import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExpenseChart = ({ className = '' }) => {
  const [chartType, setChartType] = useState('pie');
  const [timeRange, setTimeRange] = useState('month');

  const categoryData = [
    { name: 'Food & Dining', value: 1250, color: '#EF4444' },
    { name: 'Transportation', value: 850, color: '#F59E0B' },
    { name: 'Shopping', value: 650, color: '#10B981' },
    { name: 'Entertainment', value: 420, color: '#3B82F6' },
    { name: 'Bills & Utilities', value: 980, color: '#8B5CF6' },
    { name: 'Healthcare', value: 320, color: '#EC4899' }
  ];

  const monthlyData = [
    { month: 'Jan', amount: 3200 },
    { month: 'Feb', amount: 2800 },
    { month: 'Mar', amount: 3600 },
    { month: 'Apr', amount: 3100 },
    { month: 'May', amount: 2900 },
    { month: 'Jun', amount: 3400 }
  ];

  const totalExpenses = categoryData?.reduce((sum, item) => sum + item?.value, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-3">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Amount: ${payload?.[0]?.value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Expense Analysis</h3>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="text-sm bg-muted border border-border rounded px-2 py-1 text-foreground"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'pie' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('pie')}
              iconName="PieChart"
              iconSize={14}
            />
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('bar')}
              iconName="BarChart3"
              iconSize={14}
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-1">Total Expenses</div>
        <div className="text-2xl font-bold text-foreground">${totalExpenses?.toLocaleString()}</div>
        <div className="flex items-center space-x-1 mt-1">
          <Icon name="TrendingDown" size={14} color="var(--color-success)" />
          <span className="text-sm text-success">8.2% less than last month</span>
        </div>
      </div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {chartType === 'pie' && (
        <div className="space-y-2">
          {categoryData?.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category?.color }}
                ></div>
                <span className="text-sm text-foreground">{category?.name}</span>
              </div>
              <div className="text-sm font-medium text-foreground">
                ${category?.value?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;