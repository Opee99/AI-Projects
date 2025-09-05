import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationWrapper = ({ children, className = '' }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/login');
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Authentication Header */}
      <header className="w-full bg-card border-b border-border shadow-elevation-1">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div 
                className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
                onClick={handleLogoClick}
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Icon name="DollarSign" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-semibold text-foreground font-sans">
                  FinanceFlow Pro
                </span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="hidden sm:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Lock" size={16} color="var(--color-success)" />
                <span>Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-card border-t border-border mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <span>© 2025 FinanceFlow Pro</span>
              <span className="hidden sm:inline">•</span>
              <span>Your financial data is protected</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
              <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
              <a href="#" className="hover:text-foreground transition-smooth">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationWrapper;