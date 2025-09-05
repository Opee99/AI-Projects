import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySection = () => {
  const [dataSharing, setDataSharing] = useState({
    analytics: true,
    marketing: false,
    thirdParty: false,
    research: true
  });
  
  const [marketingPreferences, setMarketingPreferences] = useState({
    email: true,
    sms: false,
    push: true,
    postal: false
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const handleDataSharingChange = (key, value) => {
    setDataSharing(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMarketingChange = (key, value) => {
    setMarketingPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmationText === 'DELETE') {
      // Mock account deletion process
      console.log('Account deletion initiated');
      setShowDeleteConfirmation(false);
      setDeleteConfirmationText('');
    }
  };

  const dataRetentionPolicies = [
    {
      category: "Transaction Data",
      retention: "7 years",
      description: "Financial transaction records are retained for regulatory compliance",
      icon: "Receipt"
    },
    {
      category: "Personal Information",
      retention: "Account lifetime + 2 years",
      description: "Profile data and preferences are kept while account is active",
      icon: "User"
    },
    {
      category: "Usage Analytics",
      retention: "2 years",
      description: "App usage patterns and performance data for service improvement",
      icon: "BarChart3"
    },
    {
      category: "Communication History",
      retention: "3 years",
      description: "Support conversations and notification history",
      icon: "MessageSquare"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Data Sharing Preferences */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Data Sharing Preferences</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Control how your data is used to improve our services
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Usage Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Help us improve the app by sharing anonymous usage data
                </p>
              </div>
            </div>
            <Checkbox
              checked={dataSharing?.analytics}
              onChange={(e) => handleDataSharingChange('analytics', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Target" size={20} color="var(--color-warning)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Marketing Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Allow personalized financial product recommendations
                </p>
              </div>
            </div>
            <Checkbox
              checked={dataSharing?.marketing}
              onChange={(e) => handleDataSharingChange('marketing', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Icon name="Share2" size={20} color="var(--color-destructive)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Third-Party Sharing</h4>
                <p className="text-sm text-muted-foreground">
                  Share aggregated data with trusted financial partners
                </p>
              </div>
            </div>
            <Checkbox
              checked={dataSharing?.thirdParty}
              onChange={(e) => handleDataSharingChange('thirdParty', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Research Participation</h4>
                <p className="text-sm text-muted-foreground">
                  Contribute to financial wellness research studies
                </p>
              </div>
            </div>
            <Checkbox
              checked={dataSharing?.research}
              onChange={(e) => handleDataSharingChange('research', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Marketing Communications */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Marketing Communications</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose how you'd like to receive marketing communications
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Email Marketing</h4>
                <p className="text-sm text-muted-foreground">
                  Financial tips, product updates, and special offers
                </p>
              </div>
            </div>
            <Checkbox
              checked={marketingPreferences?.email}
              onChange={(e) => handleMarketingChange('email', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">SMS Marketing</h4>
                <p className="text-sm text-muted-foreground">
                  Text messages about promotions and important updates
                </p>
              </div>
            </div>
            <Checkbox
              checked={marketingPreferences?.sms}
              onChange={(e) => handleMarketingChange('sms', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Bell" size={20} color="var(--color-warning)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  In-app notifications about new features and offers
                </p>
              </div>
            </div>
            <Checkbox
              checked={marketingPreferences?.push}
              onChange={(e) => handleMarketingChange('push', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={20} color="var(--color-secondary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Postal Mail</h4>
                <p className="text-sm text-muted-foreground">
                  Physical mail with exclusive offers and statements
                </p>
              </div>
            </div>
            <Checkbox
              checked={marketingPreferences?.postal}
              onChange={(e) => handleMarketingChange('postal', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Data Retention Policy */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Data Retention Policy</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Understand how long we keep different types of your data
          </p>
        </div>

        <div className="space-y-4">
          {dataRetentionPolicies?.map((policy, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={policy?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{policy?.category}</h4>
                    <span className="text-sm font-medium text-primary">{policy?.retention}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{policy?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Important Note</h4>
              <p className="text-sm text-muted-foreground">
                Some data may be retained longer due to legal requirements or regulatory compliance. 
                You can request data deletion at any time, subject to applicable laws.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Account Deletion */}
      <div className="bg-card rounded-lg border border-destructive/20 p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-destructive">Delete Account</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Permanently delete your account and all associated data
          </p>
        </div>

        {!showDeleteConfirmation ? (
          <div className="space-y-4">
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">What happens when you delete your account:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• All financial data and transaction history will be permanently deleted</li>
                <li>• Connected bank accounts and integrations will be disconnected</li>
                <li>• Your profile and preferences will be removed</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>
            
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirmation(true)}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
            >
              Delete My Account
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <h4 className="font-medium text-destructive mb-2">Confirm Account Deletion</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Type "DELETE" in the field below to confirm you want to permanently delete your account.
              </p>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e?.target?.value)}
                placeholder="Type DELETE to confirm"
                className="w-full px-3 py-2 border border-destructive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive/20"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setDeleteConfirmationText('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationText !== 'DELETE'}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Permanently Delete Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacySection;