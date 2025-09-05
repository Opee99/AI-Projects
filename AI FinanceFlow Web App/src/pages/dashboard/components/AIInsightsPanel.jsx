import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('insights');

  const insights = [
    {
      id: 1,
      type: 'tip',
      title: "Optimize Your Dining Expenses",
      message: `You've spent 23% more on dining out this month compared to last month. Consider meal planning to save approximately $180 monthly.`,priority: 'high',icon: 'Lightbulb',color: 'text-warning'
    },
    {
      id: 2,
      type: 'alert',title: "Budget Threshold Alert",message: `You're approaching 85% of your entertainment budget. You have $63 remaining for the rest of the month.`,
      priority: 'medium',
      icon: 'AlertTriangle',
      color: 'text-destructive'
    },
    {
      id: 3,
      type: 'opportunity',
      title: "Savings Opportunity",
      message: `Based on your spending patterns, you could save an additional $250 monthly by switching to a high-yield savings account.`,
      priority: 'low',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      id: 4,
      type: 'forecast',
      title: "Spending Forecast",
      message: `At your current rate, you'll exceed your monthly budget by $120. Consider reducing discretionary spending.`,priority: 'high',icon: 'BarChart3',color: 'text-primary'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Netflix subscription renewal",
      message: "Your Netflix subscription will renew in 2 days",
      time: "2 hours ago",
      type: "bill",
      icon: "Bell"
    },
    {
      id: 2,
      title: "Budget goal achieved",
      message: "You\'ve successfully stayed under your grocery budget this month!",
      time: "5 hours ago",
      type: "achievement",
      icon: "Trophy"
    },
    {
      id: 3,
      title: "Unusual spending detected",
      message: "Large transaction of $450 detected at Electronics Store",
      time: "1 day ago",
      type: "alert",
      icon: "AlertCircle"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-primary bg-primary/5';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'bill': return 'CreditCard';
      case 'achievement': return 'Trophy';
      case 'alert': return 'AlertCircle';
      default: return 'Bell';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-2 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'insights' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </Button>
          <Button
            variant={activeTab === 'notifications' ? 'default' : 'ghost'}
            size="xs"
            onClick={() => setActiveTab('notifications')}
          >
            Alerts
          </Button>
        </div>
      </div>
      {activeTab === 'insights' ? (
        <div className="space-y-4">
          {insights?.map(insight => (
            <div key={insight?.id} className={`border-l-4 rounded-lg p-4 ${getPriorityColor(insight?.priority)}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${insight?.color}`}>
                  <Icon name={insight?.icon} size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{insight?.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight?.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight?.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                      insight?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }`}>
                      {insight?.priority} priority
                    </span>
                    <Button variant="ghost" size="xs" iconName="ChevronRight" iconSize={14}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Sparkles" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-primary">AI Financial Coach</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Get personalized financial advice based on your spending patterns and goals.
            </p>
            <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left" fullWidth>
              Chat with AI Coach
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications?.map(notification => (
            <div key={notification?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getTypeIcon(notification?.type)} size={16} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{notification?.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">{notification?.message}</p>
                <span className="text-xs text-muted-foreground">{notification?.time}</span>
              </div>
              <Button variant="ghost" size="icon" iconName="X" iconSize={14} />
            </div>
          ))}

          <div className="text-center py-4">
            <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconPosition="left">
              View All Notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPanel;