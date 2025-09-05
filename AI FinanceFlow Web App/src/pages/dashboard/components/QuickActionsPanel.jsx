import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActionsPanel = ({ className = '' }) => {
  const [showQuickExpense, setShowQuickExpense] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  const quickActions = [
    {
      id: 1,
      title: "Add Expense",
      description: "Record a new expense",
      icon: "Plus",
      color: "bg-destructive/10 text-destructive",
      action: () => setShowQuickExpense(true)
    },
    {
      id: 2,
      title: "Transfer Money",
      description: "Move funds between accounts",
      icon: "ArrowUpDown",
      color: "bg-primary/10 text-primary",
      action: () => console.log('Transfer money')
    },
    {
      id: 3,
      title: "Pay Bill",
      description: "Pay upcoming bills",
      icon: "CreditCard",
      color: "bg-warning/10 text-warning",
      action: () => console.log('Pay bill')
    },
    {
      id: 4,
      title: "Set Goal",
      description: "Create financial goal",
      icon: "Target",
      color: "bg-success/10 text-success",
      action: () => console.log('Set goal')
    },
    {
      id: 5,
      title: "View Reports",
      description: "Detailed financial reports",
      icon: "BarChart3",
      color: "bg-accent/10 text-accent",
      action: () => console.log('View reports')
    },
    {
      id: 6,
      title: "Budget Review",
      description: "Check budget status",
      icon: "PieChart",
      color: "bg-secondary/10 text-secondary",
      action: () => console.log('Budget review')
    }
  ];

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Other"
  ];

  const handleQuickExpense = () => {
    if (expenseAmount && expenseCategory) {
      console.log('Quick expense added:', { amount: expenseAmount, category: expenseCategory });
      setExpenseAmount('');
      setExpenseCategory('');
      setShowQuickExpense(false);
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} color="var(--color-primary)" />
      </div>
      {showQuickExpense ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Add Quick Expense</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowQuickExpense(false)}
              iconName="X"
              iconSize={16}
            />
          </div>

          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e?.target?.value)}
            className="mb-4"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e?.target?.value)}
              className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
            >
              <option value="">Select category</option>
              {categories?.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleQuickExpense}
              iconName="Check"
              iconPosition="left"
              fullWidth
            >
              Add Expense
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuickExpense(false)}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {quickActions?.map(action => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-smooth text-left group"
            >
              <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-smooth`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="font-medium text-foreground mb-1">{action?.title}</div>
              <div className="text-sm text-muted-foreground">{action?.description}</div>
            </button>
          ))}
        </div>
      )}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Mic" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-primary">Voice Assistant</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Try saying: "What's my balance?" or "Add $25 expense for lunch"
        </p>
        <Button variant="outline" size="sm" iconName="Mic" iconPosition="left" fullWidth>
          Start Voice Command
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsPanel;