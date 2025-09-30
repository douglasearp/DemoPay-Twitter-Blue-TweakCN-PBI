import React, { useState } from 'react';
import { Search, Plus, Building, Edit } from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import StatusBadge from './StatusBadge';
import CustomerModal from './CustomerModal';
import type { Customer } from '../types';

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState(mockCustomers);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.primaryContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSaveCustomer = (customerData: Partial<Customer>) => {
    if (selectedCustomer) {
      // Update existing customer
      setCustomers(prev => prev.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, ...customerData }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...customerData as Customer
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your customer information</p>
        </div>
        <button 
          onClick={handleNewCustomer}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          style={{ backgroundColor: '#4285F4' }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:border-[#4285F4] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm hover:shadow-md transition-all duration-200"
            style={{ borderColor: '#4285F4' + '40', '--tw-ring-color': '#4285F4' } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ borderColor: '#4285F4' + '20' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#4285F4' + '10' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Company Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Primary Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="transition-colors duration-200" style={{ '--hover-bg': '#4285F4' + '10' } as React.CSSProperties}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#4285F4' + '20' }}>
                        <Building className="w-5 h-5" style={{ color: '#4285F4' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {customer.companyName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Tax: {customer.taxId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{customer.primaryContact}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{customer.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-sm text-gray-900 dark:text-white">{customer.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-sm text-gray-900 dark:text-white">{customer.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={customer.status} variant="customer" />
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleEditCustomer(customer)}
                      className="flex items-center text-sm font-medium transition-colors duration-200"
                      style={{ color: '#4285F4' }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onSave={handleSaveCustomer}
      />
    </div>
  );
};

export default Customers;