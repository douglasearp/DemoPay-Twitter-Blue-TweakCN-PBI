import React, { useState, useEffect } from 'react';
import { X, Send, Calculator, Clock, Shield, AlertCircle } from 'lucide-react';
import { mockExchangeRates } from '../data/mockData';
import type { Recipient, RemittanceTransaction, ExchangeRate } from '../types';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient?: Recipient | null;
  recipients: Recipient[];
  onSend: (transaction: Partial<RemittanceTransaction>) => void;
}

const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ 
  isOpen, 
  onClose, 
  recipient, 
  recipients, 
  onSend 
}) => {
  const [step, setStep] = useState<'amount' | 'review' | 'confirm'>('amount');
  const [formData, setFormData] = useState({
    recipientId: recipient?.id || '',
    sendAmount: '',
    sendCurrency: 'USD',
    purpose: 'Business Payment'
  });
  
  const [calculation, setCalculation] = useState({
    exchangeRate: 0,
    fees: 0,
    receiveAmount: 0,
    totalCost: 0
  });

  const selectedRecipient = recipients.find(r => r.id === formData.recipientId) || recipient;
  const exchangeRate = mockExchangeRates.find(
    rate => rate.fromCurrency === formData.sendCurrency && 
            rate.toCurrency === selectedRecipient?.currency
  );

  useEffect(() => {
    if (recipient) {
      setFormData(prev => ({ ...prev, recipientId: recipient.id }));
    }
  }, [recipient]);

  useEffect(() => {
    if (formData.sendAmount && exchangeRate && selectedRecipient) {
      const amount = parseFloat(formData.sendAmount) || 0;
      const fixedFee = exchangeRate.fees.fixed;
      const percentageFee = amount * (exchangeRate.fees.percentage / 100);
      const totalFees = fixedFee + percentageFee;
      const receiveAmount = amount * exchangeRate.rate;
      const totalCost = amount + totalFees;

      setCalculation({
        exchangeRate: exchangeRate.rate,
        fees: totalFees,
        receiveAmount,
        totalCost
      });
    } else {
      setCalculation({
        exchangeRate: 0,
        fees: 0,
        receiveAmount: 0,
        totalCost: 0
      });
    }
  }, [formData.sendAmount, exchangeRate, selectedRecipient]);

  const handleNext = () => {
    if (step === 'amount') {
      setStep('review');
    } else if (step === 'review') {
      setStep('confirm');
    }
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('review');
    } else if (step === 'review') {
      setStep('amount');
    }
  };

  const handleSend = () => {
    if (!selectedRecipient) return;

    const transaction: Partial<RemittanceTransaction> = {
      recipientId: selectedRecipient.id,
      recipientName: selectedRecipient.name,
      sendAmount: parseFloat(formData.sendAmount),
      sendCurrency: formData.sendCurrency,
      receiveAmount: calculation.receiveAmount,
      receiveCurrency: selectedRecipient.currency,
      exchangeRate: calculation.exchangeRate,
      fees: calculation.fees,
      totalCost: calculation.totalCost,
      purpose: formData.purpose
    };

    onSend(transaction);
    onClose();
    setStep('amount');
    setFormData({
      recipientId: '',
      sendAmount: '',
      sendCurrency: 'USD',
      purpose: 'Business Payment'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Send className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send Money</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'amount' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className={`w-16 h-1 ${
                step === 'amount' ? 'bg-gray-300 dark:bg-gray-600' : 'bg-green-600'
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'amount' ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400' :
                step === 'review' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
                <span className="text-sm font-medium">2</span>
              </div>
              <div className={`w-16 h-1 ${
                step === 'confirm' ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'confirm' ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
              }`}>
                <span className="text-sm font-medium">3</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {step === 'amount' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transfer Details</h4>
                
                {/* Recipient Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Send to *
                  </label>
                  <select
                    required
                    value={formData.recipientId}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipientId: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="">Select recipient</option>
                    {recipients.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} - {r.country} ({r.currency})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Send Amount *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      required
                      value={formData.sendAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, sendAmount: e.target.value }))}
                      className="w-full pl-8 pr-16 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-lg font-semibold"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">{formData.sendCurrency}</span>
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Purpose of Transfer *
                  </label>
                  <select
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="Business Payment">Business Payment</option>
                    <option value="Supplier Payment">Supplier Payment</option>
                    <option value="Contractor Payment">Contractor Payment</option>
                    <option value="Invoice Payment">Invoice Payment</option>
                    <option value="Service Payment">Service Payment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Live Calculation */}
                {selectedRecipient && formData.sendAmount && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center mb-4">
                      <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <h5 className="font-semibold text-gray-900 dark:text-white">Transfer Summary</h5>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Send Amount:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${parseFloat(formData.sendAmount).toLocaleString()} {formData.sendCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Exchange Rate:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          1 {formData.sendCurrency} = {calculation.exchangeRate} {selectedRecipient.currency}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Transfer Fee:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${calculation.fees.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900 dark:text-white">Total Cost:</span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${calculation.totalCost.toFixed(2)} {formData.sendCurrency}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold text-green-600 dark:text-green-400">Recipient Gets:</span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            {calculation.receiveAmount.toLocaleString()} {selectedRecipient.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'review' && selectedRecipient && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Transfer</h4>
                
                {/* Recipient Info */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Recipient Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedRecipient.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Country:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedRecipient.country}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Bank:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedRecipient.bankName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Account:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ****{selectedRecipient.accountNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transfer Summary */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Transfer Summary</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Send Amount:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${parseFloat(formData.sendAmount).toLocaleString()} {formData.sendCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Transfer Fee:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${calculation.fees.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Exchange Rate:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {calculation.exchangeRate}
                      </span>
                    </div>
                    <div className="border-t border-blue-200 dark:border-blue-600 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">Total Cost:</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${calculation.totalCost.toFixed(2)} {formData.sendCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="font-semibold text-green-600 dark:text-green-400">Recipient Gets:</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {calculation.receiveAmount.toLocaleString()} {selectedRecipient.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">Estimated Delivery</p>
                    <p className="text-sm text-green-600 dark:text-green-400">1-2 business days</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Confirm Transfer</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Please review and confirm your international money transfer
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-300">Important Notice</h5>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                      Once confirmed, this transfer cannot be cancelled. Please ensure all details are correct.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Final Transfer Details</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">To:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedRecipient?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${parseFloat(formData.sendAmount).toLocaleString()} {formData.sendCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">They receive:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {calculation.receiveAmount.toLocaleString()} {selectedRecipient?.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total cost:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${calculation.totalCost.toFixed(2)} {formData.sendCurrency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
            <div>
              {step !== 'amount' && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Back
                </button>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              {step === 'confirm' ? (
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <Send className="w-4 h-4 mr-2 inline" />
                  Send Money
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!formData.recipientId || !formData.sendAmount}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;