import React, { useState } from 'react';
import { X, Plus, Trash2, Globe } from 'lucide-react';
import type { Recipient } from '../types';

interface RecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient?: Recipient | null;
  onSave: (recipient: Partial<Recipient>) => void;
}

const countries = [
  { code: 'MX', name: 'Mexico', currency: 'MXN' },
  { code: 'CN', name: 'China', currency: 'CNY' },
  { code: 'IN', name: 'India', currency: 'INR' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'DE', name: 'Germany', currency: 'EUR' },
  { code: 'FR', name: 'France', currency: 'EUR' },
  { code: 'JP', name: 'Japan', currency: 'JPY' },
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'AU', name: 'Australia', currency: 'AUD' },
  { code: 'BR', name: 'Brazil', currency: 'BRL' }
];

const RecipientModal: React.FC<RecipientModalProps> = ({ isOpen, onClose, recipient, onSave }) => {
  const [formData, setFormData] = useState<Partial<Recipient>>({
    name: recipient?.name || '',
    email: recipient?.email || '',
    phone: recipient?.phone || '',
    country: recipient?.country || '',
    currency: recipient?.currency || '',
    bankName: recipient?.bankName || '',
    accountNumber: recipient?.accountNumber || '',
    routingNumber: recipient?.routingNumber || '',
    swiftCode: recipient?.swiftCode || '',
    iban: recipient?.iban || '',
    relationship: recipient?.relationship || '',
    address: recipient?.address || {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });

  const handleCountryChange = (countryName: string) => {
    const country = countries.find(c => c.name === countryName);
    setFormData(prev => ({
      ...prev,
      country: countryName,
      currency: country?.currency || '',
      address: {
        ...prev.address!,
        country: countryName
      }
    }));
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
        
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {recipient ? 'Edit Recipient' : 'Add New Recipient'}
              </h3>
            </div>
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter recipient's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relationship *
                  </label>
                  <select
                    required
                    value={formData.relationship}
                    onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="">Select relationship</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Partner">Business Partner</option>
                    <option value="Employee">Employee</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="recipient@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="+1-555-123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Location</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="">Select country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={formData.currency}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    placeholder="Auto-filled based on country"
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
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address?.street}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address!, street: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter street address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
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
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={formData.address?.state}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, state: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="State/Province"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address?.postalCode}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address!, postalCode: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Banking Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Banking Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankName}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter bank name"
                  />
                </div>
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
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SWIFT Code
                  </label>
                  <input
                    type="text"
                    value={formData.swiftCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, swiftCode: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="SWIFT/BIC code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Routing Number / IBAN
                  </label>
                  <input
                    type="text"
                    value={formData.routingNumber || formData.iban}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      routingNumber: e.target.value,
                      iban: e.target.value 
                    }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Routing number or IBAN"
                  />
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
                {recipient ? 'Update Recipient' : 'Add Recipient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipientModal;