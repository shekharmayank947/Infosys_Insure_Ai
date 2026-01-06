import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { profile } = useProfile();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    // Clear any stored tokens or session data
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInEmail');
    localStorage.removeItem('loggedInName');
    sessionStorage.clear();
    
    // Redirect to login page
    navigate('/');
    setIsOpen(false);
  };

  const handleProfileSettings = () => {
    navigate('/settings');
    setIsOpen(false);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 pr-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white overflow-hidden shadow-sm">
          {profile.profilePicture ? (
            <img 
              src={profile.profilePicture} 
              alt={profile.fullName} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <span className="font-medium">
              {getInitials(profile.fullName)}
            </span>
          )}
        </div>

        {/* Name (hidden on mobile) */}
        <span className="hidden md:block text-gray-700 dark:text-gray-200 max-w-[120px] truncate">
          {profile.fullName.split(' ')[0]}
        </span>

        {/* Chevron Icon */}
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-900 dark:text-gray-100 truncate">
              {profile.fullName}
            </p>
            <p className="text-gray-500 dark:text-gray-400 truncate">
              {profile.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Profile Settings */}
            <button
              onClick={handleProfileSettings}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>Profile Settings</span>
            </button>
          </div>

          {/* Sign Out Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 pb-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* CSS for fadeIn animation - inline style */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}