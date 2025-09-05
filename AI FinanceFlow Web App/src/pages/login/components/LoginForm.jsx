import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ language, onBiometricLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const translations = {
    en: {
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      signInButton: 'Sign In',
      forgotPassword: 'Forgot Password?',
      createAccount: 'Create Account',
      noAccount: "Don\'t have an account?",
      biometricLogin: 'Use Biometric Login',
      invalidCredentials: 'Invalid email or password. Please try again.',
      emailRequired: 'Email address is required',
      passwordRequired: 'Password is required',
      invalidEmail: 'Please enter a valid email address'
    },
    bn: {
      emailLabel: 'ইমেইল ঠিকানা',
      emailPlaceholder: 'আপনার ইমেইল ঠিকানা লিখুন',
      passwordLabel: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      signInButton: 'সাইন ইন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      createAccount: 'অ্যাকাউন্ট তৈরি করুন',
      noAccount: 'কোনো অ্যাকাউন্ট নেই?',
      biometricLogin: 'বায়োমেট্রিক লগইন ব্যবহার করুন',
      invalidCredentials: 'ভুল ইমেইল বা পাসওয়ার্ড। আবার চেষ্টা করুন।',
      emailRequired: 'ইমেইল ঠিকানা প্রয়োজন',
      passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
      invalidEmail: 'একটি বৈধ ইমেইল ঠিকানা লিখুন'
    },
    es: {
      emailLabel: 'Dirección de Correo',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      signInButton: 'Iniciar Sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      createAccount: 'Crear Cuenta',
      noAccount: '¿No tienes una cuenta?',
      biometricLogin: 'Usar Login Biométrico',
      invalidCredentials: 'Email o contraseña inválidos. Inténtalo de nuevo.',
      emailRequired: 'La dirección de correo es requerida',
      passwordRequired: 'La contraseña es requerida',
      invalidEmail: 'Por favor ingresa una dirección de correo válida'
    }
  };

  const t = translations?.[language] || translations?.en;

  // Mock credentials for different user types
  const mockCredentials = [
    { email: 'admin@financeflow.com', password: 'admin123', type: 'Admin User' },
    { email: 'user@financeflow.com', password: 'user123', type: 'Regular User' },
    { email: 'premium@financeflow.com', password: 'premium123', type: 'Premium User' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = t?.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = t?.invalidEmail;
    }

    if (!formData?.password?.trim()) {
      newErrors.password = t?.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        // Store user info in localStorage
        localStorage.setItem('userInfo', JSON.stringify({
          email: validCredential?.email,
          type: validCredential?.type,
          loginTime: new Date()?.toISOString()
        }));
        
        navigate('/dashboard');
      } else {
        setErrors({
          general: t?.invalidCredentials
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <span className="text-sm text-error">{errors?.general}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label={t?.emailLabel}
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder={t?.emailPlaceholder}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label={t?.passwordLabel}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder={t?.passwordPlaceholder}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          iconSize={18}
        >
          {t?.signInButton}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-primary hover:text-primary/80 transition-smooth"
            disabled={isLoading}
          >
            {t?.forgotPassword}
          </button>
        </div>

        {/* Biometric Login Option */}
        <div className="pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="default"
            fullWidth
            onClick={onBiometricLogin}
            iconName="Fingerprint"
            iconPosition="left"
            iconSize={18}
            disabled={isLoading}
          >
            {t?.biometricLogin}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <span>{t?.noAccount} </span>
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-primary hover:text-primary/80 transition-smooth font-medium"
            disabled={isLoading}
          >
            {t?.createAccount}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;