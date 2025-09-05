import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BiometricPrompt = ({ isVisible, onClose, language }) => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState('idle'); // idle, authenticating, success, error

  const translations = {
    en: {
      biometricAuth: 'Biometric Authentication',
      touchSensor: 'Touch the fingerprint sensor or look at the camera',
      authenticating: 'Authenticating...',
      authSuccess: 'Authentication Successful',
      authFailed: 'Authentication Failed',
      tryAgain: 'Try Again',
      usePassword: 'Use Password Instead',
      cancel: 'Cancel'
    },
    bn: {
      biometricAuth: 'বায়োমেট্রিক প্রমাণীকরণ',
      touchSensor: 'ফিঙ্গারপ্রিন্ট সেন্সর স্পর্শ করুন বা ক্যামেরার দিকে তাকান',
      authenticating: 'প্রমাণীকরণ করা হচ্ছে...',
      authSuccess: 'প্রমাণীকরণ সফল',
      authFailed: 'প্রমাণীকরণ ব্যর্থ',
      tryAgain: 'আবার চেষ্টা করুন',
      usePassword: 'পাসওয়ার্ড ব্যবহার করুন',
      cancel: 'বাতিল'
    },
    es: {
      biometricAuth: 'Autenticación Biométrica',
      touchSensor: 'Toca el sensor de huella o mira a la cámara',
      authenticating: 'Autenticando...',
      authSuccess: 'Autenticación Exitosa',
      authFailed: 'Autenticación Fallida',
      tryAgain: 'Intentar de Nuevo',
      usePassword: 'Usar Contraseña',
      cancel: 'Cancelar'
    }
  };

  const t = translations?.[language] || translations?.en;

  useEffect(() => {
    if (isVisible) {
      setAuthStatus('idle');
      setIsAuthenticating(false);
    }
  }, [isVisible]);

  const simulateBiometricAuth = async () => {
    setIsAuthenticating(true);
    setAuthStatus('authenticating');

    try {
      // Simulate biometric authentication delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate 80% success rate
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        setAuthStatus('success');
        
        // Store user info
        localStorage.setItem('userInfo', JSON.stringify({
          email: 'biometric@financeflow.com',
          type: 'Biometric User',
          loginTime: new Date()?.toISOString(),
          authMethod: 'biometric'
        }));

        // Navigate to dashboard after short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setAuthStatus('error');
      }
    } catch (error) {
      setAuthStatus('error');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleTryAgain = () => {
    simulateBiometricAuth();
  };

  const handleUsePassword = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-elevation-5 w-full max-w-md p-6">
        <div className="text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon 
                name="Fingerprint" 
                size={32} 
                color="var(--color-primary)"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t?.biometricAuth}
            </h3>
            <p className="text-sm text-muted-foreground">
              {authStatus === 'authenticating' ? t?.authenticating : 
               authStatus === 'success' ? t?.authSuccess :
               authStatus === 'error' ? t?.authFailed :
               t?.touchSensor}
            </p>
          </div>

          {/* Authentication Status Indicator */}
          <div className="mb-6">
            {authStatus === 'idle' && (
              <div className="w-12 h-12 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-pulse"></div>
            )}
            
            {authStatus === 'authenticating' && (
              <div className="w-12 h-12 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            )}
            
            {authStatus === 'success' && (
              <div className="w-12 h-12 mx-auto bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={24} color="white" strokeWidth={3} />
              </div>
            )}
            
            {authStatus === 'error' && (
              <div className="w-12 h-12 mx-auto bg-error rounded-full flex items-center justify-center">
                <Icon name="X" size={24} color="white" strokeWidth={3} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {authStatus === 'idle' && (
              <>
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={simulateBiometricAuth}
                  iconName="Fingerprint"
                  iconPosition="left"
                >
                  Start Authentication
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  fullWidth
                  onClick={handleUsePassword}
                >
                  {t?.usePassword}
                </Button>
              </>
            )}

            {authStatus === 'authenticating' && (
              <Button
                variant="outline"
                size="default"
                fullWidth
                onClick={onClose}
              >
                {t?.cancel}
              </Button>
            )}

            {authStatus === 'success' && (
              <div className="text-success text-sm font-medium">
                Redirecting to dashboard...
              </div>
            )}

            {authStatus === 'error' && (
              <>
                <Button
                  variant="default"
                  size="default"
                  fullWidth
                  onClick={handleTryAgain}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  {t?.tryAgain}
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  fullWidth
                  onClick={handleUsePassword}
                >
                  {t?.usePassword}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricPrompt;