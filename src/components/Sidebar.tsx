import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Settings, 
  Shield,
  CheckCircle,
  Lightbulb,
  Menu,
  X,
  UserCircle,
  UserCog,
  Clock
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  role: 'hr' | 'employee';
}

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hrMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/hr' },
    { icon: ShieldCheck, label: 'Compliance Checker', path: '/compliance-checker' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: UserCircle, label: 'My Profile', path: '/hr-profile' },
  ];

  const employeeMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/employee' },
    { icon: CheckCircle, label: 'AI Compliance Checker', path: '/compliance-checker' },
    { icon: UserCircle, label: 'My Profile', path: '/settings' },
  ];

  let menuItems = employeeMenuItems;
  let dashboardPath = '/employee';

  if (role === 'hr') {
    menuItems = hrMenuItems;
    dashboardPath = '/hr';
  }

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <Link to={dashboardPath} className="flex items-center space-x-3 text-white">
          <Shield className="w-8 h-8" />
          <div>
            <div>InsurAI</div>
            <p className="text-blue-100 opacity-90">Policy Automation</p>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {role === 'employee' && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200 mb-2">Need Help?</p>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Contact support team</p>
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-center"
            >
              Get Support
            </Link>
          </div>
        )}
        {role === 'hr' && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-gray-700 dark:text-gray-300">HR Administrator</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-2xl z-40 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-30">
        <SidebarContent />
      </aside>
    </>
  );
}