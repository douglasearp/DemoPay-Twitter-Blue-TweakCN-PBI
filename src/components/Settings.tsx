import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Shield, 
  TrendingUp, 
  DollarSign,
  Check,
  Plus
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'subscriptions'>('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    invoiceAlerts: true,
    paymentAlerts: true,
    securityAlerts: true,
    marketingEmails: false
  });

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    title: 'Finance Manager',
    timezone: 'America/New_York',
    language: 'English (US)'
  });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const subscriptionPlans = [
    {
      id: 'ar-invoice',
      name: 'A/R Invoice Management',
      price: 49,
      period: 'per month - usage fees apply for payments',
      enabled: true,
      features: [
        'Create branded invoices',
        'Automate reminders & reconcile faster',
        'Unlimited invoices & customer portal',
        'Automated collections & payment links',
        'Cash application & GL mapping'
      ]
    },
    {
      id: 'ar-premium',
      name: 'Bill Pay',
      price: 59,
      period: 'per month ACH/Check fees apply',
      popular: true,
      enabled: true,
      features: [
        'Digitize AP with approvals, ACH, and check fulfillment',
        'Multi-step approvals & audit trail',
        'ACH, mailed checks, and virtual cards',
        'Vendor onboarding & 1099 support'
      ]
    },
    {
      id: 'cross-border',
      name: 'Cross-Border Remittance',
      price: 79,
      period: 'per month + FX spread. KYC/KYB required',
      enabled: true,
      features: [
        'Send international wires to 130+ countries with verified beneficiaries',
        'USD/EUR/GBP sending with SWIFT & local rails',
        'Real-time FX quotes & rate locks',
        'Sanctions & AML screening included'
      ]
    },
    {
      id: 'p2p-a2a',
      name: 'P2P / A2A Money Transfer',
      price: 29,
      period: 'per month - network fees apply',
      enabled: true,
      features: [
        'Move money between users and accounts with risk controls',
        'Instant RTP & same-day ACH support',
        'Account linking with micro-deposits or tokens',
        'Velocity limits & fraud controls'
      ]
    },
    {
      id: 'integrations',
      name: 'Integrations for ERP',
      price: 39,
      period: 'per month per connection',
      enabled: true,
      features: [
        'Two-way sync for invoices, bills, vendors, and GL with your ERP',
        'QuickBooks, NetSuite, Xero connectors',
        'Webhooks, SSO, and sandbox support',
        'Auto-mapping & duplicate detection'
      ]
    },
    {
      id: 'analytics',
      name: 'Reports',
      price: 49,
      period: 'per month includes AI assistance',
      features: [
        'AI assistant reports and dashboards to save you time',
        'Prebuilt financial dashboards with drill-down capability',
        'AI insights & auto-summaries',
        'Export CSV/PDF & schedule email reports'
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account preferences and configurations</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === 'profile'
                  ? 'border-[#4285F4] text-[#4285F4]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              User Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === 'notifications'
                  ? 'border-[#4285F4] text-[#4285F4]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === 'subscriptions'
                  ? 'border-[#4285F4] text-[#4285F4]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Subscriptions
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={profile.language}
                      onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      <option value="English (US)">English (US)</option>
                      <option value="English (UK)">English (UK)</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8">
                  <button className="px-6 py-3 text-white rounded-lg transition-colors duration-200" style={{ backgroundColor: '#4285F4' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('email')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        notifications.email ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.email ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('sms')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        notifications.sms ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.sms ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Push Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('push')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        notifications.push ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.push ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Invoice Alerts */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Invoice Alerts</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about invoice updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('invoiceAlerts')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        notifications.invoiceAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.invoiceAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Payment Alerts */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Payment Alerts</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about payment status</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('paymentAlerts')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        notifications.paymentAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.paymentAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Security Alerts */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Security Alerts</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about security events</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('securityAlerts')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        notifications.securityAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Marketing Emails */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Marketing Emails</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive marketing communications</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('marketingEmails')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        notifications.marketingEmails ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Subscriptions & Add-ons</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Enable only what you need. Manage finance workflows like invoices, bill pay, cross-border payments, transfers, and ERP sync.
                </p>
                
                {/* Payment Method */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Payment method on file</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Visa ••••4242</p>
                      </div>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                      Update
                    </button>
                  </div>
                </div>

                {/* Pricing Note */}
                <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-8">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Prices shown are monthly. Usage fees (e.g., ACH, wires, FX) billed separately. No long-term contracts. Cancel anytime, prorated.
                  </p>
                </div>

                {/* Subscription Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subscriptionPlans.map((plan) => (
                    <div key={plan.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 relative">
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Most popular
                          </span>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                        <div className="flex items-baseline mb-2">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{plan.period}</p>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                          plan.enabled
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {plan.enabled ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Check className="w-4 h-4" />
                            <span>Enabled</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Subscribe</span>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Support Section */}
                <div className="mt-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Need help choosing? Contact support or your account manager for a tailored quote.
                  </p>
                  <div className="flex space-x-4">
                    <button className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200">
                      Help Center
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;