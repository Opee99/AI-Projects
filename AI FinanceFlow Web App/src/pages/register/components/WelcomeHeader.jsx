import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon name="UserPlus" size={32} color="var(--color-primary)" strokeWidth={1.5} />
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Create Your Account
      </h1>
      
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Join thousands of users who trust FinanceFlow Pro to manage their financial future
      </p>
      
      <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="var(--color-success)" />
          <span>2 min setup</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CreditCard" size={16} color="var(--color-success)" />
          <span>No credit card</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Smartphone" size={16} color="var(--color-success)" />
          <span>Mobile ready</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;