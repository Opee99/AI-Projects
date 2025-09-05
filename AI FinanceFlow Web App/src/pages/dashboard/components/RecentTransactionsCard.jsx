import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactionsCard = ({ className = '' }) => {
  const [filter, setFilter] = useState('all');

  const transactions = [
    {
      id: 1,
      description: "Starbucks Coffee",
      amount: -5.75,
      category: "Food & Dining",
      date: "2025-01-04",
      time: "08:30 AM",
      account: "Chase Checking",
      icon: "Coffee",
      color: "text-amber-600"
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 3200.00,
      category: "Income",
      date: "2025-01-03",
      time: "09:00 AM",
      account: "Chase Checking",
      icon: "DollarSign",
      color: "text-success"
    },
    {
      id: 3,
      description: "Uber Ride",
      amount: -18.50,
      category: "Transportation",
      date: "2025-01-03",
      time: "06:45 PM",
      account: "Chase Checking",
      icon: "Car",
      color: "text-blue-600"
    },
    {
      id: 4,
      description: "Amazon Purchase",
      amount: -89.99,
      category: "Shopping",
      date: "2025-01-02",
      time: "02:15 PM",
      account: "Chase Checking",
      icon: "ShoppingBag",
      color: "text-orange-600"
    },
    {
      id: 5,
      description: "Netflix Subscription",
      amount: -15.99,
      category: "Entertainment",
      date: "2025-01-01",
      time: "12:00 AM",
      account: "Chase Checking",
      icon: "Tv",
      color: "text-red-600"
    },
    {
      id: 6,
      description: "Grocery Store",
      amount: -127.45,
      category: "Food & Dining",
      date: "2024-12-31",
      time: "04:30 PM",
      account: "Chase Checking",
      icon: "ShoppingCart",
      color: "text-green-600"
    },
    {
      id: 7,
      description: "Gas Station",
      amount: -45.20,
      category: "Transportation",
      date: "2024-12-30",
      time: "07:20 AM",
      account: "Chase Checking",
      icon: "Fuel",
      color: "text-gray-600"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'income', label: 'Income' },
    { value: 'expenses', label: 'Expenses' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'transport', label: 'Transportation' }
  ];

  const filteredTransactions = transactions?.filter(transaction => {
    switch (filter) {
      case 'income':
        return transaction?.amount > 0;
      case 'expenses':
        return transaction?.amount < 0;
      case 'food':
        return transaction?.category === 'Food & Dining';
      case 'transport':
        return transaction?.category === 'Transportation';
      default:
        return true;
    }
  });

  const formatAmount = (amount) => {
    const isPositive = amount > 0;
    const formattedAmount = Math.abs(amount)?.toFixed(2);
    return {
      display: `${isPositive ? '+' : '-'}$${formattedAmount}`,
      className: isPositive ? 'text-success' : 'text-foreground'
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="text-sm bg-muted border border-border rounded px-2 py-1 text-foreground"
          >
            {filterOptions?.map(option => (
              <option key={option?.value} value={option?.value}>{option?.label}</option>
            ))}
          </select>
          <Button variant="ghost" size="sm" iconName="Filter" iconSize={16} />
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredTransactions?.map(transaction => {
          const amountInfo = formatAmount(transaction?.amount);
          return (
            <div key={transaction?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${transaction?.color}`}>
                  <Icon name={transaction?.icon} size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{transaction?.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction?.category} • {transaction?.account}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${amountInfo?.className}`}>
                  {amountInfo?.display}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(transaction?.date)} {transaction?.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredTransactions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Receipt" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
          <p className="text-muted-foreground">No transactions found for the selected filter.</p>
        </div>
      )}
      <div className="flex space-x-2 mt-6">
        <Button variant="default" size="sm" iconName="Plus" iconPosition="left" fullWidth>
          Add Transaction
        </Button>
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left" fullWidth>
          Export
        </Button>
      </div>
    </div>
  );
};

export default RecentTransactionsCard;