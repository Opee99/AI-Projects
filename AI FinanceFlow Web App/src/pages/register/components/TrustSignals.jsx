import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'GDPR & SOC 2 compliant'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'Your data stays private'
    },
    {
      icon: 'Zap',
      title: 'Instant Setup',
      description: 'Get started in minutes'
    }
  ];

  const certifications = [
    { name: 'PCI DSS', description: 'Payment Card Industry Certified' },
    { name: 'ISO 27001', description: 'Information Security Management' },
    { name: 'SOC 2 Type II', description: 'Security & Availability Verified' }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Features */}
      <div className="grid grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} color="var(--color-success)" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Award" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">Security Certifications</span>
        </div>
        <div className="space-y-2">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-foreground">{cert?.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{cert?.description}</span>
            </div>
          ))}
        </div>
      </div>
      {/* User Count */}
      <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          <span className="text-lg font-semibold text-primary">500,000+</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Trusted users managing their finances securely
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;