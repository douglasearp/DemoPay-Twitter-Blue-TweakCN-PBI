import React from 'react';
import { ArrowLeft, Mail, MessageSquare, Phone, Sparkles, Building, DollarSign, Percent, Calendar } from 'lucide-react';
import { mockInvoiceActivities } from '../data/mockData';
import StatusBadge from './StatusBadge';
import type { Invoice } from '../types';

interface InvoiceActivityProps {
  invoice: Invoice;
  onBack: () => void;
}

const InvoiceActivity: React.FC<InvoiceActivityProps> = ({ invoice, onBack }) => {
  const activities = mockInvoiceActivities.filter(activity => activity.invoiceId === invoice.id);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'sms':
        return <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'call':
        return <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const isOverdue = new Date(invoice.dueDate) < new Date();
  const daysPastDue = isOverdue ? Math.floor((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 3600 * 24)) : 0;

  const aiSuggestions = [
    {
      id: 1,
      type: 'early-payment',
      title: 'Early Payment Discount',
      description: 'Offer 2% discount for payment within 10 days',
      confidence: 85,
      icon: <Percent className="w-5 h-5 text-green-600 dark:text-green-400" />,
      color: 'green',
      reasoning: 'Customer has history of taking early payment discounts and current cash flow appears strong.'
    },
    {
      id: 2,
      type: 'payment-plan',
      title: 'Payment Plan Option',
      description: 'Offer 3-month payment plan with 1% fee',
      confidence: 75,
      icon: <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      color: 'blue',
      reasoning: 'Large invoice amount may benefit from structured payment schedule to improve collection rate.'
    },
    {
      id: 3,
      type: 'agent-call',
      title: 'Priority Agent Call',
      description: 'Schedule immediate call due to overdue status',
      confidence: 95,
      icon: <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      color: 'purple',
      reasoning: 'Invoice is significantly overdue and customer has multiple outstanding invoices indicating potential issues.'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Invoices
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoice Activity</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {invoice.invoiceNumber} - {invoice.companyName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoice Details */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Invoice Details</h2>
                <StatusBadge status={invoice.status} />
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Invoice Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(invoice.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                    <p className={`font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                      {new Date(invoice.dueDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: '2-digit' 
                      })}
                      {isOverdue && (
                        <span className="ml-2 text-sm">
                          ({daysPastDue} days overdue)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4z" />
                    <path d="M6 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-1a1 1 0 00-1-1H9a1 1 0 00-1 1v1a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Invoice Number</p>
                    <p className="font-mono font-medium text-gray-900 dark:text-white">{invoice.invoiceNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Activity History</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {activity.details && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-line">
                          {activity.details}
                        </p>
                      )}
                      {activity.user && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          by {activity.user}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Suggestions</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {aiSuggestions.map((suggestion) => {
                  const getColorClasses = (color: string) => {
                    switch (color) {
                      case 'green':
                        return {
                          bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
                          border: 'border-green-200 dark:border-green-700',
                          text: 'text-green-800 dark:text-green-300',
                          badge: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800',
                          button: 'bg-green-600 hover:bg-green-700'
                        };
                      case 'blue':
                        return {
                          bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
                          border: 'border-blue-200 dark:border-blue-700',
                          text: 'text-blue-800 dark:text-blue-300',
                          badge: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800',
                          button: 'bg-blue-600 hover:bg-blue-700'
                        };
                      case 'purple':
                        return {
                          bg: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
                          border: 'border-purple-200 dark:border-purple-700',
                          text: 'text-purple-800 dark:text-purple-300',
                          badge: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-800',
                          button: 'bg-purple-600 hover:bg-purple-700'
                        };
                      default:
                        return {
                          bg: 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20',
                          border: 'border-gray-200 dark:border-gray-700',
                          text: 'text-gray-800 dark:text-gray-300',
                          badge: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800',
                          button: 'bg-gray-600 hover:bg-gray-700'
                        };
                    }
                  };

                  const colors = getColorClasses(suggestion.color);

                  return (
                    <div key={suggestion.id} className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {suggestion.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${colors.text}`}>
                              {suggestion.title}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${colors.badge}`}>
                              {suggestion.confidence}% confidence
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {suggestion.description}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {suggestion.reasoning}
                          </p>
                          <button className={`w-full flex items-center justify-center px-4 py-2 ${colors.button} text-white rounded-lg transition-colors duration-200`}>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Apply Suggestion
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* User Info */}
              <div className="mt-6 flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Invoice Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceActivity;