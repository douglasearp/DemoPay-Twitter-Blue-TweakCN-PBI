import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Building, 
  DollarSign, 
  MessageSquare, 
  CheckCircle, 
  Clock,
  User,
  CreditCard,
  ArrowRight
} from 'lucide-react';

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  type: 'P2P' | 'A2A';
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const P2PA2A: React.FC = () => {
  const [paymentMode, setPaymentMode] = useState<'P2P' | 'A2A'>('P2P');
  const [formData, setFormData] = useState({
    phone: '',
    routing: '',
    account: '',
    amount: '',
    message: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', recipient: 'John D. (+1 555-123-4567)', amount: 25.00, type: 'P2P', date: 'Sep 5, 2025, 3:45 PM', status: 'completed' },
    { id: '2', recipient: 'Sarah M. (XXXX-XXXX-5678)', amount: 100.00, type: 'A2A', date: 'Sep 4, 2025, 1:20 PM', status: 'completed' },
    { id: '3', recipient: 'Mike R. (+1 555-987-6543)', amount: 15.50, type: 'P2P', date: 'Sep 3, 2025, 10:10 AM', status: 'completed' },
    { id: '4', recipient: 'Emily S. (XXXX-XXXX-9012)', amount: 200.00, type: 'A2A', date: 'Sep 2, 2025, 5:30 PM', status: 'completed' },
    { id: '5', recipient: 'Alex T. (+1 555-456-7890)', amount: 50.00, type: 'P2P', date: 'Sep 1, 2025, 2:15 PM', status: 'pending' },
    { id: '6', recipient: 'Lisa W. (XXXX-XXXX-3456)', amount: 75.00, type: 'A2A', date: 'Aug 31, 2025, 11:00 AM', status: 'completed' }
  ]);

  const [errors, setErrors] = useState({
    phone: '',
    routing: '',
    account: '',
    amount: ''
  });

  const validateForm = () => {
    const newErrors = { phone: '', routing: '', account: '', amount: '' };
    let isValid = true;

    if (paymentMode === 'P2P') {
      const phonePattern = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
      if (!phonePattern.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
        isValid = false;
      }
    } else {
      const routingPattern = /^\d{9}$/;
      const accountPattern = /^\d{8,12}$/;
      if (!routingPattern.test(formData.routing)) {
        newErrors.routing = 'Please enter a valid routing number';
        isValid = false;
      }
      if (!accountPattern.test(formData.account)) {
        newErrors.account = 'Please enter a valid account number';
        isValid = false;
      }
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const recipient = paymentMode === 'P2P' 
        ? formData.phone 
        : `Account ending ${formData.account.slice(-4)}`;
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        recipient,
        amount: parseFloat(formData.amount),
        type: paymentMode,
        date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        status: 'completed'
      };

      setTransactions(prev => [newTransaction, ...prev]);
      setIsProcessing(false);
      setShowSuccess(true);
      setFormData({ phone: '', routing: '', account: '', amount: '', message: '' });

      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'failed':
        return <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-white text-xs">!</span>
        </div>;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-green-600 dark:text-green-400';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Send Money Seamlessly</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">P2P or A2A, send payments fast and secure</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Send Payment</h2>
          </div>
          
          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 flex space-x-1">
                <button
                  onClick={() => setPaymentMode('P2P')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center ${
                    paymentMode === 'P2P'
                      ? 'text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  style={paymentMode === 'P2P' ? { backgroundColor: '#4285F4' } : {}}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  P2P (Phone)
                </button>
                <button
                  onClick={() => setPaymentMode('A2A')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center ${
                    paymentMode === 'A2A'
                      ? 'text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  style={paymentMode === 'A2A' ? { backgroundColor: '#4285F4' } : {}}
                >
                  <Building className="w-4 h-4 mr-2" />
                  A2A (Account)
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* P2P Phone Input */}
              {paymentMode === 'P2P' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To: Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="+1 (XXX) XXX-XXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              )}

              {/* A2A Account Inputs */}
              {paymentMode === 'A2A' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To: Routing Number *
                    </label>
                    <input
                      type="text"
                      value={formData.routing}
                      onChange={(e) => setFormData(prev => ({ ...prev, routing: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="XXXXXXXXX"
                    />
                    {errors.routing && <p className="text-red-500 text-sm mt-1">{errors.routing}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      value={formData.account}
                      onChange={(e) => setFormData(prev => ({ ...prev, account: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      placeholder="XXXXXXXXXXXX"
                    />
                    {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
                  </div>
                </div>
              )}

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-lg font-semibold"
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add a Note
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="e.g., Thanks for lunch!"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Payment
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#4285F4' + '20' }}>
                    <User className="w-5 h-5" style={{ color: '#4285F4' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {transaction.recipient}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${transaction.amount.toFixed(2)} - {transaction.type}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(transaction.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center relative mx-4">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Success! ${parseFloat(formData.amount || '0').toFixed(2)} sent via {paymentMode}.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-white py-2 px-4 rounded-lg transition-all duration-300"
              style={{ backgroundColor: '#4285F4' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 rounded-xl p-6 border" style={{ backgroundColor: '#4285F4' + '10', borderColor: '#4285F4' + '30' }}>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#4285F4' }}>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">P2P (Person-to-Person)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Send money instantly using just a phone number. Perfect for splitting bills, paying friends, or quick transfers.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Building className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">A2A (Account-to-Account)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Transfer funds directly between bank accounts using routing and account numbers. Ideal for business payments.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Note:</strong> This is a simulation; no real payments are processed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default P2PA2A;