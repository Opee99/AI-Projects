import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/ui/Icon';

const TransactionFilters = ({ 
  filters, 
  onFiltersChange, 
  categories, 
  paymentMethods,
  onBulkImport,
  onExportData 
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Sync local date range state with filters
  useEffect(() => {
    if (!filters?.dateRange?.startDate && !filters?.dateRange?.endDate) {
      // Initialize with current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)?.toISOString()?.split('T')?.[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)?.toISOString()?.split('T')?.[0];
      
      onFiltersChange({
        ...filters,
        dateRange: { startDate: startOfMonth, endDate: endOfMonth }
      });
    }
  }, []);

  const handleFilterChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = {
      ...filters?.dateRange,
      [field]: value
    };
    
    onFiltersChange({
      ...filters,
      dateRange: newDateRange
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      paymentMethod: '',
      dateRange: { startDate: '', endDate: '' },
      amountRange: { min: '', max: '' }
    };
    onFiltersChange(clearedFilters);
  };

  const handleBulkImportClick = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls,.json';
    input.onchange = async (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        setIsImporting(true);
        try {
          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 1500));
          onBulkImport(file);
        } catch (error) {
          console.error('Import error:', error);
        } finally {
          setIsImporting(false);
        }
      }
    };
    input?.click();
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      onExportData();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const hasActiveFilters = filters?.search || filters?.category || filters?.paymentMethod || 
    filters?.dateRange?.startDate || filters?.dateRange?.endDate || 
    filters?.amountRange?.min || filters?.amountRange?.max;

  const quickDateRanges = [
    {
      label: 'Today',
      getValue: () => {
        const today = new Date()?.toISOString()?.split('T')?.[0];
        return { startDate: today, endDate: today };
      }
    },
    {
      label: 'This Week',
      getValue: () => {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        return {
          startDate: startOfWeek?.toISOString()?.split('T')?.[0],
          endDate: endOfWeek?.toISOString()?.split('T')?.[0]
        };
      }
    },
    {
      label: 'This Month',
      getValue: () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
          startDate: startOfMonth?.toISOString()?.split('T')?.[0],
          endDate: endOfMonth?.toISOString()?.split('T')?.[0]
        };
      }
    },
    {
      label: 'Last 30 Days',
      getValue: () => {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        return {
          startDate: thirtyDaysAgo?.toISOString()?.split('T')?.[0],
          endDate: new Date()?.toISOString()?.split('T')?.[0]
        };
      }
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl border border-border shadow-elevation-1 p-6 mb-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-1 flex items-center">
              <div className="bg-accent/10 p-2 rounded-lg mr-3">
                <Icon name="Filter" size={18} className="text-accent" />
              </div>
              Filter Transactions
            </h3>
            <p className="text-sm text-muted-foreground">
              Refine your search and analyze specific data
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
            <Button
              variant={showAdvancedFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              className="transition-medium"
            >
              Advanced Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkImportClick}
              iconName="Upload"
              iconPosition="left"
              loading={isImporting}
              className="transition-medium hover:shadow-elevation-1"
            >
              {isImporting ? 'Importing...' : 'Import'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
              loading={isExporting}
              className="transition-medium hover:shadow-elevation-1"
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>

        {/* Basic Filters */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            label="Search"
            type="search"
            placeholder="Search transactions..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="transition-smooth"
          />

          <Select
            label="Category"
            options={[{ value: '', label: 'All Categories' }, ...categories]}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            searchable
            clearable
          />

          <Select
            label="Payment Method"
            options={[{ value: '', label: 'All Methods' }, ...paymentMethods]}
            value={filters?.paymentMethod}
            onChange={(value) => handleFilterChange('paymentMethod', value)}
            clearable
          />

          <div className="flex items-end">
            <Button
              variant={hasActiveFilters ? "destructive" : "ghost"}
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              className="w-full transition-medium"
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
          </div>
        </motion.div>

        {/* Quick Date Range Buttons */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm font-medium text-muted-foreground flex items-center mr-2">
            Quick filters:
          </span>
          {quickDateRanges?.map((range) => (
            <Button
              key={range?.label}
              variant="ghost"
              size="xs"
              onClick={() => handleDateRangeChange('startDate', range?.getValue()?.startDate) || 
                       handleDateRangeChange('endDate', range?.getValue()?.endDate)}
              className="text-xs hover:bg-primary/10 hover:text-primary transition-smooth"
            >
              {range?.label}
            </Button>
          ))}
        </motion.div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={filters?.dateRange?.startDate || ''}
                  onChange={(e) => handleDateRangeChange('startDate', e?.target?.value)}
                  className="transition-smooth"
                />

                <Input
                  label="End Date"
                  type="date"
                  value={filters?.dateRange?.endDate || ''}
                  onChange={(e) => handleDateRangeChange('endDate', e?.target?.value)}
                  className="transition-smooth"
                />

                <Input
                  label="Min Amount"
                  type="number"
                  placeholder="0.00"
                  value={filters?.amountRange?.min || ''}
                  onChange={(e) => handleFilterChange('amountRange', {
                    ...filters?.amountRange,
                    min: e?.target?.value
                  })}
                  step="0.01"
                  min="0"
                  className="transition-smooth"
                />

                <Input
                  label="Max Amount"
                  type="number"
                  placeholder="1000.00"
                  value={filters?.amountRange?.max || ''}
                  onChange={(e) => handleFilterChange('amountRange', {
                    ...filters?.amountRange,
                    max: e?.target?.value
                  })}
                  step="0.01"
                  min="0"
                  className="transition-smooth"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filter Summary */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Active filters applied
                </span>
              </div>
              <Button
                variant="ghost"
                size="xs"
                onClick={clearAllFilters}
                className="text-primary hover:bg-primary/10"
              >
                Clear all
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TransactionFilters;