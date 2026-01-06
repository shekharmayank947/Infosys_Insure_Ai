import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Shield, Lock, User, Mail, Eye, EyeOff } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

interface LoginProps {
  onLogin: (role: string, email: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setLoggedInUser } = useProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, email);
    
    // Store the logged-in user's email and name
    setLoggedInUser(email, fullName);
    
    switch (selectedRole) {
      case 'hr':
        navigate('/hr');
        break;
      case 'employee':
      case 'user':
        navigate('/employee'); // Navigate to employee dashboard (same for both employee and user)
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Side - AI Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-8">
              <Shield className="w-20 h-20 mb-4" />
            </div>
            <h1 className="mb-4">InsurAI</h1>
            <p className="mb-8 opacity-90">Corporate Policy Automation System</p>
            
            <div className="space-y-6 mt-12">
              <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Bot className="w-8 h-8 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p>AI-Powered Compliance</p>
                  <p className="opacity-80">Automated policy analysis and risk detection</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Shield className="w-8 h-8 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p>Smart Policy Management</p>
                  <p className="opacity-80">Centralized platform for all corporate policies</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Lock className="w-8 h-8 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p>Enterprise Security</p>
                  <p className="opacity-80">Bank-grade encryption and compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-6 lg:hidden">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400">InsurAI</span>
              </div>
              <h2 className="mb-2 text-gray-900 dark:text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin ? 'Sign in to your account' : 'Register for a new account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field - Show for both login and registration */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Select Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="employee">Employee</option>
                  <option value="user">User</option>
                  <option value="hr">HR Manager</option>
                </select>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <span className="text-blue-600 dark:text-blue-400">{isLogin ? 'Register' : 'Sign In'}</span>
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Enterprise-grade security & compliance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}