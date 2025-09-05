import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingBillsCard = ({ className = '' }) => {
  const upcomingBills = [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: 15.99,
      dueDate: "2025-01-08",
      category: "Entertainment",
      status: "upcoming",
      icon: "Tv",
      color: "text-red-500"
    },
    {
      id: 2,
      name: "Electric Bill",
      amount: 125.50,
      dueDate: "2025-01-10",
      category: "Utilities",
      status: "due_soon",
      icon: "Zap",
      color: "text-yellow-500"
    },
    {
      id: 3,
      name: "Internet Service",
      amount: 79.99,
      dueDate: "2025-01-12",
      category: "Utilities",
      status: "upcoming",
      icon: "Wifi",
      color: "text-blue-500"
    },
    {
      id: 4,
      name: "Car Insurance",
      amount: 180.00,
      dueDate: "2025-01-15",
      category: "Insurance",
      status: "upcoming",
      icon: "Car",
      color: "text-green-500"
    },
    {
      id: 5,
      name: "Gym Membership",
      amount: 45.00,
      dueDate: "2025-01-18",
      category: "Health",
      status: "upcoming",
      icon: "Dumbbell",
      color: "text-purple-500"
    }
  ];

  const totalUpcoming = upcomingBills?.reduce((sum, bill) => sum + bill?.amount, 0);
  const dueSoonCount = upcomingBills?.filter(bill => bill?.status === 'due_soon')?.length;

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status, daysUntil) => {
    if (daysUntil <= 2) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-destructive/10 text-destructive rounded-full">
          Due Soon
        </span>
      );
    } else if (daysUntil <= 7) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-warning/10 text-warning rounded-full">
          This Week
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
        Upcoming
      </span>
    );
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Bills</h3>
        <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
          Add Bill
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Total Due</div>
          <div className="text-xl font-bold text-foreground">${totalUpcoming?.toFixed(2)}</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Due Soon</div>
          <div className="text-xl font-bold text-destructive">{dueSoonCount} bills</div>
        </div>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {upcomingBills?.map(bill => {
          const daysUntil = getDaysUntilDue(bill?.dueDate);
          return (
            <div key={bill?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${bill?.color}`}>
                  <Icon name={bill?.icon} size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{bill?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Due in {daysUntil} day{daysUntil !== 1 ? 's' : ''} • {bill?.category}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground mb-1">${bill?.amount}</div>
                {getStatusBadge(bill?.status, daysUntil)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-2 mt-6">
        <Button variant="default" size="sm" iconName="CreditCard" iconPosition="left" fullWidth>
          Pay Bills
        </Button>
        <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left" fullWidth>
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default UpcomingBillsCard;