import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  User, Mail, Phone, MapPin, Calendar, Upload, Edit, Save, X, 
  Bell, Moon, Sun, Globe, Check, Shield, Lock, Activity, 
  FileText, Users, BarChart3, Settings as SettingsIcon, Key
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';

export default function HRProfile() {
  const { profile: contextProfile, updateProfile: updateContextProfile } = useProfile();
  const { theme, setTheme } = useTheme();

  // Profile state - original data
  const [originalProfile, setOriginalProfile] = useState({
    fullName: contextProfile.fullName || 'HR Manager',
    email: contextProfile.email,
    phone: contextProfile.phone || '+1 (555) 123-4567',
    hrId: 'HR-2024-001',
    department: 'Human Resources',
    designation: 'HR Manager',
    joinDate: '2023-01-15',
    reportingTo: 'Chief People Officer',
    location: 'New York, NY',
    systemRole: 'HR Administrator'
  });

  // Current profile state (editable)
  const [profile, setProfile] = useState({ ...originalProfile });
  
  // Profile picture state
  const [profilePicture, setProfilePicture] = useState<string | null>(contextProfile.profilePicture);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync profile state when context changes
  useEffect(() => {
    const updatedProfile = {
      fullName: contextProfile.fullName || 'HR Manager',
      email: contextProfile.email,
      phone: contextProfile.phone || '+1 (555) 123-4567',
      hrId: 'HR-2024-001',
      department: 'Human Resources',
      designation: 'HR Manager',
      joinDate: '2023-01-15',
      reportingTo: 'Chief People Officer',
      location: 'New York, NY',
      systemRole: 'HR Administrator'
    };
    setOriginalProfile(updatedProfile);
    setProfile(updatedProfile);
    setProfilePicture(contextProfile.profilePicture);
  }, [contextProfile]);

  // Preferences state
  const [originalPreferences, setOriginalPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    theme: theme as 'light' | 'dark',
    language: 'en-US',
    twoFactorAuth: true
  });

  const [preferences, setPreferences] = useState({ ...originalPreferences });
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sync theme from ThemeContext
  useEffect(() => {
    setPreferences(prev => ({ ...prev, theme: theme }));
    setOriginalPreferences(prev => ({ ...prev, theme: theme }));
  }, [theme]);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s()+\-]+$/;
    const digitCount = phone.replace(/\D/g, '').length;
    return phoneRegex.test(phone) && digitCount >= 10 && digitCount <= 15;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!profile.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(profile.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!profile.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(profile.phone)) {
      newErrors.phone = 'Invalid phone number (10-15 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        toast.success('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    setOriginalProfile({ ...profile });
    updateContextProfile({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      profilePicture: profilePicture
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setProfile({ ...originalProfile });
    setErrors({});
    setIsEditing(false);
    toast.info('Changes discarded');
  };

  const handleEditPreferences = () => {
    setIsEditingPreferences(true);
  };

  const handleSavePreferences = () => {
    setOriginalPreferences({ ...preferences });
    if (preferences.theme !== theme) {
      setTheme(preferences.theme);
    }
    setIsEditingPreferences(false);
    toast.success('Preferences updated successfully!');
  };

  const handleCancelPreferences = () => {
    setPreferences({ ...originalPreferences });
    setIsEditingPreferences(false);
    toast.info('Changes discarded');
  };

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    // Simulate password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
    toast.success('Password changed successfully!');
  };

  // Activity summary data
  const activitySummary = {
    policiesUploaded: 42,
    employeesManaged: 84,
    complianceReviewed: 156,
    reportsGenerated: 28,
    lastLogin: new Date().toLocaleDateString(),
    accountCreated: '2023-01-15'
  };

  // System permissions
  const systemPermissions = [
    { name: 'Upload Policies', granted: true },
    { name: 'View Employee Records', granted: true },
    { name: 'Manage Compliance Issues', granted: true },
    { name: 'Generate Reports', granted: true },
    { name: 'User Management', granted: true },
    { name: 'System Configuration', granted: true },
    { name: 'Audit Logs Access', granted: true },
    { name: 'Data Export', granted: true }
  ];

  return (
    <Layout role="hr">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your HR account details and preferences</p>
        </div>

        {/* Profile Picture and Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-gray-900 dark:text-white">Profile Information</h3>
            {!isEditing ? (
              <button
                onClick={handleEditProfile}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-start space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center border-4 border-blue-100 dark:border-blue-900">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </div>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2">Max 5MB</p>
            </div>

            {/* Profile Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* HR ID */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">HR ID</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.hrId}
                    disabled
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Department</label>
                <input
                  type="text"
                  value={profile.department}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg cursor-not-allowed"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Designation</label>
                <input
                  type="text"
                  value={profile.designation}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg cursor-not-allowed"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Join Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.joinDate}
                    disabled
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Note:</strong> System-managed fields (HR ID, Department, Designation, Join Date) cannot be modified. 
                For changes to these fields, please contact the system administrator.
              </p>
            </div>
          )}
        </div>

        {/* Activity Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-gray-900 dark:text-white">Activity Summary</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-gray-600 dark:text-gray-400">Policies Uploaded</p>
              </div>
              <p className="text-gray-900 dark:text-white">{activitySummary.policiesUploaded}</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <p className="text-gray-600 dark:text-gray-400">Employees Managed</p>
              </div>
              <p className="text-gray-900 dark:text-white">{activitySummary.employeesManaged}</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-gray-600 dark:text-gray-400">Compliance Reviewed</p>
              </div>
              <p className="text-gray-900 dark:text-white">{activitySummary.complianceReviewed}</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center space-x-3 mb-2">
                <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <p className="text-gray-600 dark:text-gray-400">Reports Generated</p>
              </div>
              <p className="text-gray-900 dark:text-white">{activitySummary.reportsGenerated}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Last Login</p>
              <p className="text-gray-900 dark:text-white">{activitySummary.lastLogin}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Account Created</p>
              <p className="text-gray-900 dark:text-white">{activitySummary.accountCreated}</p>
            </div>
          </div>
        </div>

        {/* System Permissions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-gray-900 dark:text-white">System Access Permissions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {systemPermissions.map((permission, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-700 dark:text-gray-300">{permission.name}</span>
                {permission.granted ? (
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <Check className="w-5 h-5" />
                    <span>Granted</span>
                  </div>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">Not Granted</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>System Role:</strong> {profile.systemRole} - Full administrative access to HR module
            </p>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-gray-900 dark:text-white">Preferences</h3>
            </div>
            {!isEditingPreferences ? (
              <button
                onClick={handleEditPreferences}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSavePreferences}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelPreferences}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-gray-900 dark:text-white">Email Notifications</p>
                  <p className="text-gray-600 dark:text-gray-400">Receive compliance alerts via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) =>
                    setPreferences({ ...preferences, emailNotifications: e.target.checked })
                  }
                  disabled={!isEditingPreferences}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-gray-900 dark:text-white">In-App Notifications</p>
                  <p className="text-gray-600 dark:text-gray-400">Show notifications in dashboard</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.inAppNotifications}
                  onChange={(e) =>
                    setPreferences({ ...preferences, inAppNotifications: e.target.checked })
                  }
                  disabled={!isEditingPreferences}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-gray-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-gray-600 dark:text-gray-400">Enhanced security for your account</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.twoFactorAuth}
                  onChange={(e) =>
                    setPreferences({ ...preferences, twoFactorAuth: e.target.checked })
                  }
                  disabled={!isEditingPreferences}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                {preferences.theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <p className="text-gray-900 dark:text-white">Theme</p>
                  <p className="text-gray-600 dark:text-gray-400">Choose your display preference</p>
                </div>
              </div>
              <select
                value={preferences.theme}
                onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' })}
                disabled={!isEditingPreferences}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-gray-900 dark:text-white">Language</p>
                  <p className="text-gray-600 dark:text-gray-400">Select your preferred language</p>
                </div>
              </div>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                disabled={!isEditingPreferences}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-gray-900 dark:text-white">Security</h3>
            </div>
            {!showPasswordChange && (
              <button
                onClick={() => setShowPasswordChange(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Change Password
              </button>
            )}
          </div>

          {showPasswordChange ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter new password (min 8 characters)"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Update Password
                </button>
                <button
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300">
                  Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account password and security settings. Last password change: 30 days ago.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
