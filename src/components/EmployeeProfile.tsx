import { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Upload, Edit, Save, X, Bell, Moon, Sun, Globe, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';

export default function EmployeeProfile() {
  const { profile: contextProfile, updateProfile: updateContextProfile } = useProfile();
  const { theme, setTheme } = useTheme();

  // Profile state - original data
  const [originalProfile, setOriginalProfile] = useState({
    fullName: contextProfile.fullName,
    email: contextProfile.email,
    phone: contextProfile.phone,
    employeeId: contextProfile.employeeId,
    department: contextProfile.department,
    dateOfBirth: contextProfile.dateOfBirth,
    gender: contextProfile.gender,
    address: contextProfile.address
  });

  // Current profile state (editable)
  const [profile, setProfile] = useState({ ...originalProfile });
  
  // Profile picture state
  const [profilePicture, setProfilePicture] = useState<string | null>(contextProfile.profilePicture);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync profile state when context changes (e.g., when logged-in email is set)
  useEffect(() => {
    const updatedProfile = {
      fullName: contextProfile.fullName,
      email: contextProfile.email,
      phone: contextProfile.phone,
      employeeId: contextProfile.employeeId,
      department: contextProfile.department,
      dateOfBirth: contextProfile.dateOfBirth,
      gender: contextProfile.gender,
      address: contextProfile.address
    };
    setOriginalProfile(updatedProfile);
    setProfile(updatedProfile);
    setProfilePicture(contextProfile.profilePicture);
  }, [contextProfile]);

  // Preferences state - original data
  const [originalPreferences, setOriginalPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    theme: theme as 'light' | 'dark',
    language: 'en-US'
  });

  // Current preferences state (editable)
  const [preferences, setPreferences] = useState({ ...originalPreferences });
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // Sync theme from ThemeContext when it changes
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

    if (!profile.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!profile.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!profile.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      toast.error('Please upload a PNG or JPG image');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result as string);
      toast.success('Profile picture updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    // Update context with new profile data
    updateContextProfile({
      ...profile,
      profilePicture: profilePicture
    });
    
    setOriginalProfile({ ...profile });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setProfile({ ...originalProfile });
    setProfilePicture(contextProfile.profilePicture);
    setErrors({});
    setIsEditing(false);
    toast.info('Changes cancelled');
  };

  // Placeholder function for profile update - removed, using context instead
  // const updateProfile = (profileData: typeof profile) => {
  //   console.log('Updating profile:', profileData);
  //   // Here you would make an API call to save the profile
  // };

  const handleEditPreferences = () => {
    setIsEditingPreferences(true);
  };

  const handleSavePreferences = () => {
    // Apply theme change
    setTheme(preferences.theme);
    
    // Simulate API call to update preferences
    updatePreferences(preferences);
    setOriginalPreferences({ ...preferences });
    setIsEditingPreferences(false);
    toast.success('Preferences updated successfully!');
  };

  const handleCancelEditPreferences = () => {
    setPreferences({ ...originalPreferences });
    setIsEditingPreferences(false);
    toast.info('Changes cancelled');
  };

  // Placeholder function for preferences update
  const updatePreferences = (preferencesData: typeof preferences) => {
    console.log('Updating preferences:', preferencesData);
    // Here you would make an API call to save the preferences
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your personal information and preferences</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white overflow-hidden">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16" />
                )}
              </div>
              {profilePicture && (
                <button
                  onClick={() => {
                    setProfilePicture(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-upload"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              <Upload className="w-4 h-4" />
              <span>Change Photo</span>
            </button>
            <p className="text-gray-500 text-center">PNG or JPG (Max 5MB)</p>
          </div>

          {/* Right Side - Basic Info */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition ${
                      isEditing
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    } ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 dark:text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* Employee ID (Non-editable) */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={profile.employeeId}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition ${
                      isEditing
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    } ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 dark:text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Department (Non-editable) */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Department</label>
                <input
                  type="text"
                  value={profile.department}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg"
                />
              </div>

              {/* Phone Number */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition ${
                      isEditing
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    } ${errors.phone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 dark:text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              {!isEditing ? (
                <button
                  onClick={handleEditProfile}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-gray-900 dark:text-white mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Date of Birth *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                disabled={!isEditing}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition ${
                  isEditing
                    ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                } ${errors.dateOfBirth ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.dateOfBirth && <p className="text-red-500 dark:text-red-400 mt-1">{errors.dateOfBirth}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Gender *</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
                isEditing
                  ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              } ${errors.gender ? 'border-red-500' : ''}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-red-500 dark:text-red-400 mt-1">{errors.gender}</p>}
          </div>

          {/* Address - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Address *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition resize-none ${
                  isEditing
                    ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                } ${errors.address ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.address && <p className="text-red-500 dark:text-red-400 mt-1">{errors.address}</p>}
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900 dark:text-white">Preferences</h3>
          {!isEditingPreferences ? (
            <button
              onClick={handleEditPreferences}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
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
                <Check className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancelEditPreferences}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        {/* Notifications Section */}
        <div className="mb-6">
          <h4 className="text-gray-800 dark:text-gray-300 mb-4 flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>Notification Settings</span>
          </h4>
          <div className="space-y-4 pl-7">
            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-gray-600 dark:text-gray-400">Receive notifications via email</p>
              </div>
              <button
                onClick={() => isEditingPreferences && setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                disabled={!isEditingPreferences}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                } ${!isEditingPreferences ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* SMS Notifications Toggle */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-900 dark:text-white">SMS Notifications</p>
                <p className="text-gray-600 dark:text-gray-400">Receive notifications via SMS</p>
              </div>
              <button
                onClick={() => isEditingPreferences && setPreferences({ ...preferences, smsNotifications: !preferences.smsNotifications })}
                disabled={!isEditingPreferences}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                } ${!isEditingPreferences ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* In-App Notifications Toggle */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-900 dark:text-white">In-App Notifications</p>
                <p className="text-gray-600 dark:text-gray-400">Receive notifications in the application</p>
              </div>
              <button
                onClick={() => isEditingPreferences && setPreferences({ ...preferences, inAppNotifications: !preferences.inAppNotifications })}
                disabled={!isEditingPreferences}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.inAppNotifications ? 'bg-blue-600' : 'bg-gray-300'
                } ${!isEditingPreferences ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.inAppNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance & Locale Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-gray-800 dark:text-gray-300 mb-4">Appearance & Locale</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Theme</label>
              <div className="relative">
                {preferences.theme === 'light' ? (
                  <Sun className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                ) : (
                  <Moon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                )}
                <select
                  value={preferences.theme}
                  onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' })}
                  disabled={!isEditingPreferences}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition ${
                    isEditingPreferences
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Language / Locale</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  disabled={!isEditingPreferences}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition ${
                    isEditingPreferences
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es-ES">Español (España)</option>
                  <option value="fr-FR">Français (France)</option>
                  <option value="de-DE">Deutsch (Deutschland)</option>
                  <option value="it-IT">Italiano (Italia)</option>
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="zh-CN">中文 (简体)</option>
                  <option value="ja-JP">日本語</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">Need Help?</h4>
            <p className="text-gray-600 mb-3">
              If you need to update your Employee ID, Department, or other system-managed fields, 
              please contact your HR Manager or system administrator.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Contact HR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}