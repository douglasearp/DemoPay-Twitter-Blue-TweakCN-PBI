import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Users, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Send,
  MessageSquare,
  Settings
} from 'lucide-react';
import KPICard from './KPICard';

interface ReportData {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: string;
  type: string;
}

const Reporting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'ar-invoicing' | 'bill-pay'>('ar-invoicing');
  const [activeCustomerTab, setActiveCustomerTab] = useState<'rfm-analysis' | 'customer-behavior' | 'lifetime-value'>('rfm-analysis');
  const [arSubTab, setArSubTab] = useState<'ar-aging' | 'invoice-status' | 'executive-summary' | 'transactions'>('ar-aging');
  const [dateRange, setDateRange] = useState('30');

  const mockReportData: ReportData[] = [
    { id: '1', date: '2025-01-14', customer: 'Walmart Inc.', amount: 1250.00, status: 'Paid', type: 'Invoice' },
    { id: '2', date: '2025-01-13', customer: 'Amazon.com Inc.', amount: 890.00, status: 'Pending', type: 'Invoice' },
    { id: '3', date: '2025-01-12', customer: 'AutoZone Inc.', amount: 2100.00, status: 'Paid', type: 'Payment' },
    { id: '4', date: '2025-01-11', customer: 'Walmart Inc.', amount: 750.00, status: 'Overdue', type: 'Invoice' },
    { id: '5', date: '2025-01-10', customer: 'Amazon.com Inc.', amount: 1500.00, status: 'Paid', type: 'Payment' }
  ];

  const mockArAgingData = [
    { invoice: 'INV-002', client: 'XYZ Ltd', dueDate: '2025-01-20', amount: 2500, daysOverdue: 5 },
    { invoice: 'INV-005', client: 'TechStart LLC', dueDate: '2025-01-15', amount: 12500, daysOverdue: 14 },
    { invoice: 'INV-007', client: 'Metro Industries', dueDate: '2024-12-20', amount: 15000, daysOverdue: 39 },
    { invoice: 'INV-010', client: 'Northern Manufacturing', dueDate: '2024-11-15', amount: 22000, daysOverdue: 75 },
    { invoice: 'INV-013', client: 'Digital Dynamics', dueDate: '2025-01-01', amount: 5500, daysOverdue: 28 },
    { invoice: 'INV-016', client: 'Alpha Consulting', dueDate: '2024-10-30', amount: 18500, daysOverdue: 91 },
    { invoice: 'INV-019', client: 'Delta Services', dueDate: '2024-12-10', amount: 13200, daysOverdue: 49 }
  ];

  const mockInvoiceStatusData = [
    { invoice: 'INV-001', client: 'ABC Corp', date: '2025-01-10', status: 'Sent', amount: 5000, dueDate: '2025-01-25' },
    { invoice: 'INV-002', client: 'XYZ Ltd', date: '2025-01-05', status: 'Overdue', amount: 2500, dueDate: '2025-01-20' },
    { invoice: 'INV-003', client: 'DEF Inc', date: '2025-01-12', status: 'Paid', amount: 7500, dueDate: '2025-01-27' },
    { invoice: 'INV-004', client: 'GHI Co', date: '2025-01-08', status: 'Viewed', amount: 3200, dueDate: '2025-01-23' },
    { invoice: 'INV-005', client: 'TechStart LLC', date: '2024-12-15', status: 'Overdue', amount: 12500, dueDate: '2025-01-15' },
    { invoice: 'INV-006', client: 'Global Solutions', date: '2025-01-03', status: 'Sent', amount: 8750, dueDate: '2025-02-03' },
    { invoice: 'INV-007', client: 'Metro Industries', date: '2024-11-20', status: 'Overdue', amount: 15000, dueDate: '2024-12-20' }
  ];

  const mockTransactionData = [
    { id: 'TXN-001', date: '2025-01-14', client: 'ABC Corp', type: 'Payment', amount: 5000, invoice: 'INV-001' },
    { id: 'TXN-002', date: '2025-01-13', client: 'DEF Inc', type: 'Payment', amount: 7500, invoice: 'INV-003' },
    { id: 'TXN-003', date: '2025-01-12', client: 'XYZ Ltd', type: 'Credit Memo', amount: 500, invoice: 'INV-002' },
    { id: 'TXN-004', date: '2025-01-11', client: 'Pacific Trading', type: 'Payment', amount: 6800, invoice: 'INV-009' },
    { id: 'TXN-005', date: '2025-01-10', client: 'Green Energy Co', type: 'Payment', amount: 11000, invoice: 'INV-014' },
    { id: 'TXN-006', date: '2025-01-09', client: 'Gamma Technologies', type: 'Payment', amount: 8100, invoice: 'INV-018' },
    { id: 'TXN-007', date: '2025-01-08', client: 'TechStart LLC', type: 'Partial Payment', amount: 2500, invoice: 'INV-005' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Comprehensive financial reporting and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value="$2,847,392"
          icon={<DollarSign className="w-8 h-8" />}
          trend="up"
          trendValue="+12.5%"
          className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
        />
        <KPICard
          title="Outstanding A/R"
          value="$89,847"
          icon={<FileText className="w-8 h-8" />}
          trend="down"
          trendValue="-8.2%"
          className="border-[#4285F4]/30"
          style={{ backgroundColor: '#4285F4' + '10' }}
        />
        <KPICard
          title="Active Customers"
          value="298"
          icon={<Users className="w-8 h-8" />}
          trend="up"
          trendValue="+5.1%"
          className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700"
        />
        <KPICard
          title="Collection Rate"
          value="94.2%"
          icon={<TrendingUp className="w-8 h-8" />}
          trend="up"
          trendValue="+2.1%"
          className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('ar-invoicing')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                  activeTab === 'ar-invoicing'
                    ? 'border-[#4285F4] text-[#4285F4]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                A/R Invoicing
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'customers'
                    ? 'border-[#4285F4] text-[#4285F4]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Customers
              </button>
              <button
                onClick={() => setActiveTab('bill-pay')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'bill-pay'
                    ? 'border-[#4285F4] text-[#4285F4]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Bill Pay
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <button className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'ar-invoicing' && (
            <div>
              {/* A/R Sub-tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setArSubTab('ar-aging')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      arSubTab === 'ar-aging'
                        ? 'border-[#4285F4] text-[#4285F4]'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    A/R Aging
                  </button>
                  <button
                    onClick={() => setArSubTab('invoice-status')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      arSubTab === 'invoice-status'
                        ? 'border-[#4285F4] text-[#4285F4]'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Invoice Status
                  </button>
                  <button
                    onClick={() => setArSubTab('executive-summary')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      arSubTab === 'executive-summary'
                        ? 'border-[#4285F4] text-[#4285F4]'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Executive Summary
                  </button>
                  <button
                    onClick={() => setArSubTab('transactions')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      arSubTab === 'transactions'
                        ? 'border-[#4285F4] text-[#4285F4]'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Transactions
                  </button>
                </nav>
              </div>

              {/* A/R Aging Report */}
              {arSubTab === 'ar-aging' && (
                <div>
                  {/* Aging Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current (0-30 days)</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">$89,500</p>
                          <p className="text-sm text-green-600 dark:text-green-400">58%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">31-60 days</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">$35,700</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">23%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">61-90 days</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">$20,200</p>
                          <p className="text-sm text-yellow-600 dark:text-yellow-400">13%</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">90+ days</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">$9,100</p>
                          <p className="text-sm text-red-600 dark:text-red-400">6%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aging Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Invoice #
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Days Overdue
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {mockArAgingData.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                {row.invoice}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {row.client}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {row.dueDate}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                ${row.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-sm font-medium ${
                                row.daysOverdue <= 30 ? 'text-green-600 dark:text-green-400' :
                                row.daysOverdue <= 60 ? 'text-blue-600 dark:text-blue-400' :
                                row.daysOverdue <= 90 ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-red-600 dark:text-red-400'
                              }`}>
                                {row.daysOverdue} days
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Invoice Status Report */}
              {arSubTab === 'invoice-status' && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Invoice #
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {mockInvoiceStatusData.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                {row.invoice}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {row.client}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {row.date}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                row.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                row.status === 'Overdue' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                                row.status === 'Sent' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                row.status === 'Viewed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                                'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                              }`}>
                                {row.status === 'Paid' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {row.status === 'Overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {row.status === 'Sent' && <Send className="w-3 h-3 mr-1" />}
                                {row.status === 'Viewed' && <Eye className="w-3 h-3 mr-1" />}
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                ${row.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {row.dueDate}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Executive Summary Report */}
              {arSubTab === 'executive-summary' && (
                <div>
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                      <div className="flex items-center">
                        <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Time to Pay</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">28 days</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
                      <div className="flex items-center">
                        <DollarSign className="w-8 h-8 text-red-600 dark:text-red-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Outstanding</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">$154,500</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
                      <div className="flex items-center">
                        <Users className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Client</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">Northern Mfg</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
                      <div className="flex items-center">
                        <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Collection Rate</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outstanding by Aging Chart */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Outstanding by Aging</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Current (0-30 days)</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">$89,500</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">31-60 days</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">$35,700</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">61-90 days</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '13%' }}></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">$20,200</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">90+ days</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '6%' }}></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">$9,100</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Clients by Revenue</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">ABC Corp</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">18%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Northern Manufacturing</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">22%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Alpha Consulting</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">19%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Metro Industries</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">15%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">TechStart LLC</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">13%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Others (15 clients)</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">13%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Your A/R portfolio shows a 15% increase in overdue invoices this month, with $65,000 in aging receivables. Priority collections needed: Northern Manufacturing ($22k overdue 75 days), Alpha Consulting ($18.5k overdue 91 days), and Metro Industries ($15k overdue 39 days). Consider implementing early payment discounts for new invoices. The average payment time has increased by 5 days to 28 days compared to last month, indicating potential cash flow concerns.
                    </p>
                  </div>
                </div>
              )}

              {/* Transactions Report */}
              {arSubTab === 'transactions' && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Transaction ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Invoice #
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {mockTransactionData.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                {row.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {row.date}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {row.client}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                row.type === 'Payment' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                row.type === 'Credit Memo' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                                row.type === 'Partial Payment' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                              }`}>
                                {row.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                ${row.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-mono text-sm text-gray-900 dark:text-white">
                                {row.invoice}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              {/* Customer Sub-tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveCustomerTab('rfm-analysis')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeCustomerTab === 'rfm-analysis'
                        ? 'border-[#4285F4] text-[#4285F4]'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    RFM Analysis
                  </button>
                  <button
                    onClick={() => setActiveCustomerTab('customer-behavior')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeCustomerTab === 'customer-behavior'
                        ? 'border-[#4285F4] text-[#4285F4]'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Customer Behavior
                  </button>
                  <button
                    onClick={() => setActiveCustomerTab('lifetime-value')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeCustomerTab === 'lifetime-value'
                        ? 'border-[#4285F4] text-[#4285F4]'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Lifetime Value
                  </button>
                </nav>
              </div>

              {activeCustomerTab === 'rfm-analysis' && (
                <div>
                  {/* Date Range and Action Buttons */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <input
                          type="date"
                          value="2025-01-01"
                          className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        />
                        <span className="text-gray-500 dark:text-gray-400">to</span>
                        <input
                          type="date"
                          value="2025-01-14"
                          className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search customers..."
                          className="pl-8 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Generate Report
                      </button>
                      <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </button>
                      <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </button>
                    </div>
                  </div>

                  {/* RFM Analysis Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Champions */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">Champions</span>
                            <span className="ml-2 text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">1 customers</span>
                          </div>
                          <p className="text-3xl font-bold text-green-800 dark:text-green-200">$45,000</p>
                          <p className="text-sm text-green-600 dark:text-green-400">Avg CLV: 15/5</p>
                        </div>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-3">Your best customers. They buy recently, frequently, and spend the most.</p>
                      <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-3">
                        <p className="text-xs text-green-800 dark:text-green-200 font-medium">Strategy</p>
                        <p className="text-xs text-green-700 dark:text-green-300">Reward them. Can be early adopters for new products. Will promote your brand.</p>
                      </div>
                    </div>

                    {/* Loyalists */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Loyalists</span>
                            <span className="ml-2 text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">2 customers</span>
                          </div>
                          <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">$63,000</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">Avg CLV: 12/5</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">Highly engaged customers with strong service adoption.</p>
                      <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-3">
                        <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">Strategy</p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">Early access to features, loyalty rewards, beta testing.</p>
                      </div>
                    </div>

                    {/* International Tier */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/30 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">International Tier</span>
                            <span className="ml-2 text-xs bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full">1 customers</span>
                          </div>
                          <p className="text-3xl font-bold text-indigo-800 dark:text-indigo-200">$32,000</p>
                          <p className="text-sm text-indigo-600 dark:text-indigo-400">Avg CLV: 10/5</p>
                        </div>
                      </div>
                      <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-3">High-value customers with significant cross-border activity.</p>
                      <div className="bg-indigo-100 dark:bg-indigo-800/30 rounded-lg p-3">
                        <p className="text-xs text-indigo-800 dark:text-indigo-200 font-medium">Strategy</p>
                        <p className="text-xs text-indigo-700 dark:text-indigo-300">Dedicated support, international service enhancements.</p>
                      </div>
                    </div>

                    {/* Growth Opportunities */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Growth Opportunities</span>
                            <span className="ml-2 text-xs bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">1 customers</span>
                          </div>
                          <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">$28,000</p>
                          <p className="text-sm text-purple-600 dark:text-purple-400">Avg CLV: 9/5</p>
                        </div>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">Strong potential customers ready for service expansion.</p>
                      <div className="bg-purple-100 dark:bg-purple-800/30 rounded-lg p-3">
                        <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">Strategy</p>
                        <p className="text-xs text-purple-700 dark:text-purple-300">Cross-sell campaigns, service demonstrations.</p>
                      </div>
                    </div>

                    {/* Invoice King */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/30 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Invoice King</span>
                            <span className="ml-2 text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">1 customers</span>
                          </div>
                          <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">$22,000</p>
                          <p className="text-sm text-yellow-600 dark:text-yellow-400">Avg CLV: 7/5</p>
                        </div>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">Heavy A/R users with potential for service expansion.</p>
                      <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded-lg p-3">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">Strategy</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">Bill Pay marketing, workflow optimization tools.</p>
                      </div>
                    </div>

                    {/* Nurture */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/30 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Nurture</span>
                            <span className="ml-2 text-xs bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">1 customers</span>
                          </div>
                          <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">$18,000</p>
                          <p className="text-sm text-orange-600 dark:text-orange-400">Avg CLV: 6/5</p>
                        </div>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">Developing customers needing guidance and support.</p>
                      <div className="bg-orange-100 dark:bg-orange-800/30 rounded-lg p-3">
                        <p className="text-xs text-orange-800 dark:text-orange-200 font-medium">Strategy</p>
                        <p className="text-xs text-orange-700 dark:text-orange-300">Educational content, value demonstrations, onboarding.</p>
                      </div>
                    </div>

                    {/* At-Risk/Lapsed */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/30 rounded-xl p-6 border border-red-200 dark:border-red-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">At-Risk/Lapsed</span>
                            <span className="ml-2 text-xs bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">1 customers</span>
                          </div>
                          <p className="text-3xl font-bold text-red-800 dark:text-red-200">$8,000</p>
                          <p className="text-sm text-red-600 dark:text-red-400">Avg CLV: 3/5</p>
                        </div>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-3">Low engagement customers requiring immediate attention.</p>
                      <div className="bg-red-100 dark:bg-red-800/30 rounded-lg p-3">
                        <p className="text-xs text-red-800 dark:text-red-200 font-medium">Strategy</p>
                        <p className="text-xs text-red-700 dark:text-red-300">Re-engagement campaigns, special offers, win-back.</p>
                      </div>
                    </div>
                  </div>

                  {/* CLV Score Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">CLV Score Distribution</h4>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">Champions</span>
                            </div>
                            <div className="flex items-center space-x-4 flex-1 mx-8">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full" style={{ width: '13%' }}></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">13%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">Loyalists</span>
                            </div>
                            <div className="flex items-center space-x-4 flex-1 mx-8">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '25%' }}></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">25%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-indigo-500 rounded mr-3"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">International Tier</span>
                            </div>
                            <div className="flex items-center space-x-4 flex-1 mx-8">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-indigo-500 h-3 rounded-full" style={{ width: '13%' }}></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">13%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">Growth Opportunities</span>
                            </div>
                            <div className="flex items-center space-x-4 flex-1 mx-8">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '13%' }}></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">13%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">Invoice King</span>
                            </div>
                            <div className="flex items-center space-x-4 flex-1 mx-8">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '13%' }}></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">13%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">Nurture</span>
                            </div>
                            <div className="flex items-center space-x-4 flex-1 mx-8">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-orange-500 h-3 rounded-full" style={{ width: '13%' }}></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">13%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">At-Risk/Lapsed</span>
                            </div>
                            <div className="flex items-center space-x-4 flex-1 mx-8">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div className="bg-red-500 h-3 rounded-full" style={{ width: '13%' }}></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">13%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">CLV Insights</h4>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                          <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">High-Value Segments</h5>
                          <p className="text-sm text-green-700 dark:text-green-400">
                            Champions and Loyalists represent 25% of customers but generate 52% of total revenue. Focus retention efforts on these segments.
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Growth Opportunity</h5>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            Growth Opportunities and Invoice King segments show strong A/R usage. Cross-sell Bill Pay and Cross-Border services.
                          </p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
                          <h5 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Action Required</h5>
                          <p className="text-sm text-yellow-700 dark:text-yellow-400">
                            At-Risk customers need immediate attention. Implement targeted re-engagement campaigns to prevent churn.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed RFM Analysis Table */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Detailed RFM Analysis</h4>
                        <div className="flex items-center space-x-4">
                          <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm">
                            <option value="all">All Segments</option>
                            <option value="champions">Champions</option>
                            <option value="loyalists">Loyalists</option>
                            <option value="at-risk">At-Risk</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                          />
                          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            <Download className="w-4 h-4 mr-2" />
                            Export CLV Report
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              RFM Score
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Segment
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Recency (Days)
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Frequency
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Monetary
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Last Purchase
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {[
                            { name: 'ABC Corp', id: 'C001', score: '555', segment: 'Champions', recency: 5, frequency: 8, monetary: '$45,000', lastPurchase: '2025-01-10' },
                            { name: 'TechStart LLC', id: 'C002', score: '544', segment: 'Champions', recency: 15, frequency: 6, monetary: '$32,000', lastPurchase: '2024-12-30' },
                            { name: 'Global Solutions', id: 'C003', score: '544', segment: 'Loyal Customers', recency: 8, frequency: 5, monetary: '$28,500', lastPurchase: '2025-01-06' },
                            { name: 'Metro Industries', id: 'C004', score: '444', segment: 'Loyal Customers', recency: 25, frequency: 4, monetary: '$25,000', lastPurchase: '2024-12-20' },
                            { name: 'Northern Manufacturing', id: 'C005', score: '455', segment: 'Champions', recency: 12, frequency: 7, monetary: '$42,000', lastPurchase: '2025-01-02' },
                            { name: 'Alpha Consulting', id: 'C006', score: '244', segment: 'At-Risk', recency: 45, frequency: 5, monetary: '$35,000', lastPurchase: '2024-11-30' },
                            { name: 'Green Energy Co', id: 'C007', score: '433', segment: 'Loyal Customers', recency: 18, frequency: 3, monetary: '$18,000', lastPurchase: '2024-12-27' },
                            { name: 'Digital Dynamics', id: 'C008', score: '144', segment: 'At-Risk', recency: 65, frequency: 4, monetary: '$22,000', lastPurchase: '2024-11-10' }
                          ].map((customer, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                      {customer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{customer.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">{customer.score}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  customer.segment === 'Champions' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                  customer.segment === 'Loyal Customers' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                                  customer.segment === 'At-Risk' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                                  'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                }`}>
                                  {customer.segment}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-900 dark:text-white">{customer.recency}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-900 dark:text-white">{customer.frequency}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{customer.monetary}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-900 dark:text-white">{customer.lastPurchase}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RFM Analysis Insights */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">RFM Analysis Insights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Key Findings</h5>
                        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          <li>• <strong>Champions (13%):</strong> 1 customer generating 18% of total revenue</li>
                          <li>• <strong>At-Risk (25%):</strong> 2 high-value customers needing immediate attention</li>
                          <li>• <strong>New Customers (13%):</strong> 1 recent customer with growth potential</li>
                          <li>• <strong>Lost Customers (13%):</strong> 1 customer worth 98.2% avg re-engagement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Recommended Actions</h5>
                        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          <li>• Launch VIP program for Champions (ABC Corp, Northern LLC, Northern Mfg)</li>
                          <li>• Develop onboarding sequence for New Customers (Digital Dynamics)</li>
                          <li>• Focus marketing spend on Champions and Loyal Customers (70% of budget)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCustomerTab === 'customer-behavior' && (
                <div>
                  {/* Executive Intelligence Brief */}
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 dark:text-red-400 font-bold">🎯</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Executive Intelligence Brief</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      <strong>Critical Insight:</strong> Our AI-powered sentiment analysis has identified $847K in at-risk revenue and $1.2M in untapped upsell opportunities. Three clients show distress signals requiring immediate intervention, while five high-value clients exhibit prime conditions for strategic expansion.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">94.7%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Payment Prediction Accuracy</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">$2.1M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Revenue at Stake (90 Days)</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">73%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Clients Above Baseline Satisfaction</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">12</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">High-Priority Actions Needed</div>
                      </div>
                    </div>
                  </div>

                  {/* AI-Powered Email Sentiment Intelligence */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 dark:text-blue-400 text-sm">📧</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Email Sentiment Intelligence</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-red-200 dark:border-red-700">
                          <div className="flex items-center mb-3">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                            <h4 className="font-semibold text-red-800 dark:text-red-300">High-Risk Sentiment</h4>
                          </div>
                          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">23%</div>
                          <div className="text-sm text-red-700 dark:text-red-400 mb-3">↑ 8% from last month</div>
                          <p className="text-sm text-red-700 dark:text-red-400">Clients showing frustration, urgency, or payment difficulty language</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-700">
                          <div className="flex items-center mb-3">
                            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Neutral/Cautious</h4>
                          </div>
                          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">31%</div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">→ Stable</div>
                          <p className="text-sm text-yellow-700 dark:text-yellow-400">Professional but reserved communication patterns</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                          <div className="flex items-center mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                            <h4 className="font-semibold text-green-800 dark:text-green-300">Positive/Opportunity</h4>
                          </div>
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">46%</div>
                          <div className="text-sm text-green-700 dark:text-green-400 mb-3">↑ 12% from last month</div>
                          <p className="text-sm text-green-700 dark:text-green-400">Satisfied clients with expansion potential</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Email Intelligence Samples</h4>
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white mb-2">
                                <strong>TechFlow Solutions:</strong> "We're experiencing cash flow challenges and need to discuss our payment schedule urgently..."
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                AI Confidence: 96% | Risk Score: HIGH | Detected Keywords: cash flow, urgently, challenges
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white mb-2">
                                <strong>GrowthCorp Industries:</strong> "Really impressed with the new features. Our team is loving the efficiency gains. What other modules do you offer?"
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                AI Confidence: 89% | Opportunity Score: HIGH | Detected Keywords: impressed, loving, what other
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white mb-2">
                                <strong>MidMarket Co:</strong> "The invoice processing has been slower lately. Hope this gets resolved soon."
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                AI Confidence: 78% | Risk Score: MEDIUM | Detected Keywords: slower, hope, resolved
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Behavioral KPI Dashboard */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Behavioral KPI Dashboard</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 text-center border border-blue-200 dark:border-blue-700">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">14.2</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Days to Payment</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 text-center border border-green-200 dark:border-green-700">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">89%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">On-Time Payment Rate</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-6 text-center border border-purple-200 dark:border-purple-700">
                          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">$45K</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Invoice Value</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 text-center border border-orange-200 dark:border-orange-700">
                          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">2.3x</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Communication Frequency</div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-6 text-center border border-teal-200 dark:border-teal-700">
                          <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">73%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Auto-Pay Adoption</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-6 text-center border border-pink-200 dark:border-pink-700">
                          <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">18%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Dispute Rate (YoY)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top 5 Client Intelligence & Strategic Action Plans */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 dark:text-blue-400 text-sm">🎯</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Top 5 Client Intelligence & Strategic Action Plans</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* TechFlow Solutions - High Risk */}
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-700">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">TechFlow Solutions</h4>
                            <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">HIGH RISK</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">$185K</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">32 days</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Payment Time</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                              Recent sentiment: "Cash flow challenges," "need urgent discussion"
                            </p>
                          </div>
                          <div className="bg-red-600 text-white p-4 rounded-lg">
                            <h5 className="font-semibold mb-2 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Crisis Intervention Strategy
                            </h5>
                            <ul className="text-sm space-y-1">
                              <li>• Immediate C-level outreach within 24 hours</li>
                              <li>• Propose 60-day extended payment plan with 2% early-pay incentive</li>
                              <li>• Weekly check-ins until payment velocity normalizes</li>
                              <li>• Offer temporary service credits to maintain relationship</li>
                            </ul>
                          </div>
                        </div>

                        {/* GrowthCorp Industries - High Opportunity */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">GrowthCorp Industries</h4>
                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">HIGH OPPORTUNITY</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">$340K</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">8 days</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Payment Time</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                              Recent sentiment: "Really impressed," "loving efficiency gains," "what other modules?"
                            </p>
                          </div>
                          <div className="bg-green-600 text-white p-4 rounded-lg">
                            <h5 className="font-semibold mb-2 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Expansion Acceleration Strategy
                            </h5>
                            <ul className="text-sm space-y-1">
                              <li>• Schedule executive demo of Premium Suite within 2 weeks</li>
                              <li>• Offer 25% discount on additional modules for Q4 commitment</li>
                              <li>• Introduce them to our Enterprise Success Manager</li>
                              <li>• Propose pilot program for their subsidiary companies</li>
                            </ul>
                          </div>
                        </div>

                        {/* MidMarket Co - Medium Risk */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-700">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">MidMarket Co</h4>
                            <span className="px-3 py-1 bg-yellow-600 text-white text-xs font-medium rounded-full">MEDIUM RISK</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">$127K</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">18 days</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Payment Time</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                              Recent sentiment: "Processing slower lately," "hope this gets resolved"
                            </p>
                          </div>
                          <div className="bg-yellow-600 text-white p-4 rounded-lg">
                            <h5 className="font-semibold mb-2 flex items-center">
                              <Settings className="w-4 h-4 mr-2" />
                              Proactive Resolution Strategy
                            </h5>
                            <ul className="text-sm space-y-1">
                              <li>• Technical review call scheduled within 48 hours</li>
                              <li>• Provide dedicated support channel for next 30 days</li>
                              <li>• Offer complimentary system optimization consultation</li>
                              <li>• Monitor satisfaction metrics weekly</li>
                            </ul>
                          </div>
                        </div>

                        {/* Enterprise Dynamics - High Opportunity */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Enterprise Dynamics</h4>
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">HIGH OPPORTUNITY</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">$420K</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">5 days</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Payment Time</div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                              Recent sentiment: "Exceeded expectations," "exploring additional capabilities"
                            </p>
                          </div>
                          <div className="bg-blue-600 text-white p-4 rounded-lg">
                            <h5 className="font-semibold mb-2 flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              Strategic Partnership Development
                            </h5>
                            <ul className="text-sm space-y-1">
                              <li>• Present Enterprise-level integration options</li>
                              <li>• Offer 12-month contract with volume discounts</li>
                              <li>• Introduce API customization services</li>
                              <li>• Propose case study collaboration for co-marketing</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Communication Patterns Analysis */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Communication Patterns Analysis</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Response Time Analysis */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Response Time Patterns</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">&lt; 2 hours</span>
                              </div>
                              <div className="flex items-center space-x-4 flex-1 mx-8">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">45%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">2-24 hours</span>
                              </div>
                              <div className="flex items-center space-x-4 flex-1 mx-8">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">35%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">&gt; 7 days</span>
                              </div>
                              <div className="flex items-center space-x-4 flex-1 mx-8">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">15%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">&gt; 3 days</span>
                              </div>
                              <div className="flex items-center space-x-4 flex-1 mx-8">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">5%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Payment Behavior Trends */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Behavior Trends</h4>
                          <div className="space-y-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 dark:text-white">{'Early Payers (< 15 days)'}</span>
                                <span className="text-green-600 dark:text-green-400 font-bold">42%</span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Avg: 8.3 days | Trend: ↑ 5% this quarter
                              </div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 dark:text-white">On-Time Payers (15-30 days)</span>
                                <span className="text-blue-600 dark:text-blue-400 font-bold">38%</span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Avg: 22.1 days | Trend: → Stable
                              </div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 dark:text-white">Late Payers (31-60 days)</span>
                                <span className="text-yellow-600 dark:text-yellow-400 font-bold">15%</span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Avg: 45.2 days | Trend: ↓ 3% this quarter
                              </div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 dark:text-white">Problem Payers (&gt; 60 days)</span>
                                <span className="text-red-600 dark:text-red-400 font-bold">5%</span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Avg: 78.5 days | Trend: ↑ 2% this quarter
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 90-Day Cash Flow Risk & Opportunity Forecast */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400 font-bold">🔮</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">90-Day Cash Flow Risk & Opportunity Forecast</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      <strong>Predictive Model Confidence: 94.7%</strong> | Based on sentiment analysis, payment patterns, and communication frequency
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Next 30 Days</div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$1.8M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">High Confidence</div>
                        <div className="text-sm">
                          <span className="text-red-600 dark:text-red-400">Risk: $180K</span> | 
                          <span className="text-green-600 dark:text-green-400"> Opportunity: $340K</span>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Days 31-60</div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$2.1M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Medium Confidence</div>
                        <div className="text-sm">
                          <span className="text-red-600 dark:text-red-400">Risk: $290K</span> | 
                          <span className="text-green-600 dark:text-green-400"> Opportunity: $480K</span>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Days 61-90</div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$1.9M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Medium Confidence</div>
                        <div className="text-sm">
                          <span className="text-red-600 dark:text-red-400">Risk: $380K</span> | 
                          <span className="text-green-600 dark:text-green-400"> Opportunity: $420K</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Actions Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center mb-3">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                            <h5 className="font-semibold text-red-600 dark:text-red-400">Immediate Risk Mitigation</h5>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                              Contact TechFlow Solutions (24h)
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                              Payment plan negotiations (3 clients)
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                              Enhanced monitoring protocols
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center mb-3">
                            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                            <h5 className="font-semibold text-green-600 dark:text-green-400">Opportunity Acceleration</h5>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              GrowthCorp expansion demo (2 weeks)
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              Enterprise Dynamics partnership discussion
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              Q4 upsell campaign launch
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Engagement Metrics */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <Users className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Customer Engagement Metrics</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Clock className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4.2</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Support Tickets/Month</div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">87%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Email Open Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">34%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Portal Login Frequency</div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">91%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Feature Adoption Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Behavioral Insights & Recommendations */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI-Generated Behavioral Insights & Recommendations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Key Behavioral Patterns</h5>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Payment Velocity:</strong> Customers with positive sentiment pay 23% faster on average</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Communication Frequency:</strong> High-touch customers show 34% better retention rates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Service Adoption:</strong> Multi-service users have 67% higher lifetime value</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span><strong>Risk Indicators:</strong> Delayed responses correlate with 78% payment delay probability</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Strategic Recommendations</h5>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Implement proactive sentiment monitoring for all high-value accounts</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Create automated early warning system for payment risk indicators</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Develop personalized communication cadences based on customer preferences</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Launch targeted upsell campaigns for positive sentiment customers</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCustomerTab === 'lifetime-value' && (
                <div className="space-y-8">
                  {/* CLV Insights Panel */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">CLV Insights</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">High-Value Segments</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Champions and Loyalists represent 25% of customers but generate 52% of total revenue. Focus retention efforts on these segments.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Opportunity</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Growth Opportunities and Invoice King segments show strong A/R usage. Cross-sell Bill Pay and Cross-Border services.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Action Required</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        At-Risk customers need immediate attention. Implement targeted re-engagement campaigns to prevent churn.
                      </p>
                    </div>
                  </div>

                  {/* Customer Lifetime Value Analysis Table */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Customer Lifetime Value Analysis</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Showing 8 of 8 customers</p>
                        </div>
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          <Download className="w-4 h-4 mr-2" />
                          Export CLV Report
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              CLV Score
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              A/R Score
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Bill Pay
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Cross-Border
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Segment
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Total Revenue
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              Recommended Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {[
                            {
                              name: 'Northern Manufacturing',
                              id: 'CLV-3821',
                              clvScore: 15,
                              arScore: 5,
                              billPay: 5,
                              crossBorder: 5,
                              segment: 'Champions',
                              revenue: '$45,000',
                              lastUpdate: '2025-01-13',
                              action: 'Offer exclusive perks and personalized service'
                            },
                            {
                              name: 'Alpha Consulting Group',
                              id: 'CLV-4590',
                              clvScore: 13,
                              arScore: 4,
                              billPay: 5,
                              crossBorder: 4,
                              segment: 'Loyalists',
                              revenue: '$38,000',
                              lastUpdate: '2025-01-11',
                              action: 'Provide early access to new features and loyalty rewards'
                            },
                            {
                              name: 'Metro Industries',
                              id: 'CLV-2318',
                              clvScore: 9,
                              arScore: 4,
                              billPay: 4,
                              crossBorder: 1,
                              segment: 'Growth Opportunities',
                              revenue: '$28,000',
                              lastUpdate: '2025-01-10',
                              action: 'Engage them with Cross-Border services'
                            },
                            {
                              name: 'Global Solutions Ltd',
                              id: 'CLV-7530',
                              clvScore: 10,
                              arScore: 3,
                              billPay: 2,
                              crossBorder: 5,
                              segment: 'International Tier',
                              revenue: '$32,000',
                              lastUpdate: '2025-01-09',
                              action: 'Ensure dedicated support for their international needs'
                            },
                            {
                              name: 'TechStart LLC',
                              id: 'CLV-1781',
                              clvScore: 7,
                              arScore: 5,
                              billPay: 1,
                              crossBorder: 1,
                              segment: 'Invoice King',
                              revenue: '$22,000',
                              lastUpdate: '2025-01-08',
                              action: 'Market Bill Pay and other services to simplify workflow'
                            },
                            {
                              name: 'Digital Dynamics',
                              id: 'CLV-6789',
                              clvScore: 6,
                              arScore: 2,
                              billPay: 3,
                              crossBorder: 1,
                              segment: 'Nurture',
                              revenue: '$18,000',
                              lastUpdate: '2025-01-07',
                              action: 'Focus on showing the value of using more services'
                            },
                            {
                              name: 'Startup Ventures',
                              id: 'CLV-9544',
                              clvScore: 3,
                              arScore: 1,
                              billPay: 1,
                              crossBorder: 1,
                              segment: 'At-Risk/Lapsed',
                              revenue: '$8,000',
                              lastUpdate: '2024-12-15',
                              action: 'Consider re-engagement campaign with special offer'
                            },
                            {
                              name: 'Innovation Corp',
                              id: 'CLV-4782',
                              clvScore: 10,
                              arScore: 3,
                              billPay: 4,
                              crossBorder: 3,
                              segment: 'Loyalists',
                              revenue: '$25,000',
                              lastUpdate: '2025-01-06',
                              action: 'Provide early access to new features and loyalty rewards'
                            }
                          ].map((customer, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                      {customer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{customer.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <span className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{customer.clvScore}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">/15</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full" 
                                      style={{ width: `${(customer.arScore / 5) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">{customer.arScore}/5</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full" 
                                      style={{ width: `${(customer.billPay / 5) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">{customer.billPay}/5</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="bg-purple-500 h-2 rounded-full" 
                                      style={{ width: `${(customer.crossBorder / 5) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">{customer.crossBorder}/5</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  customer.segment === 'Champions' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                  customer.segment === 'Loyalists' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                                  customer.segment === 'Growth Opportunities' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                                  customer.segment === 'International Tier' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300' :
                                  customer.segment === 'Invoice King' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                  customer.segment === 'Nurture' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                                  'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                }`}>
                                  {customer.segment}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div>
                                  <p className="font-semibold text-gray-900 dark:text-white">{customer.revenue}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Last: {customer.lastUpdate}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                                  {customer.action}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bill-pay' && (
            <div>
              {/* Bill Pay Report Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bill Pay Report</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive overview of your bills, payments, and cash flow</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm">
                    <option value="all">All Vendors</option>
                    <option value="utilities">Utilities</option>
                    <option value="insurance">Insurance</option>
                    <option value="telecom">Telecommunications</option>
                  </select>
                  <select className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm">
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search bills or vendors..."
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* AP Aging Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">AP Aging Summary</h4>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">1-30 days</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">$8,250</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">31-60 days</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">$3,200</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">61-90 days</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-orange-500 h-3 rounded-full" style={{ width: '8%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">$1,050</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">90+ days</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-red-500 h-3 rounded-full" style={{ width: '2%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">$250</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">Total Outstanding:</span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">$12,750</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Payments Calendar */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Payments Calendar</h4>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                        </button>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">January 2025</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 2; // Start from Dec 30
                        const isCurrentMonth = day > 0 && day <= 31;
                        const hasBills = [5, 15, 20, 25].includes(day);
                        const billCount = hasBills ? Math.floor(Math.random() * 3) + 1 : 0;
                        
                        return (
                          <div
                            key={i}
                            className={`p-2 text-center text-sm relative cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
                              isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'
                            }`}
                          >
                            <span>{day > 0 ? day : day + 31}</span>
                            {hasBills && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                                {billCount}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Upcoming Bills List */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">Next 7 Days</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">PG&E</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Due Jan 15</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">$125.50</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Chase Credit Card</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Due Jan 20</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">$405.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 5 Vendors and Cash Flow */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Top 5 Vendors by Spend */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Top 5 Vendors by Spend</h4>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">PG&E</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-blue-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">35% ($1,505)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Chase Bank</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">25% ($1,080)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Verizon</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-purple-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">20% ($850)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">State Farm</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-orange-500 h-3 rounded-full" style={{ width: '12%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">12% ($515)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">AT&T</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 mx-8">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-red-500 h-3 rounded-full" style={{ width: '8%' }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">8% ($340)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cash Flow Projection */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Cash Flow Projection (3 Months)</h4>
                  </div>
                  <div className="p-6">
                    {/* Chart Area */}
                    <div className="relative h-48 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
                        <svg className="w-full h-full" viewBox="0 0 400 150">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="grid-bill" width="40" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" opacity="0.3"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid-bill)" />
                          
                          {/* Outgoing payments line (red) */}
                          <polyline
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            points="0,120 50,110 100,125 150,115 200,130 250,120 300,135 350,125"
                          />
                          
                          {/* Incoming revenue line (green) */}
                          <polyline
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            points="0,100 50,95 100,85 150,90 200,80 250,85 300,75 350,70"
                          />
                          
                          {/* Net cash flow line (blue) */}
                          <polyline
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            points="0,110 50,102 100,105 150,102 200,105 250,102 300,105 350,97"
                          />
                          
                          {/* Data points */}
                          <circle cx="350" cy="125" r="3" fill="#ef4444" />
                          <circle cx="350" cy="70" r="3" fill="#10b981" />
                          <circle cx="350" cy="97" r="3" fill="#3b82f6" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex items-center justify-center space-x-6 mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Outgoing</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Incoming</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Net Flow</span>
                      </div>
                    </div>

                    {/* Cash Flow Alert */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                        <div>
                          <p className="font-medium text-yellow-800 dark:text-yellow-300">Potential Cash Crunch</p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-400">February shows negative cash flow. Consider adjusting payment schedules.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Payment History</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Vendor Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Invoice Number
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Amount Paid
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Payment Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Payment Method
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { vendor: 'Pacific Gas & Electric', invoice: '#12345', amount: 1200.00, date: '09/01/2025', method: 'ACH', status: 'Paid' },
                        { vendor: 'XYZ Supplies', invoice: '#67890', amount: 450.00, date: '08/25/2025', method: 'Check', status: 'Pending' },
                        { vendor: 'Verizon Wireless', invoice: '#54321', amount: 85.00, date: '08/20/2025', method: 'Credit Card', status: 'Paid' },
                        { vendor: 'State Farm Insurance', invoice: '#98765', amount: 215.00, date: '08/15/2025', method: 'ACH', status: 'Paid' },
                        { vendor: 'AT&T Internet', invoice: '#11223', amount: 75.00, date: '08/10/2025', method: 'Debit Card', status: 'Paid' }
                      ].map((payment, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {payment.vendor}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-mono text-sm text-gray-900 dark:text-white">
                              {payment.invoice}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              ${payment.amount.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {payment.date}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {payment.method === 'ACH' && (
                                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4z" />
                                  <path d="M6 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
                                </svg>
                              )}
                              {payment.method === 'Check' && (
                                <svg className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-1a1 1 0 00-1-1H9a1 1 0 00-1 1v1a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                </svg>
                              )}
                              {(payment.method === 'Credit Card' || payment.method === 'Debit Card') && (
                                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4z" />
                                  <path d="M6 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
                                </svg>
                              )}
                              <span className="text-sm text-gray-900 dark:text-white">{payment.method}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                              payment.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                              'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}>
                              {payment.status === 'Paid' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {payment.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reporting;