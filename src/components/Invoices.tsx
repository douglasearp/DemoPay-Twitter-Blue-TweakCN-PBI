import React, { useState } from 'react';
import { Search, Plus, ChevronDown, Edit, Send, Calendar, Repeat } from 'lucide-react';
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
  const [appliedSuggestions, setAppliedSuggestions] = useState<Record<string, boolean>>({});

  // AI Suggestion data
  const aiSuggestions = [
    {
      id: 'early-payment',
      title: 'Early Payment Discount',
      description: '3 invoices eligible for AI-suggested 2% discount for payment within 10 days. Customer history shows strong uptake on discounts and positive cash flow indicators.',
      confidence: '90% confidence',
      color: 'green',
      buttons: ['Apply to All Eligible', '**Apply Suggestion']
    },
    {
      id: 'payment-plan',
      title: 'Payment Plan Option',
      description: '1 invoice eligible for AI-suggested 3-month payment plan with 1% fee. Large invoice amounts may benefit from structured payment schedule to improve collection rate.',
      confidence: '80% confidence',
      color: 'blue',
      buttons: ['Apply to All Eligible', '**Apply Suggestion']
    },
    {
      id: 'priority-call',
      title: 'Priority Agent Call',
      description: '1 invoice eligible for AI-suggested immediate call due to overdue status. Invoice is significantly overdue and customer has multiple outstanding invoices indicating potential issues.',
      confidence: '95% confidence',
      color: 'purple',
      buttons: ['Apply to All Eligible', '**Apply Suggestion']
    }
  ];

  // Enhanced invoice data with AI suggestions
  const enhancedInvoices = mockInvoices.map((invoice, index) => {
    let aiSuggestion = '';
    let suggestionColor = '';
    
    // Assign AI suggestions based on invoice data
    if (invoice.status === 'overdue') {
      aiSuggestion = 'Priority Agent Call';
      suggestionColor = 'purple';
    } else if (invoice.amount > 20000) {
      aiSuggestion = '3-Month Plan 1% Fee';
      suggestionColor = 'blue';
    } else {
      aiSuggestion = 'Early Payment 2%';
      suggestionColor = 'green';
    }
    
    return {
      ...invoice,
      aiSuggestion,
      suggestionColor
    };
  });

  const filteredInvoices = enhancedInvoices
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

  const handleApplyToAll = (suggestionColor: string) => {
    const updatedApplied = { ...appliedSuggestions };
    
    // Find all invoices with matching suggestion color and mark them as applied
    enhancedInvoices.forEach(invoice => {
      if (invoice.suggestionColor === suggestionColor) {
        updatedApplied[invoice.id] = true;
      }
    });
    
    setAppliedSuggestions(updatedApplied);
  };

  const handleIndividualCheckbox = (invoiceId: string, checked: boolean) => {
    setAppliedSuggestions(prev => ({
      ...prev,
      [invoiceId]: checked
    }));
  };

  const getStatusPillColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAISuggestionPillColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'purple':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-600 hover:bg-green-700';
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your accounts receivable</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={handleNewInvoice}
            className="flex items-center px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#4285F4' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            + New Invoice
          </button>
        </div>
      </div>

      {/* AI Suggestion Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {aiSuggestions.map((suggestion) => (
          <div key={suggestion.id} className={`rounded-xl p-6 shadow-lg border-2 ${suggestion.color === 'green' ? 'bg-green-50 border-green-200' : suggestion.color === 'blue' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-lg font-semibold ${suggestion.color === 'green' ? 'text-green-800' : suggestion.color === 'blue' ? 'text-blue-800' : 'text-purple-800'}`}>
                {suggestion.title}
              </h3>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${suggestion.color === 'green' ? 'bg-green-100 text-green-700' : suggestion.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                {suggestion.confidence}
              </span>
            </div>
            <p className={`text-sm mb-4 ${suggestion.color === 'green' ? 'text-green-700' : suggestion.color === 'blue' ? 'text-blue-700' : 'text-purple-700'}`}>
              {suggestion.description}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleApplyToAll(suggestion.color)}
                className={`px-3 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${getButtonColor(suggestion.color)}`}
              >
                Apply to All Eligible
              </button>
            </div>
          </div>
        ))}
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
                  { key: 'invoiceNumber', label: 'INVOICE NUMBER' },
                  { key: 'companyName', label: 'COMPANY NAME' },
                  { key: 'contactName', label: 'CONTACT NAME' },
                  { key: 'date', label: 'DATE' },
                  { key: 'dueDate', label: 'DUE DATE' },
                  { key: 'amount', label: 'AMOUNT' },
                  { key: 'status', label: 'STATUS' },
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
                  AI SUGGESTION
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  AI APPLIED
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  ACTIONS
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusPillColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAISuggestionPillColor(invoice.suggestionColor)}`}>
                      {invoice.aiSuggestion}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={appliedSuggestions[invoice.id] || false}
                      onChange={(e) => handleIndividualCheckbox(invoice.id, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
                        className="flex items-center text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleSendInvoice(invoice)}
                        className="flex items-center text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send
                      </button>
                      <button 
                        onClick={() => onViewActivity(invoice)}
                        className="text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900"
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