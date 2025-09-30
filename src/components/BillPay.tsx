
import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Building, CheckCircle } from 'lucide-react';
import KPICard from './KPICard';
import StatusBadge from './StatusBadge';
import BillerSearchModal from './BillerSearchModal';
import PaymentSetupModal from './PaymentSetupModal';
import { mockBillPayments, dashboardKPIs } from '../data/mockData';
import type { BillPayment } from '../types';

interface Biller {
  id: string;
  name: string;
  category: string;
  autoPayAvailable: boolean;
}

const BillPay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scheduled' | 'paid'>('scheduled');
  const [isBillerSearchOpen, setIsBillerSearchOpen] = useState(false);
  const [isPaymentSetupOpen, setIsPaymentSetupOpen] = useState(false);
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const [editingPayment, setEditingPayment] = useState<BillPayment | null>(null);
  const [billPayments, setBillPayments] = useState(mockBillPayments);
  
  const scheduledBills = billPayments.filter(bill => bill.status === 'scheduled');
  const paidBills = billPayments.filter(bill => bill.status === 'paid');

  const handleAddBiller = () => {
    setIsBillerSearchOpen(true);
  };

  const handleSelectBiller = (biller: Biller) => {
    setSelectedBiller(biller);
    setIsBillerSearchOpen(false);
    setIsPaymentSetupOpen(true);
  };

  const handleEditPayment = (payment: BillPayment) => {
    setEditingPayment(payment);
    setSelectedBiller(null);
    setIsPaymentSetupOpen(true);
  };

  const handleSavePayment = (paymentData: Partial<BillPayment>) => {
    if (editingPayment) {
      // Update existing payment
      setBillPayments(prev => prev.map(p => 
        p.id === editingPayment.id 
          ? { ...p, ...paymentData }
          : p
      ));
    } else {
      // Add new payment
      const newPayment: BillPayment = {
        id: Date.now().toString(),
        vendor: paymentData.vendor || '',
        description: paymentData.description || '',
        dueDate: paymentData.dueDate || '',
        amount: paymentData.amount || 0,
        paymentMethod: paymentData.paymentMethod || 'ACH',
        status: 'scheduled',
        frequency: paymentData.frequency || 'one-time'
      };
      setBillPayments(prev => [...prev, newPayment]);
    }
    setEditingPayment(null);
    setSelectedBiller(null);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bill Pay</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and schedule your bill payments</p>
        </div>
        <button 
          onClick={handleAddBiller}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          style={{ backgroundColor: '#4285F4' }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Biller
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Scheduled Payments"
          value={scheduledBills.length}
          icon={<Calendar className="w-8 h-8" />}
          className="border-[#4285F4]/30"
          style={{ backgroundColor: '#4285F4' + '10' }}
        />
        <KPICard
          title="Total Scheduled Amount"
          value={`$${scheduledBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}`}
          icon={<DollarSign className="w-8 h-8" />}
          className="border-[#4285F4]/40"
          style={{ backgroundColor: '#4285F4' + '15' }}
        />
        <KPICard
          title="Active Billers"
          value={new Set(mockBillPayments.map(bill => bill.vendor)).size}
          icon={<Building className="w-8 h-8" />}
          className="border-[#4285F4]/50"
          style={{ backgroundColor: '#4285F4' + '20' }}
        />
        <KPICard
          title="Completed This Month"
          value={dashboardKPIs.payments.completedThisMonth}
          icon={<CheckCircle className="w-8 h-8" />}
          className="border-[#4285F4]/60"
          style={{ backgroundColor: '#4285F4' + '25' }}
        />
      </div>

      {/* Payment Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300" style={{ borderColor: '#4285F4' + '20' }}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Management</h3>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'scheduled'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Scheduled Bills ({scheduledBills.length})
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'paid'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Paid Bills (2)
            </button>
          </nav>
        </div>

        {/* Bills Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#4285F4' + '10' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Vendor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Payment Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Discount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4285F4' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {(activeTab === 'scheduled' ? scheduledBills : paidBills).map((payment, index) => (
                <tr key={payment.id} className="transition-colors duration-200" style={{ '--hover-bg': '#4285F4' + '10' } as React.CSSProperties}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#4285F4' + '20' }}>
                        <Building className="w-5 h-5" style={{ color: '#4285F4' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {payment.vendor}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {payment.frequency}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        {payment.frequency === 'monthly' ? 
                          `${new Date(payment.dueDate).getDate()}th monthly` : 
                          payment.frequency
                        }
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${payment.amount.toLocaleString()}
                      </p>
                      {payment.originalAmount && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                          ${payment.originalAmount.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={payment.status} variant="payment" />
                  </td>
                  <td className="px-6 py-4">
                    {payment.discount ? (
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        -${payment.discount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditPayment(payment)}
                        className="p-1 text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BillerSearchModal
        isOpen={isBillerSearchOpen}
        onClose={() => setIsBillerSearchOpen(false)}
        onSelectBiller={handleSelectBiller}
      />

      <PaymentSetupModal
        isOpen={isPaymentSetupOpen}
        onClose={() => {
          setIsPaymentSetupOpen(false);
          setSelectedBiller(null);
          setEditingPayment(null);
        }}
        biller={selectedBiller}
        payment={editingPayment}
        onSave={handleSavePayment}
      />
    </div>
  );
};

export default BillPay;