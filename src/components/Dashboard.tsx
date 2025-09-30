import React, { useState, useEffect, useRef } from 'react';
import { 
  DollarSign, 
  FileText, 
  CreditCard, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  Phone,
  FileCheck,
  Target,
  ChevronDown
} from 'lucide-react';
import KPICard from './KPICard';
import { dashboardKPIs, mockInvoices, mockBillPayments } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [cardView, setCardView] = useState<'overview' | 'growth'>('overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const recentInvoices = mockInvoices.slice(0, 5);
  const upcomingPayments = mockBillPayments.slice(0, 4);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Overview of your financial operations</p>
          </div>
          
          {/* Card View Toggle Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
            >
              <span>{cardView === 'overview' ? 'Overview' : 'Growth'}</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setCardView('overview');
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    cardView === 'overview' 
                      ? 'text-[#4285F4] font-medium' 
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => {
                    setCardView('growth');
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    cardView === 'growth' 
                      ? 'text-[#4285F4] font-medium' 
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  Growth
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview KPI Grid */}
      {cardView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={dashboardKPIs.revenue.totalRevenue}
            icon={<DollarSign className="w-8 h-8" />}
            trend="up"
            trendValue={dashboardKPIs.revenue.monthlyGrowth}
          />
          <KPICard
            title="Pending Invoices"
            value={dashboardKPIs.invoices.pendingInvoices}
            icon={<FileText className="w-8 h-8" />}
            trend="down"
            trendValue="-8.2%"
          />
          <KPICard
            title="Active Customers"
            value={dashboardKPIs.customers.activeCustomers}
            icon={<Users className="w-8 h-8" />}
            trend="up"
            trendValue="+5.1%"
          />
          <KPICard
            title="Scheduled Payments"
            value={dashboardKPIs.payments.scheduledPayments}
            icon={<CreditCard className="w-8 h-8" />}
            trend="stable"
            trendValue="0%"
          />
        </div>
      )}

      {/* Growth KPI Grid */}
      {cardView === 'growth' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Revenue Growth"
            value="+12.5%"
            icon={<TrendingUp className="w-8 h-8" />}
            trend="up"
            trendValue="+2.1%"
            className="border-l-4 border-l-[#5cb85c]"
          />
          <KPICard
            title="Customer Growth"
            value="+8.3%"
            icon={<Users className="w-8 h-8" />}
            trend="up"
            trendValue="+1.2%"
            className="border-l-4 border-l-[#5cb85c]"
          />
          <KPICard
            title="Payment Growth"
            value="+15.7%"
            icon={<CreditCard className="w-8 h-8" />}
            trend="up"
            trendValue="+3.4%"
            className="border-l-4 border-l-[#5cb85c]"
          />
          <KPICard
            title="Collection Growth"
            value="+9.8%"
            icon={<CheckCircle className="w-8 h-8" />}
            trend="up"
            trendValue="+1.8%"
            className="border-l-4 border-l-[#5cb85c]"
          />
        </div>
      )}

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Collection Trend Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-[#4285F4]/20 dark:border-[#4285F4]/30 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Collection Trend</h3>
              <button className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                30 Days
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6">
            {/* Chart Area */}
            <div className="relative h-64 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/5 to-[#4285F4]/10 dark:from-[#4285F4]/5 dark:to-[#4285F4]/10 rounded-lg">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-4">
                  <span>$70k</span>
                  <span>$60k</span>
                  <span>$50k</span>
                  <span>$40k</span>
                  <span>$30k</span>
                  <span>$20k</span>
                </div>
                
                {/* Area Chart */}
                <div className="ml-8 mr-4 h-full relative">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Issued area (darker blue, behind) */}
                    <path
                      d="M 0,180 L 60,160 L 120,140 L 180,160 L 240,150 L 300,120 L 360,80 L 400,60 L 400,200 L 0,200 Z"
                      fill="#0047AB"
                      fillOpacity="0.3"
                    />
                    
                    {/* Collected area (lighter blue, on top) */}
                    <path
                      d="M 0,160 L 60,140 L 120,150 L 180,120 L 240,130 L 300,110 L 360,100 L 400,90 L 400,200 L 0,200 Z"
                      fill="#4285F4"
                      fillOpacity="0.4"
                    />
                    
                    {/* Collected line */}
                    <polyline
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="2"
                      points="0,160 60,140 120,150 180,120 240,130 300,110 360,100 400,90"
                    />
                    
                    {/* Issued line */}
                    <polyline
                      fill="none"
                      stroke="#0047AB"
                      strokeWidth="2"
                      points="0,180 60,160 120,140 180,160 240,150 300,120 360,80 400,60"
                    />
                    
                    {/* Data points */}
                    <circle cx="400" cy="90" r="4" fill="#4285F4" />
                    <circle cx="400" cy="90" r="2" fill="white" />
                    <circle cx="400" cy="60" r="4" fill="#0047AB" />
                    <circle cx="400" cy="60" r="2" fill="white" />
                  </svg>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-8 right-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Aug 12</span>
                  <span>Aug 17</span>
                  <span>Aug 22</span>
                  <span>Aug 27</span>
                  <span>Sep 1</span>
                  <span>Sep 6</span>
                  <span>Sep 11</span>
                  <span>Sep 16</span>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#4285F4] rounded-full mr-2"></div>
                <span className="text-sm text-[#4285F4]">Collected</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#0047AB] rounded-full mr-2"></div>
                <span className="text-sm text-[#0047AB]">Issued</span>
              </div>
            </div>
            
            {/* Aging Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4285F4] rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[80px]">Current</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-[#4285F4] h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">$589k</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4285F4] rounded-full mr-3 opacity-80"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[80px]">1-30 days</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-[#4285F4] h-2 rounded-full opacity-80" style={{ width: '52%' }}></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">$308k</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4285F4] rounded-full mr-3 opacity-60"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[80px]">31-60 days</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-[#4285F4] h-2 rounded-full opacity-60" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">$192k</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4285F4] rounded-full mr-3 opacity-40"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[80px]">61-90 days</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-[#4285F4] h-2 rounded-full opacity-40" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">$115k</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#4285F4] rounded-full mr-3 opacity-20"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[80px]">90+ days</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-[#4285F4] h-2 rounded-full opacity-20" style={{ width: '13%' }}></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">$76k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Collections */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-[#4285F4]/20 dark:border-[#4285F4]/30 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Collections</h3>
          </div>
          <div className="p-6">
            {/* Circular Progress */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#4285F4"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50 * 0.75} ${2 * Math.PI * 50}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4285F4]">$54.2k</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Payments logged</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-[#4285F4] mr-2" />
                  <span className="text-sm text-[#4285F4]">Calls completed</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">12 / 30</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="w-4 h-4 text-[#4285F4] opacity-80 mr-2" />
                  <span className="text-sm text-[#4285F4] opacity-80">Promises captured</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">9</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileCheck className="w-4 h-4 text-[#4285F4] opacity-60 mr-2" />
                  <span className="text-sm text-[#4285F4] opacity-60">Invoices reconciled</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">47</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg" style={{ backgroundColor: '#5cb85c' }}>
                <DollarSign className="w-4 h-4 mr-2" />
                Record Payment
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg" style={{ backgroundColor: '#4285F4', opacity: 0.8 }}>
                <FileText className="w-4 h-4 mr-2" />
                Log Promise
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-[#4285F4]/20 dark:border-[#4285F4]/30 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Invoices</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg transition-colors duration-200" style={{ backgroundColor: '#4285F4' + '10' }}>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.companyName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-[#4285F4]/20 dark:border-[#4285F4]/30 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Payments</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg transition-colors duration-200" style={{ backgroundColor: '#4285F4' + '10' }}>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{payment.vendor}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{payment.paymentMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;