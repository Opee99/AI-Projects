import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationWrapper from '../../components/ui/AuthenticationWrapper';
import LanguageSelector from './components/LanguageSelector';
import LoginForm from './components/LoginForm';
import SecurityTrustSignals from './components/SecurityTrustSignals';
import BiometricPrompt from './components/BiometricPrompt';
import Icon from '../../components/AppIcon';


const LoginPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const translations = {
    en: {
      pageTitle: 'Sign In - FinanceFlow Pro',
      welcomeBack: 'Welcome Back',
      subtitle: 'Sign in to your account to continue managing your finances',
      heroTitle: 'Take Control of Your Financial Future',
      heroSubtitle: 'Join thousands of users who trust FinanceFlow Pro to manage their personal finances with AI-powered insights and comprehensive tracking.'
    },
    bn: {
      pageTitle: 'সাইন ইন - FinanceFlow Pro',
      welcomeBack: 'স্বাগতম',
      subtitle: 'আপনার আর্থিক ব্যবস্থাপনা চালিয়ে যেতে আপনার অ্যাকাউন্টে সাইন ইন করুন',
      heroTitle: 'আপনার আর্থিক ভবিষ্যৎ নিয়ন্ত্রণ করুন',
      heroSubtitle: 'হাজার হাজার ব্যবহারকারীর সাথে যোগ দিন যারা AI-চালিত অন্তর্দৃষ্টি এবং ব্যাপক ট্র্যাকিং সহ তাদের ব্যক্তিগত অর্থ পরিচালনার জন্য FinanceFlow Pro-কে বিশ্বাস করেন।'
    },
    es: {
      pageTitle: 'Iniciar Sesión - FinanceFlow Pro',
      welcomeBack: 'Bienvenido de Vuelta',
      subtitle: 'Inicia sesión en tu cuenta para continuar gestionando tus finanzas',
      heroTitle: 'Toma Control de tu Futuro Financiero',
      heroSubtitle: 'Únete a miles de usuarios que confían en FinanceFlow Pro para gestionar sus finanzas personales con insights impulsados por IA y seguimiento integral.'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleBiometricLogin = () => {
    setShowBiometricPrompt(true);
  };

  const handleCloseBiometricPrompt = () => {
    setShowBiometricPrompt(false);
  };

  return (
    <>
      <Helmet>
        <title>{t?.pageTitle}</title>
        <meta name="description" content="Secure login to FinanceFlow Pro - Your comprehensive personal finance management platform with AI-powered insights." />
        <meta name="keywords" content="finance, login, personal finance, budgeting, expense tracking" />
      </Helmet>
      <AuthenticationWrapper>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          {/* Language Selector */}
          <div className="absolute top-4 right-4 z-10">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          <div className="flex min-h-screen">
            {/* Left Side - Hero Section (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10 flex flex-col justify-center px-12 py-16">
                <div className="max-w-md">
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-elevation-3">
                      <Icon name="TrendingUp" size={32} color="white" strokeWidth={2} />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                      {t?.heroTitle}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t?.heroSubtitle}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-4">
                    {[
                      { icon: 'Brain', text: 'AI-Powered Insights' },
                      { icon: 'Shield', text: 'Bank-Grade Security' },
                      { icon: 'Globe', text: 'Multi-Currency Support' }
                    ]?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature?.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
              <div className="w-full max-w-md space-y-8">
                {/* Mobile Hero (Visible only on mobile) */}
                <div className="lg:hidden text-center mb-8">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="TrendingUp" size={24} color="white" strokeWidth={2} />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {t?.heroTitle}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {t?.heroSubtitle}
                  </p>
                </div>

                {/* Login Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t?.welcomeBack}
                  </h2>
                  <p className="text-muted-foreground">
                    {t?.subtitle}
                  </p>
                </div>

                {/* Login Form */}
                <div className="bg-card rounded-2xl shadow-elevation-2 p-6 sm:p-8 border border-border">
                  <LoginForm
                    language={currentLanguage}
                    onBiometricLogin={handleBiometricLogin}
                  />
                </div>

                {/* Security Trust Signals */}
                <div className="mt-8">
                  <SecurityTrustSignals language={currentLanguage} />
                </div>
              </div>
            </div>
          </div>

          {/* Biometric Prompt Modal */}
          <BiometricPrompt
            isVisible={showBiometricPrompt}
            onClose={handleCloseBiometricPrompt}
            language={currentLanguage}
          />
        </div>
      </AuthenticationWrapper>
    </>
  );
};

export default LoginPage;