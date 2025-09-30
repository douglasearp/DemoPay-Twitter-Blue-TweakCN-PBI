import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'invoice' | 'customer' | 'payment';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'invoice' }) => {
  const getStatusStyles = () => {
    const lowercaseStatus = status.toLowerCase();
    
    switch (lowercaseStatus) {
      case 'pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700';
      case 'paid':
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'overdue':
      case 'past due':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700';
      case 'discounted':
        return 'text-white border-[#4285F4]' + ' ' + 'bg-[#4285F4]';
      case 'payment plan':
      case 'payment-plan':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700';
      case 'scheduled':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700';
      case 'inactive':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;