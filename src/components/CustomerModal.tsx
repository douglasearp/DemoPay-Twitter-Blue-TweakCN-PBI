import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Customer } from '../types';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer | null;
  onSave: (customer: Partial<Customer>) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, customer, onSave }) => {
  const [formData, setFormData] = useState<Partial<Customer>>({
    companyName: customer?.companyName || '',
    taxId: customer?.taxId || '',
    primaryContact: customer?.primaryContact || '',
    title: customer?.title || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    status: customer?.status || 'active',
    paymentTerms: customer?.paymentTerms || 'Net 30',
    address: customer?.address || {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    phoneNumbers: customer?.phoneNumbers || [{ type: 'primary', number: '' }],
    emailAddresses: customer?.emailAddresses || [{ type: 'primary', email: '' }],
    smsOptIn: customer?.smsOptIn || false,
    notes: customer?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addPhoneNumber = () => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: [...(prev.phoneNumbers || []), { type: 'secondary', number: '' }]
    }));
  };

  const removePhoneNumber = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers?.filter((_, i) => i !== index)
    }));
  };

  const addEmailAddress = () => {
    setFormData(prev => ({
      ...prev,
      emailAddresses: [...(prev.emailAddresses || []), { type: 'billing', email: '' }]
    }));
  };

  const removeEmailAddress = (index: number) => {
    setFormData(prev => ({
      ...prev,
      emailAddresses: prev.emailAddresses?.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {customer ? 'Edit Customer' : 'New Customer'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Number / EIN
                  </label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter tax number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Terms
                  </label>
                  <select
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                    <option value="Net 60">Net 60</option>
                    <option value="Due on Receipt">Due on Receipt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Primary Contact */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Primary Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.primaryContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryContact: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter title"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Address</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address?.street}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address!, street: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter street address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.address?.city}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, city: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.address?.state}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, state: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.address?.zipCode}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, zipCode: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="ZIP"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.address?.country}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, country: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="USA"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Phone Numbers</h4>
                <button
                  type="button"
                  onClick={addPhoneNumber}
                  className="flex items-center px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Phone
                </button>
              </div>
              <div className="space-y-3">
                {formData.phoneNumbers?.map((phone, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <select
                      value={phone.type}
                      onChange={(e) => {
                        const newPhones = [...(formData.phoneNumbers || [])];
                        newPhones[index] = { ...phone, type: e.target.value as 'primary' | 'secondary' | 'mobile' };
                        setFormData(prev => ({ ...prev, phoneNumbers: newPhones }));
                      }}
                      className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="mobile">Mobile</option>
                    </select>
                    <input
                      type="tel"
                      value={phone.number}
                      onChange={(e) => {
                        const newPhones = [...(formData.phoneNumbers || [])];
                        newPhones[index] = { ...phone, number: e.target.value };
                        setFormData(prev => ({ ...prev, phoneNumbers: newPhones }));
                      }}
                      className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="Phone number"
                    />
                    {formData.phoneNumbers && formData.phoneNumbers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhoneNumber(index)}
                        className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Email Addresses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email Addresses</h4>
                <button
                  type="button"
                  onClick={addEmailAddress}
                  className="flex items-center px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Email
                </button>
              </div>
              <div className="space-y-3">
                {formData.emailAddresses?.map((email, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <select
                      value={email.type}
                      onChange={(e) => {
                        const newEmails = [...(formData.emailAddresses || [])];
                        newEmails[index] = { ...email, type: e.target.value as 'primary' | 'billing' | 'accounting' };
                        setFormData(prev => ({ ...prev, emailAddresses: newEmails }));
                      }}
                      className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      <option value="primary">Primary</option>
                      <option value="billing">Billing</option>
                      <option value="accounting">Accounting</option>
                    </select>
                    <input
                      type="email"
                      value={email.email}
                      onChange={(e) => {
                        const newEmails = [...(formData.emailAddresses || [])];
                        newEmails[index] = { ...email, email: e.target.value };
                        setFormData(prev => ({ ...prev, emailAddresses: newEmails }));
                      }}
                      className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="Email address"
                    />
                    {formData.emailAddresses && formData.emailAddresses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmailAddress(index)}
                        className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Opt-in */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsOptIn"
                  checked={formData.smsOptIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="smsOptIn" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  SMS opt-in for payment reminders and notifications
                </label>
              </div>
            </div>

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
                placeholder="Additional notes about this customer..."
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
                {customer ? 'Update Customer' : 'Create Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;