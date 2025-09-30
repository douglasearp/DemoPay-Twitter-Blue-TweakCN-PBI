import React, { useState } from 'react';
import { X, Building, Calendar, DollarSign } from 'lucide-react';
import type { BillPayment } from '../types';

interface Biller {
  id: string;
  name: string;
  category: string;
  autoPayAvailable: boolean;
}

interface PaymentSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  biller: Biller | null;
  payment?: BillPayment | null;
  onSave: (paymentData: Partial<BillPayment>) => void;
}

const PaymentSetupModal: React.FC<PaymentSetupModalProps> = ({ 
  isOpen, 
  onClose, 
  biller, 
  payment,
  onSave 
}) => {
  const [formData, setFormData] = useState({
    accountNumber: payment?.description || '',
    paymentType: 'one-time' as 'one-time' | 'scheduled' | 'recurring',
    amount: payment?.amount?.toString() || '',
    dueDate: payment?.dueDate || new Date().toISOString().split('T')[0],
    discountCode: '',
    paymentMethod: payment?.paymentMethod || 'ACH' as 'RTP' | 'ACH' | 'DEBIT CARD' | 'CREDIT CARD',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentData: Partial<BillPayment> = {
      id: payment?.id || Date.now().toString(),
      vendor: biller?.name || payment?.vendor || '',
      description: formData.accountNumber,
      dueDate: formData.dueDate,
      amount: parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      status: 'scheduled',
      frequency: formData.paymentType === 'recurring' ? 'monthly' : 'one-time'
    };

    onSave(paymentData);
    onClose();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'telecommunications':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'subscription':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'healthcare':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'credit card':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'insurance':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
      case 'utilities':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {payment ? 'Edit Payment' : `Set Up Payment - ${biller?.name}`}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Biller Info */}
          {biller && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{biller.name}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(biller.category)}`}>
                    {biller.category}
                  </span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.accountNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Enter your account number"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Account number (usually 12 digits)
                </p>
              </div>
            </div>

            {/* Payment Type */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Type</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value="one-time"
                    checked={formData.paymentType === 'one-time'}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentType: e.target.value as any }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">One-time Payment</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value="scheduled"
                    checked={formData.paymentType === 'scheduled'}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentType: e.target.value as any }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">Scheduled Payment (Future Date)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value="recurring"
                    checked={formData.paymentType === 'recurring'}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentType: e.target.value as any }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">Recurring Monthly Payment</span>
                </label>
              </div>
            </div>

            {/* Payment Amount and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Amount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Discount Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.discountCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, discountCode: e.target.value }))}
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Enter discount code (try: SAVE10 or WELCOME5)"
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Payment Method *
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'RTP' }))}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    formData.paymentMethod === 'RTP'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">RTP (Real-Time Payments)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instant bank transfers</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'ACH' }))}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    formData.paymentMethod === 'ACH'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">ACH</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Standard bank transfer</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'DEBIT CARD' }))}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    formData.paymentMethod === 'DEBIT CARD'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">Debit Card</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Direct debit payment</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'CREDIT CARD' }))}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    formData.paymentMethod === 'CREDIT CARD'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">Credit Card</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Credit card payment</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'FED NOW' }))}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    formData.paymentMethod === 'FED NOW'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">FedNow</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instant federal payments</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'FED WIRE' }))}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    formData.paymentMethod === 'FED WIRE'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">Fed Wire</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Federal wire transfer</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'TABAPAY' }))}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    formData.paymentMethod === 'TABAPAY'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <p className="font-medium text-gray-900 dark:text-white">TabaPay</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">TabaPay network</p>
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="Additional notes..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {payment ? 'Update Payment' : 'Set Up Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentSetupModal;