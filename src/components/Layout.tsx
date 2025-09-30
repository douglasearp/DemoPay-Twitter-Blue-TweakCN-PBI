import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CreditCard, 
  Shield,
  Sun, 
  Moon,
  Building2,
  Globe,
  MessageCircle,
  ArrowRightLeft,
  Link2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'billpay', label: 'Bill Pay', icon: CreditCard },
    { id: 'crossborder', label: 'Cross Border', icon: Globe },
    { id: 'p2pa2a', label: 'P2P / A2A', icon: ArrowRightLeft },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'reporting', label: 'Reports', icon: BarChart3 },
    { id: 'askpenny', label: 'Ask Penny AI', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`} style={{ backgroundColor: 'oklch(0.623 0.214 259.815)' }}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center px-6 py-4 border-b border-white/20 relative">
            <h1 className="text-xl text-white">
              <span className="font-bold">Pay</span>Onward {">>"}
            </h1>
          </div>

          {/* Toggle Arrow */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-1/2 -right-3 z-10 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            style={{ transform: 'translateY(-50%)' }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold text-white/70 uppercase tracking-wider">
                Navigation
              </p>
            )}
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200 ${
                    isCollapsed 
                      ? 'px-3 py-3 justify-center' 
                      : 'px-3 py-3'
                  } ${
                    isActive
                      ? 'text-white border-l-4 border-white shadow-md'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  style={isActive ? { backgroundColor: 'oklch(0.623 0.214 259.815 / 0.3)' } : {}}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`${isCollapsed ? 'w-7 h-7' : 'w-6 h-6 mr-3'} ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`} />
                  {!isCollapsed && item.label}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-white/20">
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-full px-3 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 ${
                isCollapsed ? 'flex-col' : ''
              }`}
              title={isCollapsed ? (theme === 'light' ? 'Dark Mode' : 'Light Mode') : ''}
            >
              {theme === 'light' ? (
                <Moon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} />
              ) : (
                <Sun className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} />
              )}
              {!isCollapsed && (theme === 'light' ? 'Dark Mode' : 'Light Mode')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;