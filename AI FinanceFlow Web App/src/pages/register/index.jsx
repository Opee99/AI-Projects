import React from 'react';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import WelcomeHeader from './components/WelcomeHeader';
import ProgressIndicator from './components/ProgressIndicator';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import LoginPrompt from './components/LoginPrompt';

const Register = () => {
  return (
    <AuthenticationWrapper>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Registration Form */}
              <div className="order-2 lg:order-1">
                <div className="max-w-md mx-auto lg:mx-0">
                  <WelcomeHeader />
                  <ProgressIndicator currentStep={1} />
                  <RegistrationForm />
                  <LoginPrompt />
                </div>
              </div>

              {/* Right Column - Trust Signals */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-8">
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-elevation-2">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Why Choose FinanceFlow Pro?
                      </h2>
                      <p className="text-muted-foreground">
                        Join the most trusted financial management platform with enterprise-grade security
                      </p>
                    </div>
                    
                    <TrustSignals />
                    
                    <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary font-bold text-sm">💡</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            Pro Tip
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Connect your bank accounts after registration for automatic transaction tracking and AI-powered insights.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationWrapper>
  );
};

export default Register;