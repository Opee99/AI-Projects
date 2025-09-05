import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps = 2 }) => {
  const steps = [
    { number: 1, title: 'Account Details', description: 'Basic information' },
    { number: 2, title: 'Preferences', description: 'Currency & language' }
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${currentStep >= step?.number 
                  ? 'bg-primary border-primary text-white' :'bg-background border-border text-muted-foreground'
                }
              `}>
                {currentStep > step?.number ? (
                  <Icon name="Check" size={16} strokeWidth={2.5} />
                ) : (
                  <span className="text-sm font-semibold">{step?.number}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${
                  currentStep >= step?.number ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {step?.description}
                </p>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-4 transition-all duration-300
                ${currentStep > step?.number ? 'bg-primary' : 'bg-border'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;