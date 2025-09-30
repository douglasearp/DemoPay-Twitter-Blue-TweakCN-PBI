import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calculator } from 'lucide-react';
import type { Invoice, InvoiceLineItem, Customer } from '../types';
import { mockCustomers } from '../data/mockData';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice | null;
  onSave: (invoice: Partial<Invoice>) => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, invoice, onSave }) => {
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: invoice?.invoiceNumber || `INV${Date.now()}`,
    companyName: invoice?.companyName || '',
    contactName: invoice?.contactName || '',
    date: invoice?.date || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: invoice?.status || 'pending',
    lineItems: invoice?.lineItems || [{ id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }],
    subtotal: invoice?.subtotal || 0,
    taxRate: invoice?.taxRate || 0,
    taxAmount: invoice?.taxAmount || 0,
    amount: invoice?.amount || 0,
    notes: invoice?.notes || ''
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (formData.companyName) {
      const customer = mockCustomers.find(c => c.companyName === formData.companyName);
      setSelectedCustomer(customer || null);
      if (customer && !formData.contactName) {
        setFormData(prev => ({ ...prev, contactName: customer.primaryContact }));
      }
    }
  }, [formData.companyName]);

  const calculateTotals = (lineItems: InvoiceLineItem[], taxRate: number) => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      amount: total
    }));
  };

  const handleLineItemChange = (index: number, field: keyof InvoiceLineItem, value: string | number) => {
    const newLineItems = [...(formData.lineItems || [])];
    const item = { ...newLineItems[index] };
    
    if (field === 'quantity' || field === 'unitPrice') {
      item[field] = typeof value === 'string' ? parseFloat(value) || 0 : value;
      item.total = item.quantity * item.unitPrice;
    } else {
      item[field] = value as any;
    }
    
    newLineItems[index] = item;
    setFormData(prev => ({ ...prev, lineItems: newLineItems }));
    calculateTotals(newLineItems, formData.taxRate || 0);
  };

  const addLineItem = () => {
    const newLineItems = [...(formData.lineItems || [])];
    newLineItems.push({
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    });
    setFormData(prev => ({ ...prev, lineItems: newLineItems }));
  };

  const removeLineItem = (index: number) => {
    const newLineItems = formData.lineItems?.filter((_, i) => i !== index) || [];
    setFormData(prev => ({ ...prev, lineItems: newLineItems }));
    calculateTotals(newLineItems, formData.taxRate || 0);
  };

  const handleTaxRateChange = (taxRate: number) => {
    setFormData(prev => ({ ...prev, taxRate }));
    calculateTotals(formData.lineItems || [], taxRate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-6xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {invoice ? 'Edit Invoice' : 'New Invoice'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Invoice Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invoice Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Invoice Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.invoiceNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white font-mono"
                        placeholder="INV-001"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Invoice Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Due Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dueDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company Name *
                      </label>
                      <select
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      >
                        <option value="">Select a customer</option>
                        {mockCustomers.map(customer => (
                          <option key={customer.id} value={customer.companyName}>
                            {customer.companyName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                        <option value="discounted">Discounted</option>
                        <option value="payment-plan">Payment Plan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Line Items</h4>
                <button
                  type="button"
                  onClick={addLineItem}
                  className="flex items-center px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Line Item
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Quantity</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-32">Unit Price</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-32">Total</th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.lineItems?.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600">
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                              placeholder="Product or service description"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.quantity}
                              onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => handleLineItemChange(index, 'unitPrice', e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="px-3 py-2 bg-gray-100 dark:bg-gray-600 rounded text-sm font-medium text-gray-900 dark:text-white">
                              ${item.total.toFixed(2)}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            {formData.lineItems && formData.lineItems.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeLineItem(index)}
                                className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Totals and Tax */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Additional notes or terms..."
                />
              </div>

              {/* Totals */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Calculator className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Totals</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(formData.subtotal || 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Tax Rate:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.taxRate || 0}
                        onChange={(e) => handleTaxRateChange(parseFloat(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(formData.taxAmount || 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${(formData.amount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
                {invoice ? 'Update Invoice' : 'Create Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;