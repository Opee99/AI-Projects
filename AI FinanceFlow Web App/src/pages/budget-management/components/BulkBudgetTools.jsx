import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkBudgetTools = ({ budgets, onBulkUpdate, onBulkDelete }) => {
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('percentage');
  const [adjustmentValue, setAdjustmentValue] = useState('');
  const [newCurrency, setNewCurrency] = useState('USD');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'adjust_amounts', label: 'Adjust Budget Amounts' },
    { value: 'change_currency', label: 'Change Currency' },
    { value: 'reset_spending', label: 'Reset Spending to Zero' },
    { value: 'duplicate', label: 'Duplicate Budgets' },
    { value: 'archive', label: 'Archive Budgets' },
    { value: 'delete', label: 'Delete Budgets' }
  ];

  const adjustmentTypeOptions = [
    { value: 'percentage', label: 'Percentage (%)' },
    { value: 'fixed', label: 'Fixed Amount ($)' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'BDT', label: 'BDT - Bangladeshi Taka' },
    { value: 'INR', label: 'INR - Indian Rupee' }
  ];

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedBudgets(budgets?.map(budget => budget?.id));
    } else {
      setSelectedBudgets([]);
    }
  };

  const handleSelectBudget = (budgetId, checked) => {
    if (checked) {
      setSelectedBudgets(prev => [...prev, budgetId]);
    } else {
      setSelectedBudgets(prev => prev?.filter(id => id !== budgetId));
    }
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const calculateAdjustedAmount = (originalAmount) => {
    if (!adjustmentValue) return originalAmount;
    
    const value = parseFloat(adjustmentValue);
    if (adjustmentType === 'percentage') {
      return originalAmount * (1 + value / 100);
    } else {
      return originalAmount + value;
    }
  };

  const handleBulkAction = async () => {
    if (selectedBudgets?.length === 0) {
      alert('Please select at least one budget');
      return;
    }

    if (!bulkAction) {
      alert('Please select an action');
      return;
    }

    setIsProcessing(true);

    try {
      const selectedBudgetObjects = budgets?.filter(budget => selectedBudgets?.includes(budget?.id));

      switch (bulkAction) {
        case 'adjust_amounts':
          if (!adjustmentValue) {
            alert('Please enter an adjustment value');
            setIsProcessing(false);
            return;
          }
          const adjustedBudgets = selectedBudgetObjects?.map(budget => ({
            ...budget,
            allocated: Math.max(0, calculateAdjustedAmount(budget?.allocated)),
            updatedAt: new Date()?.toISOString()
          }));
          onBulkUpdate(adjustedBudgets);
          break;

        case 'change_currency':
          const currencyUpdatedBudgets = selectedBudgetObjects?.map(budget => ({
            ...budget,
            currency: newCurrency,
            updatedAt: new Date()?.toISOString()
          }));
          onBulkUpdate(currencyUpdatedBudgets);
          break;

        case 'reset_spending':
          const resetBudgets = selectedBudgetObjects?.map(budget => ({
            ...budget,
            spent: 0,
            updatedAt: new Date()?.toISOString()
          }));
          onBulkUpdate(resetBudgets);
          break;

        case 'duplicate':
          const duplicatedBudgets = selectedBudgetObjects?.map(budget => ({
            ...budget,
            id: Date.now() + Math.random(),
            category: `${budget?.category} (Copy)`,
            spent: 0,
            createdAt: new Date()?.toISOString(),
            updatedAt: new Date()?.toISOString()
          }));
          onBulkUpdate([...budgets, ...duplicatedBudgets]);
          break;

        case 'archive':
          const archivedBudgets = selectedBudgetObjects?.map(budget => ({
            ...budget,
            archived: true,
            updatedAt: new Date()?.toISOString()
          }));
          onBulkUpdate(archivedBudgets);
          break;

        case 'delete':
          if (window.confirm(`Are you sure you want to delete ${selectedBudgets?.length} budget(s)?`)) {
            onBulkDelete(selectedBudgets);
          }
          break;

        default:
          break;
      }

      setSelectedBudgets([]);
      setBulkAction('');
      setAdjustmentValue('');
    } catch (error) {
      console.error('Bulk action failed:', error);
      alert('An error occurred while processing the bulk action');
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'adjust_amounts': return 'Calculator';
      case 'change_currency': return 'DollarSign';
      case 'reset_spending': return 'RotateCcw';
      case 'duplicate': return 'Copy';
      case 'archive': return 'Archive';
      case 'delete': return 'Trash2';
      default: return 'Settings';
    }
  };

  if (!budgets || budgets?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Settings" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Budgets Available</h3>
        <p className="text-muted-foreground">Create budgets to use bulk management tools.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Bulk Budget Management</h2>
          <p className="text-sm text-muted-foreground">
            Manage multiple budgets simultaneously with bulk operations
          </p>
        </div>
      </div>
      {/* Budget Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selectedBudgets?.length === budgets?.length}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
              label="Select All"
            />
            <span className="text-sm text-muted-foreground">
              {selectedBudgets?.length} of {budgets?.length} selected
            </span>
          </div>
          
          {selectedBudgets?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBudgets([])}
              iconName="X"
              iconSize={16}
            >
              Clear Selection
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
          {budgets?.map((budget) => (
            <div
              key={budget?.id}
              className={`border rounded-lg p-3 transition-smooth cursor-pointer ${
                selectedBudgets?.includes(budget?.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelectBudget(budget?.id, !selectedBudgets?.includes(budget?.id))}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedBudgets?.includes(budget?.id)}
                  onChange={(e) => handleSelectBudget(budget?.id, e?.target?.checked)}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{budget?.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(budget?.allocated, budget?.currency)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bulk Actions */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Bulk Action"
            options={bulkActionOptions}
            value={bulkAction}
            onChange={setBulkAction}
            placeholder="Choose an action"
          />

          {bulkAction === 'adjust_amounts' && (
            <div className="space-y-4">
              <Select
                label="Adjustment Type"
                options={adjustmentTypeOptions}
                value={adjustmentType}
                onChange={setAdjustmentType}
              />
              <Input
                label={`Adjustment Value ${adjustmentType === 'percentage' ? '(%)' : '($)'}`}
                type="number"
                placeholder={adjustmentType === 'percentage' ? '10' : '100'}
                value={adjustmentValue}
                onChange={(e) => setAdjustmentValue(e?.target?.value)}
                description={
                  adjustmentType === 'percentage' ?'Positive values increase, negative values decrease' :'Positive values add, negative values subtract'
                }
              />
            </div>
          )}

          {bulkAction === 'change_currency' && (
            <Select
              label="New Currency"
              options={currencyOptions}
              value={newCurrency}
              onChange={setNewCurrency}
            />
          )}
        </div>

        {/* Preview */}
        {bulkAction && selectedBudgets?.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Preview Changes</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {budgets?.filter(budget => selectedBudgets?.includes(budget?.id))?.slice(0, 5)?.map((budget) => (
                  <div key={budget?.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{budget?.category}</span>
                    <span className="text-muted-foreground">
                      {bulkAction === 'adjust_amounts' && adjustmentValue && (
                        <>
                          {formatCurrency(budget?.allocated, budget?.currency)} → {formatCurrency(calculateAdjustedAmount(budget?.allocated), budget?.currency)}
                        </>
                      )}
                      {bulkAction === 'change_currency' && (
                        <>
                          {budget?.currency} → {newCurrency}
                        </>
                      )}
                      {bulkAction === 'reset_spending' && (
                        <>
                          Spent: {formatCurrency(budget?.spent, budget?.currency)} → {formatCurrency(0, budget?.currency)}
                        </>
                      )}
                      {(bulkAction === 'duplicate' || bulkAction === 'archive' || bulkAction === 'delete') && (
                        <span className="capitalize">{bulkAction?.replace('_', ' ')}</span>
                      )}
                    </span>
                  </div>
                ))}
              {selectedBudgets?.length > 5 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{selectedBudgets?.length - 5} more budgets
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedBudgets([]);
              setBulkAction('');
              setAdjustmentValue('');
            }}
            disabled={isProcessing}
          >
            Reset
          </Button>
          <Button
            onClick={handleBulkAction}
            disabled={!bulkAction || selectedBudgets?.length === 0 || isProcessing}
            loading={isProcessing}
            iconName={getActionIcon(bulkAction)}
            iconPosition="left"
            iconSize={16}
            variant={bulkAction === 'delete' ? 'destructive' : 'default'}
          >
            {isProcessing ? 'Processing...' : `Apply to ${selectedBudgets?.length} Budget${selectedBudgets?.length !== 1 ? 's' : ''}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkBudgetTools;