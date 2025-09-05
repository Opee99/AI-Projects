import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    currency: 'USD',
    language: 'en',
    agreeTerms: false,
    agreePrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'BDT', label: 'Bangladeshi Taka (BDT)' },
    { value: 'INR', label: 'Indian Rupee (INR)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'bn', label: 'বাংলা (Bangla)' },
    { value: 'es', label: 'Español (Spanish)' },
    { value: 'fr', label: 'Français (French)' },
    { value: 'de', label: 'Deutsch (German)' },
    { value: 'zh', label: '中文 (Chinese)' }
  ];

  const validatePassword = (password) => {
    const requirements = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    const score = Object.values(requirements)?.filter(Boolean)?.length;
    return { requirements, score };
  };

  const getPasswordStrength = (score) => {
    if (score < 2) return { text: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score < 4) return { text: 'Medium', color: 'text-warning', bgColor: 'bg-warning' };
    return { text: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const { score } = validatePassword(formData?.password);
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (score < 3) {
      newErrors.password = 'Password must meet at least 3 requirements';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }
    
    if (!formData?.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (currentStep === 1) {
      handleNextStep();
      return;
    }

    if (!validateStep2()) return;

    setIsLoading(true);
    
    // Mock registration process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      localStorage.setItem('financeflow_user', JSON.stringify({
        id: 'user_' + Date.now(),
        fullName: formData?.fullName,
        email: formData?.email,
        currency: formData?.currency,
        language: formData?.language,
        registeredAt: new Date()?.toISOString()
      }));
      
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData?.password);
  const passwordStrength = getPasswordStrength(passwordValidation?.score);

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <>
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData?.fullName}
                onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                error={errors?.fullName}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData?.password}
                  onChange={(e) => handleInputChange('password', e?.target?.value)}
                  error={errors?.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
                </button>
              </div>

              {formData?.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Password Strength:</span>
                    <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                      {passwordStrength?.text}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.bgColor}`}
                      style={{ width: `${(passwordValidation?.score / 5) * 100}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center space-x-1 ${passwordValidation?.requirements?.length ? 'text-success' : 'text-muted-foreground'}`}>
                      <Icon name={passwordValidation?.requirements?.length ? "Check" : "X"} size={12} />
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordValidation?.requirements?.uppercase ? 'text-success' : 'text-muted-foreground'}`}>
                      <Icon name={passwordValidation?.requirements?.uppercase ? "Check" : "X"} size={12} />
                      <span>Uppercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordValidation?.requirements?.lowercase ? 'text-success' : 'text-muted-foreground'}`}>
                      <Icon name={passwordValidation?.requirements?.lowercase ? "Check" : "X"} size={12} />
                      <span>Lowercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordValidation?.requirements?.number ? 'text-success' : 'text-muted-foreground'}`}>
                      <Icon name={passwordValidation?.requirements?.number ? "Check" : "X"} size={12} />
                      <span>Number</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordValidation?.requirements?.special ? 'text-success' : 'text-muted-foreground'}`}>
                      <Icon name={passwordValidation?.requirements?.special ? "Check" : "X"} size={12} />
                      <span>Special char</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData?.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                  error={errors?.confirmPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="space-y-4">
              <Select
                label="Preferred Currency"
                description="Choose your primary currency for financial tracking"
                options={currencyOptions}
                value={formData?.currency}
                onChange={(value) => handleInputChange('currency', value)}
                searchable
              />

              <Select
                label="Language Preference"
                description="Select your preferred language for the interface"
                options={languageOptions}
                value={formData?.language}
                onChange={(value) => handleInputChange('language', value)}
                searchable
              />

              <div className="space-y-3 pt-4">
                <Checkbox
                  label="I agree to the Terms of Service"
                  description="By checking this, you agree to our terms and conditions"
                  checked={formData?.agreeTerms}
                  onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
                  error={errors?.agreeTerms}
                  required
                />

                <Checkbox
                  label="I agree to the Privacy Policy"
                  description="By checking this, you agree to our privacy policy and data handling practices"
                  checked={formData?.agreePrivacy}
                  onChange={(e) => handleInputChange('agreePrivacy', e?.target?.checked)}
                  error={errors?.agreePrivacy}
                  required
                />
              </div>
            </div>

            {errors?.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-sm text-error">{errors?.submit}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handlePrevStep}
                iconName="ArrowLeft"
                iconPosition="left"
                className="flex-1"
              >
                Back
              </Button>
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isLoading}
                iconName="UserPlus"
                iconPosition="left"
                className="flex-1"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;