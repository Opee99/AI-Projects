import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GoalProgressCard = ({ className = '' }) => {
  const goals = [
    {
      id: 1,
      title: "Emergency Fund",
      description: "Build 6 months of expenses",
      targetAmount: 15000,
      currentAmount: 8750,
      deadline: "2025-12-31",
      category: "savings",
      icon: "Shield",
      color: "text-success"
    },
    {
      id: 2,
      title: "Vacation to Europe",
      description: "Summer trip to Italy and France",
      targetAmount: 5000,
      currentAmount: 2100,
      deadline: "2025-06-15",
      category: "travel",
      icon: "Plane",
      color: "text-primary"
    },
    {
      id: 3,
      title: "New Car Down Payment",
      description: "20% down payment for new vehicle",
      targetAmount: 8000,
      currentAmount: 3200,
      deadline: "2025-09-30",
      category: "purchase",
      icon: "Car",
      color: "text-warning"
    }
  ];

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthsRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(diffMonths, 0);
  };

  const calculateMonthlyTarget = (current, target, deadline) => {
    const remaining = target - current;
    const monthsLeft = calculateMonthsRemaining(deadline);
    return monthsLeft > 0 ? remaining / monthsLeft : 0;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Financial Goals</h3>
        <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
          Add Goal
        </Button>
      </div>
      <div className="space-y-6">
        {goals?.map(goal => {
          const progress = calculateProgress(goal?.currentAmount, goal?.targetAmount);
          const monthsRemaining = calculateMonthsRemaining(goal?.deadline);
          const monthlyTarget = calculateMonthlyTarget(goal?.currentAmount, goal?.targetAmount, goal?.deadline);

          return (
            <div key={goal?.id} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${goal?.color}`}>
                    <Icon name={goal?.icon} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{goal?.title}</h4>
                    <p className="text-sm text-muted-foreground">{goal?.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" iconName="MoreVertical" iconSize={16} />
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">{progress?.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressColor(progress)} transition-all duration-500 ease-out`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Current</div>
                  <div className="font-semibold text-foreground">${goal?.currentAmount?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Target</div>
                  <div className="font-semibold text-foreground">${goal?.targetAmount?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Monthly Need</div>
                  <div className="font-semibold text-foreground">${monthlyTarget?.toFixed(0)}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>{monthsRemaining} months remaining</span>
                </div>
                <Button variant="outline" size="xs" iconName="Plus" iconPosition="left">
                  Add Funds
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Target" size={16} color="var(--color-success)" />
          <span className="text-sm font-medium text-success">Goal Achievement Tip</span>
        </div>
        <p className="text-sm text-muted-foreground">
          You're on track to achieve 2 out of 3 goals on time. Consider increasing your emergency fund contributions by $50/month to stay on target.
        </p>
      </div>
    </div>
  );
};

export default GoalProgressCard;