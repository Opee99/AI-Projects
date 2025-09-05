import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [currentTimezone, setCurrentTimezone] = useState('America/New_York');
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [colorScheme, setColorScheme] = useState('blue');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English', description: 'English (US)' },
    { value: 'bn', label: 'বাংলা', description: 'Bengali' },
    { value: 'es', label: 'Español', description: 'Spanish' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar', description: '$' },
    { value: 'BDT', label: 'BDT - Bangladeshi Taka', description: '৳' },
    { value: 'INR', label: 'INR - Indian Rupee', description: '₹' },
    { value: 'EUR', label: 'EUR - Euro', description: '€' },
    { value: 'GBP', label: 'GBP - British Pound', description: '£' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)', description: 'UTC-5' },
    { value: 'America/Chicago', label: 'Central Time (CT)', description: 'UTC-6' },
    { value: 'America/Denver', label: 'Mountain Time (MT)', description: 'UTC-7' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', description: 'UTC-8' },
    { value: 'Asia/Dhaka', label: 'Bangladesh Time (BST)', description: 'UTC+6' },
    { value: 'Asia/Kolkata', label: 'India Time (IST)', description: 'UTC+5:30' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', description: 'UTC+0' }
  ];

  const colorSchemeOptions = [
    { value: 'blue', label: 'Ocean Blue', description: 'Default blue theme' },
    { value: 'green', label: 'Forest Green', description: 'Nature-inspired green' },
    { value: 'purple', label: 'Royal Purple', description: 'Elegant purple theme' },
    { value: 'orange', label: 'Sunset Orange', description: 'Warm orange theme' }
  ];

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    const savedTimezone = localStorage.getItem('timezone') || 'America/New_York';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedColorScheme = localStorage.getItem('colorScheme') || 'blue';

    setCurrentLanguage(savedLanguage);
    setCurrentCurrency(savedCurrency);
    setCurrentTimezone(savedTimezone);
    setDarkMode(savedDarkMode);
    setHighContrast(savedHighContrast);
    setColorScheme(savedColorScheme);
  }, []);

  const handleLanguageChange = (value) => {
    setCurrentLanguage(value);
    localStorage.setItem('language', value);
  };

  const handleCurrencyChange = (value) => {
    setCurrentCurrency(value);
    localStorage.setItem('currency', value);
  };

  const handleTimezoneChange = (value) => {
    setCurrentTimezone(value);
    localStorage.setItem('timezone', value);
  };

  const handleDarkModeToggle = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', checked?.toString());
  };

  const handleHighContrastToggle = (checked) => {
    setHighContrast(checked);
    localStorage.setItem('highContrast', checked?.toString());
  };

  const handleColorSchemeChange = (value) => {
    setColorScheme(value);
    localStorage.setItem('colorScheme', value);
  };

  const getLanguageText = () => {
    const texts = {
      en: {
        localization: "Localization",
        localizationDesc: "Configure language, currency, and regional settings",
        language: "Display Language",
        languageDesc: "Choose your preferred language for the interface",
        currency: "Primary Currency",
        currencyDesc: "Set your default currency for financial data",
        timezone: "Timezone",
        timezoneDesc: "Select your local timezone for accurate timestamps",
        appearance: "Appearance & Theme",
        appearanceDesc: "Customize the visual appearance of your interface",
        darkMode: "Dark Mode",
        darkModeDesc: "Switch to dark theme for reduced eye strain",
        highContrast: "High Contrast",
        highContrastDesc: "Increase contrast for better accessibility",
        colorScheme: "Color Scheme",
        colorSchemeDesc: "Choose your preferred color theme",
        notifications: "Notification Preferences",
        notificationsDesc: "Control how and when you receive notifications",
        email: "Email Notifications",
        emailDesc: "Receive important updates via email",
        push: "Push Notifications",
        pushDesc: "Get real-time notifications in your browser",
        sms: "SMS Notifications",
        smsDesc: "Receive critical alerts via text message"
      },
      bn: {
        localization: "স্থানীয়করণ",
        localizationDesc: "ভাষা, মুদ্রা এবং আঞ্চলিক সেটিংস কনফিগার করুন",
        language: "প্রদর্শন ভাষা",
        languageDesc: "ইন্টারফেসের জন্য আপনার পছন্দের ভাষা বেছে নিন",
        currency: "প্রাথমিক মুদ্রা",
        currencyDesc: "আর্থিক ডেটার জন্য আপনার ডিফল্ট মুদ্রা সেট করুন",
        timezone: "সময় অঞ্চল",
        timezoneDesc: "সঠিক টাইমস্ট্যাম্পের জন্য আপনার স্থানীয় সময় অঞ্চল নির্বাচন করুন",
        appearance: "চেহারা এবং থিম",
        appearanceDesc: "আপনার ইন্টারফেসের ভিজ্যুয়াল চেহারা কাস্টমাইজ করুন",
        darkMode: "ডার্ক মোড",
        darkModeDesc: "চোখের চাপ কমানোর জন্য ডার্ক থিমে স্যুইচ করুন",
        highContrast: "উচ্চ বৈসাদৃশ্য",
        highContrastDesc: "ভাল অ্যাক্সেসিবিলিটির জন্য বৈসাদৃশ্য বৃদ্ধি করুন",
        colorScheme: "রঙের স্কিম",
        colorSchemeDesc: "আপনার পছন্দের রঙের থিম বেছে নিন",
        notifications: "বিজ্ঞপ্তি পছন্দসমূহ",
        notificationsDesc: "কীভাবে এবং কখন আপনি বিজ্ঞপ্তি পাবেন তা নিয়ন্ত্রণ করুন",
        email: "ইমেইল বিজ্ঞপ্তি",
        emailDesc: "ইমেইলের মাধ্যমে গুরুত্বপূর্ণ আপডেট পান",
        push: "পুশ বিজ্ঞপ্তি",
        pushDesc: "আপনার ব্রাউজারে রিয়েল-টাইম বিজ্ঞপ্তি পান",
        sms: "এসএমএস বিজ্ঞপ্তি",
        smsDesc: "টেক্সট মেসেজের মাধ্যমে গুরুত্বপূর্ণ সতর্কতা পান"
      },
      es: {
        localization: "Localización",
        localizationDesc: "Configurar idioma, moneda y configuraciones regionales",
        language: "Idioma de Visualización",
        languageDesc: "Elige tu idioma preferido para la interfaz",
        currency: "Moneda Principal",
        currencyDesc: "Establece tu moneda predeterminada para datos financieros",
        timezone: "Zona Horaria",
        timezoneDesc: "Selecciona tu zona horaria local para marcas de tiempo precisas",
        appearance: "Apariencia y Tema",
        appearanceDesc: "Personaliza la apariencia visual de tu interfaz",
        darkMode: "Modo Oscuro",
        darkModeDesc: "Cambia al tema oscuro para reducir la fatiga visual",
        highContrast: "Alto Contraste",
        highContrastDesc: "Aumenta el contraste para mejor accesibilidad",
        colorScheme: "Esquema de Color",
        colorSchemeDesc: "Elige tu tema de color preferido",
        notifications: "Preferencias de Notificación",
        notificationsDesc: "Controla cómo y cuándo recibes notificaciones",
        email: "Notificaciones por Email",
        emailDesc: "Recibe actualizaciones importantes por correo electrónico",
        push: "Notificaciones Push",
        pushDesc: "Obtén notificaciones en tiempo real en tu navegador",
        sms: "Notificaciones SMS",
        smsDesc: "Recibe alertas críticas por mensaje de texto"
      }
    };
    return texts?.[currentLanguage] || texts?.en;
  };

  const text = getLanguageText();

  return (
    <div className="space-y-6">
      {/* Localization Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">{text?.localization}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {text?.localizationDesc}
          </p>
        </div>

        <div className="space-y-4">
          <Select
            label={text?.language}
            description={text?.languageDesc}
            options={languageOptions}
            value={currentLanguage}
            onChange={handleLanguageChange}
            className="mb-4"
          />

          <Select
            label={text?.currency}
            description={text?.currencyDesc}
            options={currencyOptions}
            value={currentCurrency}
            onChange={handleCurrencyChange}
            className="mb-4"
          />

          <Select
            label={text?.timezone}
            description={text?.timezoneDesc}
            options={timezoneOptions}
            value={currentTimezone}
            onChange={handleTimezoneChange}
            searchable
          />
        </div>
      </div>
      {/* Appearance Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">{text?.appearance}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {text?.appearanceDesc}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={darkMode ? "Moon" : "Sun"} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{text?.darkMode}</h4>
                <p className="text-sm text-muted-foreground">
                  {text?.darkModeDesc}
                </p>
              </div>
            </div>
            <Checkbox
              checked={darkMode}
              onChange={(e) => handleDarkModeToggle(e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{text?.highContrast}</h4>
                <p className="text-sm text-muted-foreground">
                  {text?.highContrastDesc}
                </p>
              </div>
            </div>
            <Checkbox
              checked={highContrast}
              onChange={(e) => handleHighContrastToggle(e?.target?.checked)}
            />
          </div>

          <Select
            label={text?.colorScheme}
            description={text?.colorSchemeDesc}
            options={colorSchemeOptions}
            value={colorScheme}
            onChange={handleColorSchemeChange}
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">{text?.notifications}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {text?.notificationsDesc}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{text?.email}</h4>
                <p className="text-sm text-muted-foreground">
                  {text?.emailDesc}
                </p>
              </div>
            </div>
            <Checkbox
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Bell" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{text?.push}</h4>
                <p className="text-sm text-muted-foreground">
                  {text?.pushDesc}
                </p>
              </div>
            </div>
            <Checkbox
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={20} color="var(--color-secondary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{text?.sms}</h4>
                <p className="text-sm text-muted-foreground">
                  {text?.smsDesc}
                </p>
              </div>
            </div>
            <Checkbox
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;