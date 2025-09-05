import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TransactionForm = ({ onAddTransaction, currencies, categories, paymentMethods }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    paymentMethod: '',
    currency: 'USD',
    date: new Date()?.toISOString()?.split('T')?.[0]
  });
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData?.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }
    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onAddTransaction({
        ...formData,
        amount: parseFloat(formData?.amount),
        id: Date.now(),
        timestamp: new Date()?.toISOString()
      });
      
      // Reset form
      setFormData({
        amount: '',
        description: '',
        category: '',
        paymentMethod: '',
        currency: 'USD',
        date: new Date()?.toISOString()?.split('T')?.[0]
      });
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoiceCommand = async () => {
    setIsVoiceRecording(!isVoiceRecording);
    
    if (!isVoiceRecording) {
      // Mock voice recognition
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          description: 'Coffee at Starbucks',
          amount: '4.50',
          category: 'food-dining'
        }));
        setIsVoiceRecording(false);
      }, 2000);
    }
  };

  const clearForm = () => {
    setFormData({
      amount: '',
      description: '',
      category: '',
      paymentMethod: '',
      currency: 'USD',
      date: new Date()?.toISOString()?.split('T')?.[0]
    });
    setErrors({});
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-xl border border-border shadow-elevation-2 p-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-elevation-2 flex items-center space-x-2 z-10"
          >
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Transaction added successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground flex items-center">
              <div className="bg-primary/10 p-2 rounded-lg mr-3">
                <Icon name="Plus" size={20} className="text-primary" />
              </div>
              Add New Transaction
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Record your expenses and income with ease
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearForm}
              iconName="RotateCcw"
              iconPosition="left"
              className="transition-medium"
            >
              Clear
            </Button>
            <Button
              variant={isVoiceRecording ? "destructive" : "outline"}
              size="sm"
              onClick={handleVoiceCommand}
              iconName={isVoiceRecording ? "MicOff" : "Mic"}
              iconPosition="left"
              className="transition-medium"
              disabled={isSubmitting}
            >
              {isVoiceRecording ? (
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  Recording...
                </motion.span>
              ) : (
                'Voice Entry'
              )}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Input
                label="Amount"
                type="number"
                placeholder="0.00"
                value={formData?.amount}
                onChange={(e) => handleInputChange('amount', e?.target?.value)}
                required
                step="0.01"
                min="0"
                error={errors?.amount}
                className="transition-smooth focus:ring-2 focus:ring-primary/50"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Select
                label="Currency"
                options={currencies}
                value={formData?.currency}
                onChange={(value) => handleInputChange('currency', value)}
                required
                error={errors?.currency}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              label="Description"
              type="text"
              placeholder="Enter transaction description"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
              error={errors?.description}
              className="transition-smooth focus:ring-2 focus:ring-primary/50"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Select
                label="Category"
                options={categories}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                searchable
                required
                placeholder="Select a category"
                error={errors?.category}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Select
                label="Payment Method"
                options={paymentMethods}
                value={formData?.paymentMethod}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                required
                placeholder="Select payment method"
                error={errors?.paymentMethod}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Input
              label="Date"
              type="date"
              value={formData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              required
              error={errors?.date}
              className="transition-smooth focus:ring-2 focus:ring-primary/50"
            />
          </motion.div>

          <motion.div 
            className="flex justify-end pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
              loading={isSubmitting}
              disabled={isSubmitting || !formData?.amount || !formData?.description || !formData?.category || !formData?.paymentMethod}
              className="min-w-[140px] transition-medium hover:shadow-elevation-2"
            >
              {isSubmitting ? 'Adding...' : 'Add Transaction'}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default TransactionForm;