import { Search, Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';

interface NavbarProps {
  userName?: string;
  userEmail?: string;
}

export default function Navbar({ userName = 'User', userEmail = 'user@company.com' }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'New policy uploaded', time: '5 min ago', unread: true },
    { id: 2, title: 'Compliance check completed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Policy renewal reminder', time: '2 hours ago', unread: false },
  ];

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search policies, employees, or documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 ml-4">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200">Notifications</p>
                  </div>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-l-2 ${
                        notif.unread ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent'
                      }`}
                    >
                      <p className="text-gray-800 dark:text-gray-200">{notif.title}</p>
                      <p className="text-gray-500 dark:text-gray-400">{notif.time}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile - Now using ProfileDropdown component */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}