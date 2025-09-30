import React, { useState } from 'react';
import { X, Search, Building } from 'lucide-react';

interface Biller {
  id: string;
  name: string;
  category: string;
  autoPayAvailable: boolean;
}

interface BillerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBiller: (biller: Biller) => void;
}

const mockBillers: Biller[] = [
  {
    id: '1',
    name: 'AT&T Internet',
    category: 'telecommunications',
    autoPayAvailable: true
  },
  {
    id: '2',
    name: 'Amazon Prime',
    category: 'subscription',
    autoPayAvailable: true
  },
  {
    id: '3',
    name: 'Blue Cross Blue Shield',
    category: 'healthcare',
    autoPayAvailable: true
  },
  {
    id: '4',
    name: 'Chase Bank Credit Card',
    category: 'credit card',
    autoPayAvailable: true
  },
  {
    id: '5',
    name: 'Verizon Wireless',
    category: 'telecommunications',
    autoPayAvailable: true
  },
  {
    id: '6',
    name: 'State Farm Insurance',
    category: 'insurance',
    autoPayAvailable: false
  },
  {
    id: '7',
    name: 'Pacific Gas & Electric',
    category: 'utilities',
    autoPayAvailable: true
  },
  {
    id: '8',
    name: 'Netflix',
    category: 'subscription',
    autoPayAvailable: true
  }
];

const BillerSearchModal: React.FC<BillerSearchModalProps> = ({ isOpen, onClose, onSelectBiller }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBillers = mockBillers.filter(biller =>
    biller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    biller.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'telecommunications':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'subscription':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'healthcare':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'credit card':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'insurance':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
      case 'utilities':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Search Billers</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search billers by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Billers List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredBillers.map((biller) => (
              <div
                key={biller.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{biller.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(biller.category)}`}>
                        {biller.category}
                      </span>
                      {biller.autoPayAvailable && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          AutoPay Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onSelectBiller(biller)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Select
                </button>
              </div>
            ))}
          </div>

          {filteredBillers.length === 0 && (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No billers found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillerSearchModal;