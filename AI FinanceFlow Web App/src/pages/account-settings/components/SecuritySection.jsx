import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const SecuritySection = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "New York, NY",
      browser: "Chrome 120.0",
      lastActive: "Active now",
      current: true
    },
    {
      id: 2,
      device: "iPhone 15 Pro",
      location: "New York, NY",
      browser: "Safari Mobile",
      lastActive: "2 hours ago",
      current: false
    },
    {
      id: 3,
      device: "Windows PC",
      location: "Boston, MA",
      browser: "Edge 120.0",
      lastActive: "1 day ago",
      current: false
    }
  ];

  const loginHistory = [
    {
      id: 1,
      date: "Dec 4, 2024",
      time: "2:30 PM",
      device: "MacBook Pro",
      location: "New York, NY",
      status: "success"
    },
    {
      id: 2,
      date: "Dec 3, 2024",
      time: "9:15 AM",
      device: "iPhone 15 Pro",
      location: "New York, NY",
      status: "success"
    },
    {
      id: 3,
      date: "Dec 2, 2024",
      time: "11:45 PM",
      device: "Unknown Device",
      location: "Los Angeles, CA",
      status: "failed"
    }
  ];

  const handlePasswordChange = () => {
    setShowPasswordForm(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData?.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    
    if (!passwordData?.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData?.newPassword?.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    
    if (!passwordData?.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handlePasswordSave = () => {
    if (validatePasswordForm()) {
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (passwordErrors?.[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTerminateSession = (sessionId) => {
    // Mock session termination
    console.log(`Terminating session ${sessionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Password Security */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Password Security</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account password and security settings
            </p>
          </div>
          {!showPasswordForm && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePasswordChange}
              iconName="Key"
              iconPosition="left"
              iconSize={16}
            >
              Change Password
            </Button>
          )}
        </div>

        {showPasswordForm && (
          <div className="space-y-4 border-t border-border pt-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordData?.currentPassword}
              onChange={(e) => handlePasswordInputChange('currentPassword', e?.target?.value)}
              error={passwordErrors?.currentPassword}
              required
            />
            
            <Input
              label="New Password"
              type="password"
              value={passwordData?.newPassword}
              onChange={(e) => handlePasswordInputChange('newPassword', e?.target?.value)}
              error={passwordErrors?.newPassword}
              description="Must be at least 8 characters long"
              required
            />
            
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData?.confirmPassword}
              onChange={(e) => handlePasswordInputChange('confirmPassword', e?.target?.value)}
              error={passwordErrors?.confirmPassword}
              required
            />

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={handlePasswordCancel}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handlePasswordSave}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Smartphone" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Authenticator App</h4>
                <p className="text-sm text-muted-foreground">
                  {mfaEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
            <Button
              variant={mfaEnabled ? "outline" : "default"}
              size="sm"
              onClick={() => setMfaEnabled(!mfaEnabled)}
            >
              {mfaEnabled ? "Disable" : "Enable"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Fingerprint" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Biometric Login</h4>
                <p className="text-sm text-muted-foreground">
                  {biometricEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
            <Button
              variant={biometricEnabled ? "outline" : "default"}
              size="sm"
              onClick={() => setBiometricEnabled(!biometricEnabled)}
            >
              {biometricEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
      </div>
      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Active Sessions</h3>
        
        <div className="space-y-3">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={session?.device?.includes('iPhone') ? 'Smartphone' : 'Monitor'} 
                    size={20} 
                    color="var(--color-secondary)" 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground flex items-center space-x-2">
                    <span>{session?.device}</span>
                    {session?.current && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {session?.browser} • {session?.location} • {session?.lastActive}
                  </p>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session?.id)}
                  iconName="X"
                  iconSize={16}
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Login History */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Login History</h3>
        
        <div className="space-y-3">
          {loginHistory?.map((login) => (
            <div key={login?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  login?.status === 'success' ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  <Icon 
                    name={login?.status === 'success' ? 'CheckCircle' : 'XCircle'} 
                    size={20} 
                    color={login?.status === 'success' ? 'var(--color-success)' : 'var(--color-destructive)'} 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    {login?.device} • {login?.location}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {login?.date} at {login?.time}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                login?.status === 'success' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
              }`}>
                {login?.status === 'success' ? 'Success' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;