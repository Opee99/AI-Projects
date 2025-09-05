import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountBalanceCard = ({ className = '' }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const currencies = [
    { code: 'USD', symbol: '$', rate: 1 },
    { code: 'EUR', symbol: '€', rate: 0.85 },
    { code: 'GBP', symbol: '£', rate: 0.73 },
    { code: 'BDT', symbol: '৳', rate: 110.50 }
  ];

  const accounts = [
    {
      id: 1,
      name: "Primary Checking",
      type: "Checking",
      balance: 12450.75,
      accountNumber: "****4521",
      bank: "Chase Bank"
    },
    {
      id: 2,
      name: "Savings Account",
      type: "Savings",
      balance: 25680.30,
      accountNumber: "****7892",
      bank: "Bank of America"
    },
    {
      id: 3,
      name: "Investment Portfolio",
      type: "Investment",
      balance: 45230.90,
      accountNumber: "****3456",
      bank: "Fidelity"
    }
  ];

  const currentCurrency = currencies?.find(c => c?.code === selectedCurrency);
  const totalBalance = accounts?.reduce((sum, account) => sum + account?.balance, 0);
  const convertedBalance = totalBalance * currentCurrency?.rate;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 2
    })?.format(amount * currentCurrency?.rate);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Account Balances</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e?.target?.value)}
            className="text-sm bg-muted border border-border rounded px-2 py-1 text-foreground"
          >
            {currencies?.map(currency => (
              <option key={currency?.code} value={currency?.code}>
                {currency?.code}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBalanceVisibility}
            iconName={isBalanceVisible ? "EyeOff" : "Eye"}
            iconSize={16}
          />
        </div>
      </div>
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
        <div className="text-3xl font-bold text-foreground">
          {isBalanceVisible ? formatCurrency(totalBalance) : '••••••'}
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <Icon name="TrendingUp" size={14} color="var(--color-success)" />
          <span className="text-sm text-success">+2.5% from last month</span>
        </div>
      </div>
      <div className="space-y-4">
        {accounts?.map(account => (
          <div key={account?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon 
                  name={account?.type === 'Checking' ? 'CreditCard' : account?.type === 'Savings' ? 'PiggyBank' : 'TrendingUp'} 
                  size={20} 
                  color="var(--color-primary)" 
                />
              </div>
              <div>
                <div className="font-medium text-foreground">{account?.name}</div>
                <div className="text-sm text-muted-foreground">{account?.bank} • {account?.accountNumber}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-foreground">
                {isBalanceVisible ? formatCurrency(account?.balance) : '••••••'}
              </div>
              <div className="text-sm text-muted-foreground">{account?.type}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-6">
        <Button variant="default" size="sm" iconName="Plus" iconPosition="left" fullWidth>
          Add Account
        </Button>
        <Button variant="outline" size="sm" iconName="ArrowUpDown" iconPosition="left" fullWidth>
          Transfer
        </Button>
      </div>
    </div>
  );
};

export default AccountBalanceCard;