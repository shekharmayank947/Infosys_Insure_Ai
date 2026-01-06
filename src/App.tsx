import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PolicyUpload from './pages/PolicyUpload';
import ComplianceChecker from './pages/ComplianceChecker';
import PolicyRecommendation from './pages/PolicyRecommendation';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import HRManagerDashboard from './pages/HRManagerDashboard';
import EmployeesPage from './pages/EmployeesPage';
import GetSupport from './pages/GetSupport';
import HRProfile from './pages/HRProfile';
import { Toaster } from 'sonner@2.0.3';
import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  // Load user data from sessionStorage on mount
  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedRole) setUserRole(storedRole);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleLogin = (role: string, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    // Persist to sessionStorage
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userEmail', email);
  };

  // Extract name from email (everything before @)
  const userName = userEmail ? userEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) => {
    if (!userRole) {
      return <Navigate to="/" replace />;
    }
    
    // Allow both 'employee' and 'user' roles to access employee routes
    if (allowedRole === 'employee' && (userRole === 'employee' || userRole === 'user')) {
      return <>{children}</>;
    }
    
    if (userRole !== allowedRole) {
      return <Navigate to={userRole === 'hr' ? '/hr' : '/employee'} replace />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <ThemeProvider>
        <ProfileProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              
              {/* HR Routes */}
              <Route 
                path="/hr" 
                element={
                  <ProtectedRoute allowedRole="hr">
                    <HRDashboard userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hr-manager" 
                element={
                  <ProtectedRoute allowedRole="hr">
                    <HRManagerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/policy-upload" 
                element={
                  <ProtectedRoute allowedRole="hr">
                    <PolicyUpload userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/compliance-checker" 
                element={
                  userRole === 'hr' ? (
                    <ComplianceChecker userName={userName} userEmail={userEmail} />
                  ) : (userRole === 'employee' || userRole === 'user') ? (
                    <ComplianceChecker userName={userName} userEmail={userEmail} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute allowedRole="hr">
                    <Reports userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  userRole === 'hr' ? (
                    <Settings userName={userName} userEmail={userEmail} />
                  ) : (userRole === 'employee' || userRole === 'user') ? (
                    <Settings userName={userName} userEmail={userEmail} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/employees" 
                element={
                  <ProtectedRoute allowedRole="hr">
                    <EmployeesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hr-profile" 
                element={
                  <ProtectedRoute allowedRole="hr">
                    <HRProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Employee Routes */}
              <Route 
                path="/employee" 
                element={
                  <ProtectedRoute allowedRole="employee">
                    <EmployeeDashboard userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/policy-recommendation" 
                element={
                  <ProtectedRoute allowedRole="employee">
                    <PolicyRecommendation />
                  </ProtectedRoute>
                } 
              />
              
              {/* Support Route - Available for both roles */}
              <Route 
                path="/support" 
                element={
                  <ProtectedRoute allowedRole="employee">
                    <GetSupport userName={userName} userEmail={userEmail} role="employee" />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all for any other undefined routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ProfileProvider>
      </ThemeProvider>
      <Toaster position="top-right" />
    </>
  );
}