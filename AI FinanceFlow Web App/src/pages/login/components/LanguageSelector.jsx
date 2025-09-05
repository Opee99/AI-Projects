import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';


const LanguageSelector = ({ currentLanguage, onLanguageChange, className = '' }) => {
  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'bn', label: 'বাংলা', flag: '🇧🇩' },
    { value: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  const handleLanguageChange = (selectedLanguage) => {
    onLanguageChange(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
  };

  const formatOptionLabel = (option) => (
    <div className="flex items-center space-x-2">
      <span className="text-base">{option?.flag}</span>
      <span>{option?.label}</span>
    </div>
  );

  const formattedOptions = languageOptions?.map(option => ({
    ...option,
    label: formatOptionLabel(option)
  }));

  return (
    <div className={`w-40 ${className}`}>
      <Select
        options={formattedOptions}
        value={currentLanguage}
        onChange={handleLanguageChange}
        placeholder="Language"
        className="text-sm"
      />
    </div>
  );
};

export default LanguageSelector;