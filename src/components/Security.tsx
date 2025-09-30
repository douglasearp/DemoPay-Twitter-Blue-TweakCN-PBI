import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  MapPin, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Save,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';

const Security: React.FC = () => {
  const [geofenceRadius, setGeofenceRadius] = useState(5);
  const [geofenceEnabled, setGeofenceEnabled] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    userId: 'user@invoiceai.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [currentLocation] = useState({
    address: '811 Main Street, Kansas City, MO 64105',
    lat: 39.1012,
    lng: -94.5844
  });

  const handlePasswordChange = (field: string, value: string) => {
    setUserCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCredentials = () => {
    // Mock save functionality
    console.log('Saving credentials:', userCredentials);
  };

  const handleRadiusChange = (radius: number) => {
    setGeofenceRadius(radius);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your security preferences and authentication settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Geofencing Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-3" style={{ color: '#4285F4' }} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Geofencing</h2>
            </div>
          </div>
          
          <div className="p-6">
            {/* Map Container */}
            <div className="mb-6">
              <div className="relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg h-64 overflow-hidden border border-gray-200 dark:border-gray-600">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-100 to-blue-100 dark:from-green-800/30 dark:via-green-700/20 dark:to-blue-800/30">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-gray-300 dark:border-gray-600"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Streets */}
                  <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-400 dark:bg-gray-500"></div>
                  <div className="absolute top-0 bottom-0 right-1/3 w-1 bg-gray-400 dark:bg-gray-500"></div>
                  
                  {/* Location Pin */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      {/* Geofence Circle */}
                      <div 
                        className="absolute rounded-full border-2"
                        style={{
                          borderColor: '#4285F4',
                          backgroundColor: '#4285F4' + '20',
                          width: `${geofenceRadius * 20}px`,
                          height: `${geofenceRadius * 20}px`,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                      
                      {/* Location Pin */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg relative z-10" style={{ backgroundColor: '#4285F4' }}>
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Area Labels */}
                  <div className="absolute top-4 left-4 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded">
                    North End
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded">
                    Financial District
                  </div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Current Location</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentLocation.address}</p>
            </div>

            {/* Radius Control */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Geofence Radius: {geofenceRadius} miles
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={geofenceRadius}
                onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 mile</span>
                <span>25 miles</span>
              </div>
            </div>

            {/* Geofence Toggle */}
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Geofencing Active</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">MFA required outside radius</p>
                </div>
              </div>
              <button
                onClick={() => setGeofenceEnabled(!geofenceEnabled)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  geofenceEnabled
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {geofenceEnabled ? 'Turn Off Lock' : 'Turn On Lock'}
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-6">
          {/* MFA Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Factor Authentication</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between p-4 rounded-lg border" style={{ backgroundColor: '#4285F4' + '10', borderColor: '#4285F4' + '30' }}>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">MFA Protection</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Required for sensitive operations</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mfaEnabled}
                    onChange={(e) => setMfaEnabled(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              
              {mfaEnabled && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">MFA is active and protecting your account</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Credentials */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <User className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Credentials</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* User ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  User ID / Email
                </label>
                <input
                  type="email"
                  value={userCredentials.userId}
                  onChange={(e) => handlePasswordChange('userId', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={userCredentials.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={userCredentials.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={userCredentials.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveCredentials}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Credentials
              </button>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Status</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Account Secure</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">ACTIVE</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">MFA Enabled</span>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">PROTECTED</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Geofencing Active</span>
                </div>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">MONITORING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;