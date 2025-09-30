import React, { useState } from 'react';
import { X, Send, Calendar, Repeat, Clock } from 'lucide-react';
import type { Invoice } from '../types';

interface SendInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSendNow: (invoice: Invoice) => void;
  onSchedule: (invoice: Invoice, scheduleData: any) => void;
  onRecurring: (invoice: Invoice, recurringData: any) => void;
}

const SendInvoiceModal: React.FC<SendInvoiceModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onSendNow,
  onSchedule,
  onRecurring
}) => {
  const [activeTab, setActiveTab] = useState<'send' | 'schedule' | 'recurring'>('send');
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: ''
  });
  const [recurringData, setRecurringData] = useState({
    frequency: 'monthly',
    dayOfMonth: 1,
    startDate: '',
    endDate: '',
    customFrequency: 1
  });

  const handleSendNow = () => {
    if (invoice) {
      onSendNow(invoice);
      onClose();
    }
  };

  const handleSchedule = () => {
    if (invoice && scheduleData.date && scheduleData.time) {
      onSchedule(invoice, scheduleData);
      onClose();
    }
  };

  const handleRecurring = () => {
    if (invoice && recurringData.startDate) {
      onRecurring(invoice, recurringData);
      onClose();
    }
  };

  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Send Invoice {invoice.invoiceNumber}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Invoice Summary */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                <p className="font-medium text-gray-900 dark:text-white">{invoice.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                <p className="font-medium text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                <p className="font-medium text-gray-900 dark:text-white">{invoice.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Due Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('send')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                  activeTab === 'send'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Now
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </button>
              <button
                onClick={() => setActiveTab('recurring')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                  activeTab === 'recurring'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Repeat className="w-4 h-4 mr-2" />
                Recurring
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'send' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Send Invoice Immediately</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  The invoice will be sent to {invoice.contactName} at {invoice.companyName} right away.
                </p>
                <button
                  onClick={handleSendNow}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <Send className="w-4 h-4 mr-2 inline" />
                  Send Now
                </button>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Schedule Invoice</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Send Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={scheduleData.date}
                        onChange={(e) => setScheduleData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Send Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={scheduleData.time}
                        onChange={(e) => setScheduleData(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300">Scheduled Delivery</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Invoice will be sent on {scheduleData.date} at {scheduleData.time}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSchedule}
                    disabled={!scheduleData.date || !scheduleData.time}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                  >
                    <Calendar className="w-4 h-4 mr-2 inline" />
                    Schedule Invoice
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'recurring' && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Set Up Recurring Invoice</h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Frequency *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="frequency"
                          value="daily"
                          checked={recurringData.frequency === 'daily'}
                          onChange={(e) => setRecurringData(prev => ({ ...prev, frequency: e.target.value }))}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">Daily</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="frequency"
                          value="weekly"
                          checked={recurringData.frequency === 'weekly'}
                          onChange={(e) => setRecurringData(prev => ({ ...prev, frequency: e.target.value }))}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">Weekly</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="frequency"
                          value="monthly"
                          checked={recurringData.frequency === 'monthly'}
                          onChange={(e) => setRecurringData(prev => ({ ...prev, frequency: e.target.value }))}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">Monthly</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="frequency"
                          value="quarterly"
                          checked={recurringData.frequency === 'quarterly'}
                          onChange={(e) => setRecurringData(prev => ({ ...prev, frequency: e.target.value }))}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">Quarterly</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="frequency"
                          value="yearly"
                          checked={recurringData.frequency === 'yearly'}
                          onChange={(e) => setRecurringData(prev => ({ ...prev, frequency: e.target.value }))}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">Yearly</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="radio"
                          name="frequency"
                          value="custom"
                          checked={recurringData.frequency === 'custom'}
                          onChange={(e) => setRecurringData(prev => ({ ...prev, frequency: e.target.value }))}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">Custom</span>
                      </label>
                    </div>
                  </div>

                  {recurringData.frequency === 'monthly' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Day of Month
                      </label>
                      <select
                        value={recurringData.dayOfMonth}
                        onChange={(e) => setRecurringData(prev => ({ ...prev, dayOfMonth: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {recurringData.frequency === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Every X Days
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={recurringData.customFrequency}
                        onChange={(e) => setRecurringData(prev => ({ ...prev, customFrequency: parseInt(e.target.value) || 1 }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                        placeholder="Enter number of days"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={recurringData.startDate}
                        onChange={(e) => setRecurringData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={recurringData.endDate}
                        onChange={(e) => setRecurringData(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                    <Repeat className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300">Recurring Schedule</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        Invoice will be sent {recurringData.frequency} starting {recurringData.startDate}
                        {recurringData.endDate && ` until ${recurringData.endDate}`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleRecurring}
                    disabled={!recurringData.startDate}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                  >
                    <Repeat className="w-4 h-4 mr-2 inline" />
                    Set Up Recurring Invoice
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cancel Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendInvoiceModal;