import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetCard = ({ budget, onEdit, onDelete, onViewDetails }) => {
  const progressPercentage = Math.min((budget?.spent / budget?.allocated) * 100, 100);
  
  const getStatusColor = () => {
    if (progressPercentage >= 90) return 'text-error';
    if (progressPercentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getProgressBarColor = () => {
    if (progressPercentage >= 90) return 'bg-error';
    if (progressPercentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${budget?.color || 'bg-primary/10'}`}>
            <Icon 
              name={budget?.icon || 'Wallet'} 
              size={20} 
              color={budget?.iconColor || 'var(--color-primary)'} 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{budget?.category}</h3>
            <p className="text-sm text-muted-foreground">{budget?.period}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(budget)}
            iconName="Edit"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(budget?.id)}
            iconName="Trash2"
            iconSize={16}
            className="text-error hover:text-error"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Allocated</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(budget?.allocated, budget?.currency)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Spent</span>
          <span className={`font-semibold ${getStatusColor()}`}>
            {formatCurrency(budget?.spent, budget?.currency)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Remaining</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(budget?.allocated - budget?.spent, budget?.currency)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {progressPercentage?.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {budget?.subcategories && budget?.subcategories?.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Subcategories:</p>
            <div className="flex flex-wrap gap-1">
              {budget?.subcategories?.slice(0, 3)?.map((sub, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                >
                  {sub}
                </span>
              ))}
              {budget?.subcategories?.length > 3 && (
                <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                  +{budget?.subcategories?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(budget)}
          iconName="BarChart3"
          iconPosition="left"
          iconSize={16}
          fullWidth
          className="mt-4"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default BudgetCard;