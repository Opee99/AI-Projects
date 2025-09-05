import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginPrompt = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="text-center pt-6 border-t border-border">
      <p className="text-muted-foreground mb-4">
        Already have an account?
      </p>
      
      <Button
        variant="outline"
        size="lg"
        onClick={handleLoginClick}
        iconName="LogIn"
        iconPosition="left"
        fullWidth
      >
        Sign In to Your Account
      </Button>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPrompt;