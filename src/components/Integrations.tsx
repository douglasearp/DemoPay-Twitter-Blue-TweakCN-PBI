import React, { useState } from 'react';
import { 
  Link2, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  Settings, 
  Clock, 
  Database, 
  Zap,
  Filter,
  Download,
  Play,
  Pause
} from 'lucide-react';

interface ERPSystem {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  syncFrequency: string;
  dataStatus?: string;
  color: string;
}

interface SyncLog {
  id: string;
  timestamp: string;
  erp: string;
  eventType: 'Invoice Sync' | 'Payment Update' | 'Connection Error' | 'Manual Sync';
  details: string;
  status: 'Success' | 'Partial Success' | 'Failed';
}

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connect' | 'status' | 'settings'>('connect');
  const [syncDirection, setSyncDirection] = useState<'two-way' | 'erp-to-payonward' | 'payonward-to-erp'>('two-way');
  const [hourlySync, setHourlySync] = useState(true);
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'failed'>('all');

  const erpSystems: ERPSystem[] = [
    {
      id: 'quickbooks',
      name: 'QuickBooks Online',
      shortName: 'QB',
      logo: 'QB',
      status: 'connected',
      lastSync: '3 minutes ago',
      syncFrequency: 'Hourly via AI Agent',
      dataStatus: 'Synced 5 new invoices, 3 payments updated',
      color: 'blue'
    },
    {
      id: 'sage',
      name: 'Sage Intacct',
      shortName: 'SI',
      logo: 'SI',
      status: 'connected',
      lastSync: '1 hour ago',
      syncFrequency: 'Hourly via AI Agent',
      dataStatus: 'Synced 2 new invoices, 1 payment updated',
      color: 'green'
    },
    {
      id: 'xero',
      name: 'Xero',
      shortName: 'X',
      logo: 'X',
      status: 'error',
      lastSync: '2 hours ago',
      syncFrequency: 'Hourly via AI Agent',
      dataStatus: 'Connection error - authentication expired',
      color: 'red'
    },
    {
      id: 'dynamics',
      name: 'Microsoft Dynamics 365',
      shortName: 'MS',
      logo: 'MS',
      status: 'disconnected',
      syncFrequency: 'Not configured',
      color: 'gray'
    },
    {
      id: 'netsuite',
      name: 'Oracle NetSuite',
      shortName: 'NS',
      logo: 'NS',
      status: 'disconnected',
      syncFrequency: 'Not configured',
      color: 'gray'
    },
    {
      id: 'freshbooks',
      name: 'FreshBooks',
      shortName: 'FB',
      logo: 'FB',
      status: 'disconnected',
      syncFrequency: 'Not configured',
      color: 'gray'
    }
  ];

  const syncLogs: SyncLog[] = [
    {
      id: '1',
      timestamp: '2025-01-14 14:30:15',
      erp: 'QuickBooks Online',
      eventType: 'Invoice Sync',
      details: 'New invoice INV-2025-001 from QuickBooks added',
      status: 'Success'
    },
    {
      id: '2',
      timestamp: '2025-01-14 14:25:42',
      erp: 'QuickBooks Online',
      eventType: 'Payment Update',
      details: 'Payment for INV-2024-156 pushed to QuickBooks',
      status: 'Success'
    },
    {
      id: '3',
      timestamp: '2025-01-14 13:45:38',
      erp: 'Sage Intacct',
      eventType: 'Invoice Sync',
      details: 'Synced 2 new invoices from Sage Intacct',
      status: 'Success'
    },
    {
      id: '4',
      timestamp: '2025-01-14 12:30:05',
      erp: 'Xero',
      eventType: 'Connection Error',
      details: 'Authentication failed - token expired',
      status: 'Failed'
    },
    {
      id: '5',
      timestamp: '2025-01-14 11:15:22',
      erp: 'QuickBooks Online',
      eventType: 'Payment Update',
      details: 'Payment for INV-2024-155 pushed to QuickBooks',
      status: 'Success'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'disconnected':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'disconnected':
        return 'text-gray-500 dark:text-gray-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'Partial Success':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      case 'Failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const filteredLogs = syncLogs.filter(log => {
    if (logFilter === 'all') return true;
    if (logFilter === 'success') return log.status === 'Success';
    if (logFilter === 'failed') return log.status === 'Failed';
    return true;
  });

  const handleConnect = (erpId: string) => {
    console.log(`Connecting to ${erpId}`);
    // This would trigger the OAuth flow for the specific ERP
  };

  const handleManualSync = (erpId: string) => {
    console.log(`Manual sync triggered for ${erpId}`);
    // This would trigger an immediate sync
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Integrations</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Connect and synchronize your ERP systems with PayOnward</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('connect')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === 'connect'
                  ? 'border-[#4285F4] text-[#4285F4]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Link2 className="w-4 h-4 mr-2" />
              Connect ERPs
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === 'status'
                  ? 'border-[#4285F4] text-[#4285F4]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Database className="w-4 h-4 mr-2" />
              Integration Status
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === 'settings'
                  ? 'border-[#4285F4] text-[#4285F4]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings & Logs
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'connect' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Connect Your ERPs</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Synchronize invoice data and payment statuses across your business to keep everything up to date.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {erpSystems.map((erp) => (
                  <div key={erp.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-[#4285F4]/30 transition-all duration-300 overflow-hidden">
                    {/* Header with logo and status */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-md ${
                          erp.color === 'blue' ? 'bg-[#4285F4]' :
                        erp.color === 'green' ? 'bg-green-600' :
                        erp.color === 'red' ? 'bg-red-600' :
                        'bg-gray-400'
                      }`}>
                        {erp.logo}
                      </div>
                        
                        {/* Status Badge */}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          erp.status === 'connected' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : erp.status === 'error'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {erp.status === 'connected' ? 'Active' : 
                           erp.status === 'error' ? 'Error' : 'Inactive'}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{erp.name}</h4>
                      
                      {/* Status indicator with icon */}
                      <div className="flex items-center mb-4">
                      {erp.status === 'connected' && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Connected</span>
                        </div>
                      )}
                      
                      {erp.status === 'error' && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                            <span className="text-sm text-red-600 dark:text-red-400 font-medium">Connection Error</span>
                          </div>
                        )}
                        
                        {erp.status === 'disconnected' && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Not Connected</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="px-6 pb-6">
                      {/* Sync info for connected systems */}
                      {erp.status === 'connected' && erp.lastSync && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                          <div className="flex items-center mb-1">
                            <Clock className="w-3 h-3 text-green-600 dark:text-green-400 mr-2" />
                            <span className="text-xs font-medium text-green-700 dark:text-green-300">Last Sync</span>
                          </div>
                          <p className="text-sm text-green-800 dark:text-green-200">{erp.lastSync}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">{erp.syncFrequency}</p>
                        </div>
                      )}
                      
                      {/* Error info for failed systems */}
                      {erp.status === 'error' && erp.dataStatus && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                          <div className="flex items-center mb-1">
                            <AlertCircle className="w-3 h-3 text-red-600 dark:text-red-400 mr-2" />
                            <span className="text-xs font-medium text-red-700 dark:text-red-300">Issue</span>
                          </div>
                          <p className="text-sm text-red-800 dark:text-red-200">{erp.dataStatus}</p>
                        </div>
                      )}

                      {/* Action button */}
                      <button
                        onClick={() => handleConnect(erp.id)}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                          erp.status === 'connected' 
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-default'
                            : erp.status === 'error'
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                            : 'bg-[#4285F4] hover:bg-[#4285F4]/90 text-white shadow-md hover:shadow-lg'
                        }`}
                        disabled={erp.status === 'connected'}
                      >
                        {erp.status === 'connected' ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Connected</span>
                          </>
                        ) : erp.status === 'error' ? (
                          <>
                            <RefreshCw className="w-4 h-4" />
                            <span>Retry Connection</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4" />
                            <span>Connect</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Active Integrations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor the status and last sync time for each connected ERP.
                </p>
              </div>

              <div className="space-y-6">
                {erpSystems.filter(erp => erp.status !== 'disconnected').map((erp) => (
                  <div key={erp.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-md ${
                            erp.color === 'blue' ? 'bg-[#4285F4]' :
                          erp.color === 'green' ? 'bg-green-600' :
                          erp.color === 'red' ? 'bg-red-600' :
                          'bg-gray-400'
                        }`}>
                          {erp.logo}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{erp.name}</h4>
                            <div className="flex items-center mt-2">
                              {erp.status === 'connected' ? (
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Active & Syncing</span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">Connection Error</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          erp.status === 'connected' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {erp.status === 'connected' ? 'Active' : 'Error'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Sync Information */}
                        <div className="lg:col-span-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Sync</span>
                              </div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {erp.lastSync || 'Never'}
                              </p>
                            </div>
                            
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Zap className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Frequency</span>
                              </div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {erp.syncFrequency}
                              </p>
                        </div>
                        </div>
                          
                          {/* Status Message */}
                          {erp.dataStatus && (
                            <div className={`mt-4 p-4 rounded-lg border ${
                              erp.status === 'connected' 
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                            }`}>
                              <div className="flex items-start">
                                {erp.status === 'connected' ? (
                                  <Database className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2 mt-0.5" />
                                )}
                                <div>
                                  <p className={`text-sm font-medium ${
                                    erp.status === 'connected' 
                                      ? 'text-green-700 dark:text-green-300'
                                      : 'text-red-700 dark:text-red-300'
                                  }`}>
                                    {erp.status === 'connected' ? 'Sync Status' : 'Error Details'}
                                  </p>
                                  <p className={`text-sm mt-1 ${
                                    erp.status === 'connected' 
                                      ? 'text-green-800 dark:text-green-200'
                                      : 'text-red-800 dark:text-red-200'
                                  }`}>
                                    {erp.dataStatus}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <div className="flex items-end">
                        <button
                          onClick={() => handleManualSync(erp.id)}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                              erp.status === 'error'
                                ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                                : 'bg-[#4285F4] hover:bg-[#4285F4]/90 text-white shadow-md hover:shadow-lg'
                            }`}
                          disabled={erp.status === 'error'}
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>{erp.status === 'error' ? 'Retry Connection' : 'Sync Now'}</span>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sync Settings & History</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  View detailed logs and adjust preferences.
                </p>
              </div>

              {/* Configuration Options */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 mb-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuration Options</h4>
                
                <div className="space-y-6">
                  {/* Sync Direction */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Sync Direction
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="syncDirection"
                          value="two-way"
                          checked={syncDirection === 'two-way'}
                          onChange={(e) => setSyncDirection(e.target.value as any)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-2 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          style={{ color: '#4285F4', '--tw-ring-color': '#4285F4' } as React.CSSProperties}
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                          <strong>Two-Way</strong> - Sync both ways between ERP and PayOnward
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="syncDirection"
                          value="erp-to-payonward"
                          checked={syncDirection === 'erp-to-payonward'}
                          onChange={(e) => setSyncDirection(e.target.value as any)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-2 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          style={{ color: '#4285F4', '--tw-ring-color': '#4285F4' } as React.CSSProperties}
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                          <strong>ERP to PayOnward Only</strong> - Only pull data from ERP to PayOnward
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="syncDirection"
                          value="payonward-to-erp"
                          checked={syncDirection === 'payonward-to-erp'}
                          onChange={(e) => setSyncDirection(e.target.value as any)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-2 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          style={{ color: '#4285F4', '--tw-ring-color': '#4285F4' } as React.CSSProperties}
                        />
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                          <strong>PayOnward to ERP Only</strong> - Only push data from PayOnward to ERP
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* AI Agent Configuration */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Enable Hourly Sync
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          AI agent will automatically sync data every hour
                        </p>
                      </div>
                      <button
                        onClick={() => setHourlySync(!hourlySync)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          hourlySync ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            hourlySync ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h4>
                    <div className="flex items-center space-x-4">
                      <select
                        value={logFilter}
                        onChange={(e) => setLogFilter(e.target.value as any)}
                        className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                      >
                        <option value="all">All Events</option>
                        <option value="success">Success Only</option>
                        <option value="failed">Failed Only</option>
                      </select>
                      <button className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </button>
                      <button className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {filteredLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {log.eventType === 'Invoice Sync' && <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                            {log.eventType === 'Payment Update' && <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />}
                            {log.eventType === 'Connection Error' && <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                            {log.eventType === 'Manual Sync' && <RefreshCw className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{log.eventType}</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-900 dark:text-white">{log.details}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{log.erp}</span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLogStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
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

export default Integrations;