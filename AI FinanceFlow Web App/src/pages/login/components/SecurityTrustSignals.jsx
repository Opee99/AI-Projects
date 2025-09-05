import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityTrustSignals = ({ language, className = '' }) => {
  const translations = {
    en: {
      secureLogin: 'Secure Login',
      encryptedData: 'Encrypted Data',
      bankGrade: 'Bank-Grade Security',
      compliance: 'Regulatory Compliant',
      protection: 'Your financial data is protected with industry-leading security measures'
    },
    bn: {
      secureLogin: 'নিরাপদ লগইন',
      encryptedData: 'এনক্রিপ্টেড ডেটা',
      bankGrade: 'ব্যাংক-গ্রেড নিরাপত্তা',
      compliance: 'নিয়ন্ত্রক সম্মত',
      protection: 'আপনার আর্থিক তথ্য শিল্প-নেতৃস্থানীয় নিরাপত্তা ব্যবস্থা দিয়ে সুরক্ষিত'
    },
    es: {
      secureLogin: 'Login Seguro',
      encryptedData: 'Datos Encriptados',
      bankGrade: 'Seguridad Bancaria',
      compliance: 'Cumplimiento Regulatorio',
      protection: 'Tus datos financieros están protegidos con medidas de seguridad líderes en la industria'
    }
  };

  const t = translations?.[language] || translations?.en;

  const securityFeatures = [
    {
      icon: 'Shield',
      label: t?.secureLogin,
      color: 'var(--color-success)'
    },
    {
      icon: 'Lock',
      label: t?.encryptedData,
      color: 'var(--color-success)'
    },
    {
      icon: 'Award',
      label: t?.bankGrade,
      color: 'var(--color-primary)'
    },
    {
      icon: 'CheckCircle',
      label: t?.compliance,
      color: 'var(--color-success)'
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">
          {t?.protection}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 p-3 bg-muted/30 rounded-lg transition-smooth hover:bg-muted/50"
          >
            <div className="p-2 bg-background rounded-full shadow-elevation-1">
              <Icon 
                name={feature?.icon} 
                size={20} 
                color={feature?.color}
                strokeWidth={2}
              />
            </div>
            <span className="text-xs text-center text-muted-foreground font-medium">
              {feature?.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={12} color="var(--color-success)" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Eye" size={12} color="var(--color-primary)" />
          <span>SOC 2 Compliant</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={12} color="var(--color-success)" />
          <span>GDPR Protected</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityTrustSignals;