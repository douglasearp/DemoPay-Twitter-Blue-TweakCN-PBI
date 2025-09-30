import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Send, 
  Globe, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  ArrowRight,
  Eye,
  RefreshCw
} from 'lucide-react';
import { mockRecipients, mockRemittanceTransactions, mockExchangeRates } from '../data/mockData';
import KPICard from './KPICard';
import StatusBadge from './StatusBadge';
import RecipientModal from './RecipientModal';
import SendMoneyModal from './SendMoneyModal';
import type { Recipient, RemittanceTransaction } from '../types';

const CrossBorder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'recipients' | 'history'>('send');
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipients, setRecipients] = useState(mockRecipients);
  const [transactions, setTransactions] = useState(mockRemittanceTransactions);

  const filteredRecipients = recipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.relationship.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'in-transit':
        return 'text-white border-[#4285F4] bg-[#4285F4]';
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      case 'pending':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const handleNewRecipient = () => {
    setSelectedRecipient(null);
    setIsRecipientModalOpen(true);
  };

  const handleEditRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    setIsRecipientModalOpen(true);
  };

  const handleSendMoney = (recipient?: Recipient) => {
    setSelectedRecipient(recipient || null);
    setIsSendMoneyModalOpen(true);
  };

  const handleSaveRecipient = (recipientData: Partial<Recipient>) => {
    if (selectedRecipient) {
      setRecipients(prev => prev.map(r => 
        r.id === selectedRecipient.id 
          ? { ...r, ...recipientData }
          : r
      ));
    } else {
      const newRecipient: Recipient = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...recipientData as Recipient
      };
      setRecipients(prev => [...prev, newRecipient]);
    }
  };

  const handleSendTransaction = (transactionData: Partial<RemittanceTransaction>) => {
    const newTransaction: RemittanceTransaction = {
      id: `TXN${Date.now()}`,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: `BW${Math.random().toString().substr(2, 9)}`,
      status: 'pending',
      ...transactionData as RemittanceTransaction
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cross-Border Remittance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Send money internationally with competitive rates and fast delivery</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Sent This Month"
          value="$47,500"
          icon={<Send className="w-8 h-8" />}
          trend="up"
          trendValue="+12.5%"
          className="border-[#4285F4]/30"
          style={{ backgroundColor: '#4285F4' + '10' }}
        />
        <KPICard
          title="Active Recipients"
          value={recipients.length}
          icon={<Users className="w-8 h-8" />}
          className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
        />
        <KPICard
          title="Transactions This Month"
          value="23"
          icon={<Globe className="w-8 h-8" />}
          trend="up"
          trendValue="+8.3%"
          className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700"
        />
        <KPICard
          title="Average Delivery Time"
          value="1.2 days"
          icon={<Clock className="w-8 h-8" />}
          trend="down"
          trendValue="-0.3 days"
          className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('send')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'send'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Send Money
            </button>
            <button
              onClick={() => setActiveTab('recipients')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'recipients'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Recipients ({recipients.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Transaction History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'send' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Send</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Send money to your saved recipients or add a new one</p>
                
                {/* Quick Send Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {recipients.slice(0, 3).map((recipient) => (
                    <div key={recipient.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#4285F4' + '20' }}>
                            <span className="font-semibold" style={{ color: '#4285F4' }}>
                              {recipient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{recipient.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{recipient.country}</p>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#4285F4' + '20', color: '#4285F4' }}>
                          {recipient.currency}
                        </span>
                      </div>
                      <button
                        onClick={() => handleSendMoney(recipient)}
                        className="w-full flex items-center justify-center px-4 py-2 text-white rounded-lg transition-colors duration-200"
                        style={{ backgroundColor: '#4285F4' }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Money
                      </button>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleSendMoney()}
                    className="flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors duration-200 font-medium"
                    style={{ backgroundColor: '#4285F4' }}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send to New Recipient
                  </button>
                  <button
                    onClick={handleNewRecipient}
                    className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Recipient
                  </button>
                </div>
              </div>

              {/* Exchange Rates */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Live Exchange Rates</h4>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Updated 2 min ago
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockExchangeRates.slice(0, 3).map((rate) => (
                    <div key={`${rate.fromCurrency}-${rate.toCurrency}`} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {rate.fromCurrency} → {rate.toCurrency}
                        </span>
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{rate.rate}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Fee: {rate.fees.percentage}% + ${rate.fees.fixed}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recipients' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recipients</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your international recipients</p>
                </div>
                <button
                  onClick={handleNewRecipient}
                  className="mt-4 sm:mt-0 flex items-center px-4 py-2 text-white rounded-lg transition-colors duration-200"
                  style={{ backgroundColor: '#4285F4' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Recipient
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search recipients by name, country, or relationship..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Recipients Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipients.map((recipient) => (
                  <div key={recipient.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#4285F4' + '20' }}>
                          <span className="font-semibold text-lg" style={{ color: '#4285F4' }}>
                            {recipient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{recipient.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{recipient.relationship}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Country:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{recipient.country}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Currency:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{recipient.currency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bank:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate ml-2">{recipient.bankName}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSendMoney(recipient)}
                        className="flex-1 flex items-center justify-center px-3 py-2 text-white rounded-lg transition-colors duration-200 text-sm"
                        style={{ backgroundColor: '#4285F4' }}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send
                      </button>
                      <button
                        onClick={() => handleEditRecipient(recipient)}
                        className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction History</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Track your international money transfers</p>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Exchange Rate
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                              {transaction.id}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.trackingNumber}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.recipientName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.purpose}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              ${transaction.sendAmount.toLocaleString()} {transaction.sendCurrency}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              → {transaction.receiveAmount.toLocaleString()} {transaction.receiveCurrency}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {transaction.exchangeRate}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Fee: ${transaction.fees}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                            {transaction.status === 'delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {transaction.status === 'in-transit' && <Clock className="w-3 h-3 mr-1" />}
                            {transaction.status === 'processing' && <RefreshCw className="w-3 h-3 mr-1" />}
                            {transaction.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(transaction.createdAt).toLocaleTimeString()}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <RecipientModal
        isOpen={isRecipientModalOpen}
        onClose={() => setIsRecipientModalOpen(false)}
        recipient={selectedRecipient}
        onSave={handleSaveRecipient}
      />

      <SendMoneyModal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setIsSendMoneyModalOpen(false)}
        recipient={selectedRecipient}
        recipients={recipients}
        onSend={handleSendTransaction}
      />
    </div>
  );
};

export default CrossBorder;