import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BudgetCreationForm = ({ onCreateBudget, onCancel, editingBudget = null }) => {
  const [formData, setFormData] = useState({
    category: editingBudget?.category || '',
    allocated: editingBudget?.allocated || '',
    currency: editingBudget?.currency || 'USD',
    period: editingBudget?.period || 'Monthly',
    icon: editingBudget?.icon || 'Wallet',
    subcategories: editingBudget?.subcategories?.join(', ') || '',
    alertThreshold: editingBudget?.alertThreshold || 80
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'Food & Dining', label: 'Food & Dining', icon: 'UtensilsCrossed' },
    { value: 'Transportation', label: 'Transportation', icon: 'Car' },
    { value: 'Shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { value: 'Entertainment', label: 'Entertainment', icon: 'Film' },
    { value: 'Bills & Utilities', label: 'Bills & Utilities', icon: 'Receipt' },
    { value: 'Healthcare', label: 'Healthcare', icon: 'Heart' },
    { value: 'Education', label: 'Education', icon: 'GraduationCap' },
    { value: 'Travel', label: 'Travel', icon: 'Plane' },
    { value: 'Savings', label: 'Savings', icon: 'PiggyBank' },
    { value: 'Other', label: 'Other', icon: 'MoreHorizontal' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'BDT', label: 'BDT - Bangladeshi Taka' },
    { value: 'INR', label: 'INR - Indian Rupee' }
  ];

  const periodOptions = [
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Yearly', label: 'Yearly' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.category?.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData?.allocated || parseFloat(formData?.allocated) <= 0) {
      newErrors.allocated = 'Please enter a valid amount';
    }

    if (formData?.alertThreshold < 0 || formData?.alertThreshold > 100) {
      newErrors.alertThreshold = 'Alert threshold must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    const selectedCategory = categoryOptions?.find(cat => cat?.value === formData?.category);
    
    const budgetData = {
      id: editingBudget?.id || Date.now(),
      category: formData?.category,
      allocated: parseFloat(formData?.allocated),
      spent: editingBudget?.spent || 0,
      currency: formData?.currency,
      period: formData?.period,
      icon: selectedCategory?.icon || formData?.icon,
      subcategories: formData?.subcategories 
        ? formData?.subcategories?.split(',')?.map(s => s?.trim())?.filter(s => s)
        : [],
      alertThreshold: parseInt(formData?.alertThreshold),
      createdAt: editingBudget?.createdAt || new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };

    onCreateBudget(budgetData);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Plus" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {editingBudget ? 'Edit Budget' : 'Create New Budget'}
            </h2>
            <p className="text-sm text-muted-foreground">
              Set up your budget parameters and tracking preferences
            </p>
          </div>
        </div>
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            iconName="X"
            iconSize={20}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Budget Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
            searchable
          />

          <Input
            label="Budget Amount"
            type="number"
            placeholder="Enter amount"
            value={formData?.allocated}
            onChange={(e) => handleInputChange('allocated', e?.target?.value)}
            error={errors?.allocated}
            required
            min="0"
            step="0.01"
          />

          <Select
            label="Currency"
            options={currencyOptions}
            value={formData?.currency}
            onChange={(value) => handleInputChange('currency', value)}
            required
          />

          <Select
            label="Time Period"
            options={periodOptions}
            value={formData?.period}
            onChange={(value) => handleInputChange('period', value)}
            required
          />

          <Input
            label="Alert Threshold (%)"
            type="number"
            placeholder="80"
            value={formData?.alertThreshold}
            onChange={(e) => handleInputChange('alertThreshold', e?.target?.value)}
            error={errors?.alertThreshold}
            description="Get notified when spending reaches this percentage"
            min="0"
            max="100"
          />

          <Input
            label="Subcategories (Optional)"
            type="text"
            placeholder="Groceries, Restaurants, Takeout"
            value={formData?.subcategories}
            onChange={(e) => handleInputChange('subcategories', e?.target?.value)}
            description="Separate multiple subcategories with commas"
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            iconName={editingBudget ? "Save" : "Plus"}
            iconPosition="left"
            iconSize={16}
          >
            {editingBudget ? 'Update Budget' : 'Create Budget'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BudgetCreationForm;