import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TransactionList = ({ 
  transactions, 
  categories, 
  paymentMethods, 
  onEditTransaction, 
  onDeleteTransaction,
  currencies 
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditStart = (transaction) => {
    setEditingId(transaction?.id);
    setEditForm({ ...transaction });
  };

  const handleEditSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      onEditTransaction(editForm);
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating transaction:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDelete = async (transactionId) => {
    setDeletingId(transactionId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      onDeleteTransaction(transactionId);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleTransactionSelection = (transactionId) => {
    setSelectedTransactions(prev => 
      prev?.includes(transactionId)
        ? prev?.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const selectAllTransactions = () => {
    if (selectedTransactions?.length === transactions?.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions?.map(t => t?.id));
    }
  };

  const handleBulkDelete = async () => {
    const idsToDelete = [...selectedTransactions];
    setSelectedTransactions([]);
    
    for (const id of idsToDelete) {
      await handleDelete(id);
    }
  };

  const getCategoryIcon = (categoryValue) => {
    const categoryMap = {
      'food-dining': 'UtensilsCrossed',
      'transportation': 'Car',
      'shopping': 'ShoppingBag',
      'entertainment': 'Film',
      'healthcare': 'Heart',
      'utilities': 'Zap',
      'education': 'GraduationCap',
      'travel': 'Plane',
      'income': 'TrendingUp',
      'other': 'MoreHorizontal'
    };
    return categoryMap?.[categoryValue] || 'MoreHorizontal';
  };

  const getPaymentMethodIcon = (method) => {
    const methodMap = {
      'credit-card': 'CreditCard',
      'debit-card': 'CreditCard',
      'cash': 'Banknote',
      'bank-transfer': 'Building2',
      'paypal': 'Wallet',
      'venmo': 'Smartphone'
    };
    return methodMap?.[method] || 'CreditCard';
  };

  const formatAmount = (amount, currency) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    });
    return formatter?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAmountColor = (amount, category) => {
    if (category === 'income') {
      return 'text-success';
    }
    return amount > 100 ? 'text-destructive' : 'text-foreground';
  };

  if (transactions?.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-xl border border-border shadow-elevation-1 p-12 text-center"
      >
        <div className="bg-muted/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Icon name="Receipt" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Transactions Found</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Start by adding your first transaction or adjust your filters to see more results.
        </p>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          className="transition-medium"
        >
          Add First Transaction
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl border border-border shadow-elevation-1 overflow-hidden"
    >
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-muted/30 to-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.length === transactions?.length && transactions?.length > 0}
                  onChange={selectAllTransactions}
                  className="rounded border-border transition-smooth"
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Date</th>
              <th className="text-left p-4 font-medium text-foreground">Description</th>
              <th className="text-left p-4 font-medium text-foreground">Category</th>
              <th className="text-left p-4 font-medium text-foreground">Payment Method</th>
              <th className="text-right p-4 font-medium text-foreground">Amount</th>
              <th className="text-center p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {transactions?.map((transaction, index) => (
                <motion.tr 
                  key={transaction?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border-b border-border hover:bg-gradient-to-r hover:from-muted/10 hover:to-muted/20 transition-all duration-200 ${
                    deletingId === transaction?.id ? 'opacity-50' : ''
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedTransactions?.includes(transaction?.id)}
                      onChange={() => toggleTransactionSelection(transaction?.id)}
                      className="rounded border-border transition-smooth"
                    />
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatDate(transaction?.date)}
                  </td>
                  <td className="p-4">
                    {editingId === transaction?.id ? (
                      <Input
                        type="text"
                        value={editForm?.description}
                        onChange={(e) => handleEditChange('description', e?.target?.value)}
                        className="w-full"
                      />
                    ) : (
                      <div className="font-medium text-foreground">{transaction?.description}</div>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === transaction?.id ? (
                      <Select
                        options={categories}
                        value={editForm?.category}
                        onChange={(value) => handleEditChange('category', value)}
                      />
                    ) : (
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                          <Icon 
                            name={getCategoryIcon(transaction?.category)} 
                            size={14} 
                            className="text-primary" 
                          />
                        </div>
                        <span className="text-sm text-foreground">
                          {categories?.find(c => c?.value === transaction?.category)?.label || transaction?.category}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === transaction?.id ? (
                      <Select
                        options={paymentMethods}
                        value={editForm?.paymentMethod}
                        onChange={(value) => handleEditChange('paymentMethod', value)}
                      />
                    ) : (
                      <div className="flex items-center">
                        <div className="bg-accent/10 p-1.5 rounded-md mr-2">
                          <Icon 
                            name={getPaymentMethodIcon(transaction?.paymentMethod)} 
                            size={14} 
                            className="text-accent" 
                          />
                        </div>
                        <span className="text-sm text-foreground">
                          {paymentMethods?.find(p => p?.value === transaction?.paymentMethod)?.label || transaction?.paymentMethod}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === transaction?.id ? (
                      <Input
                        type="number"
                        value={editForm?.amount}
                        onChange={(e) => handleEditChange('amount', parseFloat(e?.target?.value))}
                        step="0.01"
                        className="w-24 text-right"
                      />
                    ) : (
                      <span className={`font-semibold ${getAmountColor(transaction?.amount, transaction?.category)}`}>
                        {formatAmount(transaction?.amount, transaction?.currency)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      {editingId === transaction?.id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleEditSave}
                            iconName="Check"
                            className="text-success hover:bg-success/10 transition-medium"
                            loading={isSaving}
                            disabled={isSaving}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleEditCancel}
                            iconName="X"
                            className="text-muted-foreground hover:bg-muted/20 transition-medium"
                            disabled={isSaving}
                          />
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditStart(transaction)}
                            iconName="Edit"
                            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-medium"
                            disabled={deletingId === transaction?.id}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(transaction?.id)}
                            iconName="Trash2"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-medium"
                            loading={deletingId === transaction?.id}
                            disabled={deletingId === transaction?.id}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        <AnimatePresence>
          {transactions?.map((transaction, index) => (
            <motion.div 
              key={transaction?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-4 hover:bg-muted/30 transition-smooth ${
                deletingId === transaction?.id ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedTransactions?.includes(transaction?.id)}
                    onChange={() => toggleTransactionSelection(transaction?.id)}
                    className="rounded border-border"
                  />
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon 
                      name={getCategoryIcon(transaction?.category)} 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{transaction?.description}</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(transaction?.date)}</p>
                  </div>
                </div>
                <span className={`font-semibold text-lg ${getAmountColor(transaction?.amount, transaction?.category)}`}>
                  {formatAmount(transaction?.amount, transaction?.currency)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Icon 
                      name={getCategoryIcon(transaction?.category)} 
                      size={12} 
                      className="mr-1 text-muted-foreground" 
                    />
                    <span className="text-xs text-muted-foreground">
                      {categories?.find(c => c?.value === transaction?.category)?.label || transaction?.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Icon 
                      name={getPaymentMethodIcon(transaction?.paymentMethod)} 
                      size={12} 
                      className="mr-1 text-muted-foreground" 
                    />
                    <span className="text-xs text-muted-foreground">
                      {paymentMethods?.find(p => p?.value === transaction?.paymentMethod)?.label || transaction?.paymentMethod}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditStart(transaction)}
                    iconName="Edit"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-medium w-8 h-8"
                    disabled={deletingId === transaction?.id}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(transaction?.id)}
                    iconName="Trash2"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-medium w-8 h-8"
                    loading={deletingId === transaction?.id}
                    disabled={deletingId === transaction?.id}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedTransactions?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="border-t border-border p-4 bg-gradient-to-r from-muted/20 to-muted/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Icon name="CheckSquare" size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {selectedTransactions?.length} transaction{selectedTransactions?.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  iconName="Trash2"
                  iconPosition="left"
                  className="transition-medium"
                >
                  Delete Selected
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTransactions([])}
                  iconName="X"
                  className="transition-medium"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TransactionList;