import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIBudgetSuggestions = ({ onAdoptSuggestion, currentBudgets = [] }) => {
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);

  const aiSuggestions = [
    {
      id: 1,
      type: 'optimization',
      title: 'Optimize Food & Dining Budget',
      description: 'Based on your spending patterns, you could reduce your food budget by 15% and reallocate to savings.',
      impact: 'Save $180/month',
      confidence: 92,
      category: 'Food & Dining',
      currentAmount: 800,
      suggestedAmount: 680,
      reasoning: `Analysis of your last 6 months shows:\n• 23% of food expenses are from expensive restaurants\n• You cook at home 4 days/week on average\n• Grocery spending is efficient at $120/week\n• Opportunity to meal prep and reduce dining out`,
      actionItems: [
        'Set a dining out limit of 2 times per week',
        'Increase meal prep to 3 days ahead',
        'Use grocery store loyalty programs',
        'Allocate saved amount to emergency fund'
      ]
    },
    {
      id: 2,
      type: 'new_category',
      title: 'Create Emergency Fund Budget',
      description: 'You don\'t have an emergency fund budget. Based on your income, we recommend starting with $500/month.',
      impact: 'Build 6-month emergency fund',
      confidence: 88,
      category: 'Emergency Fund',
      currentAmount: 0,
      suggestedAmount: 500,
      reasoning: `Financial health analysis indicates:\n• Your monthly expenses average $3,200\n• No dedicated emergency savings detected\n• Income stability allows for $500/month allocation\n• This will build a 6-month emergency fund in 3.2 years`,
      actionItems: [
        'Set up automatic transfer to high-yield savings',
        'Start with $250/month and increase gradually',
        'Keep emergency fund in separate account',
        'Review and adjust quarterly'
      ]
    },
    {
      id: 3,
      type: 'seasonal',
      title: 'Seasonal Budget Adjustment',
      description: 'Winter months typically see 20% higher utility costs. Consider adjusting your Bills & Utilities budget.',
      impact: 'Avoid budget overruns',
      confidence: 85,
      category: 'Bills & Utilities',
      currentAmount: 300,
      suggestedAmount: 360,
      reasoning: `Seasonal spending analysis shows:\n• Heating costs increase 35% in winter months\n• Electricity usage up 15% due to shorter days\n• Holiday season increases overall utility usage\n• Previous years show consistent winter spikes`,
      actionItems: [
        'Increase utilities budget by $60 for winter months',
        'Implement energy-saving measures',
        'Consider budget billing from utility companies',
        'Track daily usage to identify savings opportunities'
      ]
    },
    {
      id: 4,
      type: 'goal_based',
      title: 'Vacation Fund Budget',
      description: 'You mentioned wanting to travel more. Create a dedicated vacation budget of $200/month for your dream trip.',
      impact: 'Achieve travel goals',
      confidence: 78,
      category: 'Travel & Vacation',
      currentAmount: 0,
      suggestedAmount: 200,
      reasoning: `Goal-based budgeting recommendation:\n• Average vacation cost for your preferences: $2,400\n• Monthly allocation of $200 = 1 trip per year\n• Can be funded by reducing entertainment budget by $150\n• Remaining $50 from optimized subscriptions`,
      actionItems: [
        'Open dedicated vacation savings account',
        'Research and price target destinations',
        'Set up automatic monthly transfers',
        'Track progress with visual goal tracker'
      ]
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const getImpactColor = (type) => {
    switch (type) {
      case 'optimization': return 'text-warning';
      case 'new_category': return 'text-success';
      case 'seasonal': return 'text-primary';
      case 'goal_based': return 'text-accent';
      default: return 'text-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'optimization': return 'TrendingUp';
      case 'new_category': return 'Plus';
      case 'seasonal': return 'Calendar';
      case 'goal_based': return 'Target';
      default: return 'Lightbulb';
    }
  };

  const handleAdoptSuggestion = (suggestion) => {
    const budgetData = {
      id: Date.now(),
      category: suggestion?.category,
      allocated: suggestion?.suggestedAmount,
      spent: 0,
      currency: 'USD',
      period: 'Monthly',
      icon: suggestion?.type === 'new_category' ? 'Plus' : 'TrendingUp',
      subcategories: [],
      alertThreshold: 80,
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString(),
      aiSuggested: true
    };

    onAdoptSuggestion(budgetData, suggestion);
  };

  const toggleExpanded = (suggestionId) => {
    setExpandedSuggestion(expandedSuggestion === suggestionId ? null : suggestionId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Brain" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Budget Suggestions</h2>
          <p className="text-sm text-muted-foreground">
            Personalized recommendations based on your spending patterns
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {aiSuggestions?.map((suggestion) => (
          <div
            key={suggestion?.id}
            className="border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon 
                    name={getTypeIcon(suggestion?.type)} 
                    size={16} 
                    color="var(--color-foreground)" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{suggestion?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{suggestion?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`font-medium ${getImpactColor(suggestion?.type)}`}>
                      {suggestion?.impact}
                    </span>
                    <span className="text-muted-foreground">
                      {suggestion?.confidence}% confidence
                    </span>
                    {suggestion?.currentAmount !== suggestion?.suggestedAmount && (
                      <span className="text-muted-foreground">
                        {formatCurrency(suggestion?.currentAmount)} → {formatCurrency(suggestion?.suggestedAmount)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(suggestion?.id)}
                  iconName={expandedSuggestion === suggestion?.id ? "ChevronUp" : "ChevronDown"}
                  iconSize={16}
                >
                  Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAdoptSuggestion(suggestion)}
                  iconName="Check"
                  iconSize={16}
                >
                  Adopt
                </Button>
              </div>
            </div>

            {expandedSuggestion === suggestion?.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {suggestion?.reasoning}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Recommended Actions</h4>
                  <ul className="space-y-1">
                    {suggestion?.actionItems?.map((action, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} />
            <span>Suggestions update weekly based on your spending patterns</span>
          </div>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={16}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIBudgetSuggestions;