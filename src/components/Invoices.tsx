import React, { useState } from 'react';
import { Search, Plus, Eye, ChevronDown, Edit, Send, Calendar, Repeat } from 'lucide-react';
import { mockInvoices } from '../data/mockData';
import StatusBadge from './StatusBadge';
import InvoiceModal from './InvoiceModal';
import SendInvoiceModal from './SendInvoiceModal';
import type { Invoice } from '../types';

interface InvoicesProps {
  onViewActivity: (invoice: Invoice) => void;
}

const Invoices: React.FC<InvoicesProps> = ({ onViewActivity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Invoice>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendingInvoice, setSendingInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = mockInvoices
    .filter(invoice => 
      invoice.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'amount') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

  const handleSort = (column: keyof Invoice) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleNewInvoice = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleSaveInvoice = (invoiceData: Partial<Invoice>) => {
    if (selectedInvoice) {
      // Update existing invoice
      setInvoices(prev => prev.map(inv => 
        inv.id === selectedInvoice.id 
          ? { ...inv, ...invoiceData }
          : inv
      ));
    } else {
      // Add new invoice
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        ...invoiceData as Invoice
      };
      setInvoices(prev => [...prev, newInvoice]);
    }
  };

  const handleSendInvoice = (invoice: Invoice) => {
    setSendingInvoice(invoice);
    setIsSendModalOpen(true);
  };

  const handleSendNow = (invoice: Invoice) => {
    console.log('Sending invoice now:', invoice);
    setIsSendModalOpen(false);
    setSendingInvoice(null);
  };

  const handleScheduleSend = (invoice: Invoice, scheduledDate: Date) => {
    console.log('Scheduling invoice:', invoice, 'for:', scheduledDate);
    setIsSendModalOpen(false);
    setSendingInvoice(null);
  };

  const handleRecurringSend = (invoice: Invoice, recurringData: any) => {
    console.log('Setting up recurring invoice:', invoice, 'with data:', recurringData);
    setIsSendModalOpen(false);
    setSendingInvoice(null);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your accounts receivable</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md" style={{ backgroundColor: '#4285F4' + '20', color: '#4285F4' }}>
            <Eye className="w-4 h-4 mr-2" />
            Detailed Invoice
          </button>
          <button 
            onClick={handleNewInvoice}
            className="flex items-center px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#4285F4' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search company name, invoice number, contact name, date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:border-[#4285F4] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm hover:shadow-md transition-all duration-200"
            style={{ borderColor: '#4285F4' + '40', '--tw-ring-color': '#4285F4' } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ borderColor: '#4285F4' + '20' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#4285F4' + '10' }}>
              <tr>
                {[
                  { key: 'invoiceNumber', label: 'Invoice Number' },
                  { key: 'companyName', label: 'Company Name' },
                  { key: 'contactName', label: 'Contact Name' },
                  { key: 'date', label: 'Date' },
                  { key: 'dueDate', label: 'Due Date' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'status', label: 'Status' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-200"
                    style={{ color: '#4285F4' }}
                    onClick={() => handleSort(key as keyof Invoice)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        sortBy === key && sortOrder === 'desc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="transition-colors duration-200" style={{ '--hover-bg': '#4285F4' + '10' } as React.CSSProperties}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {invoice.invoiceNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {invoice.companyName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {invoice.contactName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(invoice.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${invoice.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={invoice.status} variant="invoice" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
                        className="flex items-center text-sm font-medium transition-colors duration-200"
                        style={{ color: '#4285F4' }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleSendInvoice(invoice)}
                        className="flex items-center text-sm font-medium transition-colors duration-200"
                        style={{ color: '#4285F4', opacity: 0.8 }}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send
                      </button>
                      <button 
                        onClick={() => onViewActivity(invoice)}
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: '#4285F4', opacity: 0.8 }}
                      >
                        View Activity
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
        onSave={handleSaveInvoice}
      />

      <SendInvoiceModal
        isOpen={isSendModalOpen}
        onClose={() => {
          setIsSendModalOpen(false);
          setSendingInvoice(null);
        }}
        invoice={sendingInvoice}
        onSendNow={handleSendNow}
        onSchedule={handleScheduleSend}
        onRecurring={handleRecurringSend}
      />
    </div>
  );
};

export default Invoices;