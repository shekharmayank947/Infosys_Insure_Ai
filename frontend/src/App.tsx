import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactNode } from "react";

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
import { Toaster } from 'sonner';
import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  // Load user data from sessionStorage on mount
  // useEffect(() => {
  //   const storedRole = sessionStorage.getItem('userRole');
  //   const storedEmail = sessionStorage.getItem('userEmail');
  //   if (storedRole) setUserRole(storedRole);
  //   if (storedEmail) setUserEmail(storedEmail);
  // }, []);
  useEffect(() => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  if (role && email) {
    setUserRole(role);
    setUserEmail(email);
  }
}, []);


  const handleLogin = (role: string, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    // Persist to sessionStorage
  //   sessionStorage.setItem('userRole', role);
  //   sessionStorage.setItem('userEmail', email);
  // };
   localStorage.setItem("role", role);
  localStorage.setItem("email", email);
};

  // Extract name from email (everything before @)
  const userName = userEmail ? userEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  // Protected Route Component
  // const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) => {
  //   if (!userRole) {
  //     return <Navigate to="/" replace />;
  //   }
  //   if (userRole !== allowedRole) {
  //     return <Navigate to={userRole === 'hr' ? '/hr' : '/employee'} replace />;
  //   }
  //   return <>{children}</>;
  // };
//   const ProtectedRoute = ({
//   children,
//   allowedRole,
// }: {
//   children: ReactNode;
//   allowedRole: string[];
// }) => {
//   if (!userRole) {
//     return <Navigate to="/" replace />;
//   }

//   if (userRole !== allowedRole) {
//     return (
//       <Navigate
//         to={userRole === "HR" ? "/hr" : "/employee"}
//         replace
//       />
//     );
//   }

//   return <>{children}</>;
// };
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
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
                   <ProtectedRoute allowedRoles={["HR"]}>
                    <HRDashboard userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hr-manager" 
                element={
                   <ProtectedRoute allowedRoles={["HR"]}>
                    <HRManagerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/policy-upload" 
                element={
                   <ProtectedRoute allowedRoles={["HR"]}>
                    <PolicyUpload userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/compliance-checker" 
                element={
                  userRole === 'HR' ? (
                    <ComplianceChecker userName={userName} userEmail={userEmail} />
                  ) : userRole === 'EMPLOYEE' ? (
                    <ComplianceChecker userName={userName} userEmail={userEmail} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/reports" 
                element={
                   <ProtectedRoute allowedRoles={["HR"]}>
                    <Reports userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              />
              {/* <Route 
                path="/settings" 
                element={
                  userRole === 'hr' ? (
                    <Settings userName={userName} userEmail={userEmail} />
                  ) : userRole === 'employee' ? (
                    <Settings userName={userName} userEmail={userEmail} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              /> */}
              {/* <Route
  path="/settings"
  element={
    userRole === "HR" || userRole === "EMPLOYEE" ? (
      <Settings userName={userName} userEmail={userEmail} />
    ) : (
      <Navigate to="/" replace />
    )
  } */}
{/* /> */}
<Route
  path="/settings"
  element={
    <ProtectedRoute allowedRoles={["HR", "EMPLOYEE", "USER"]}>
      <Settings userName={userName} userEmail={userEmail} />
    </ProtectedRoute>
  }
/>
              <Route 
                path="/employees" 
                element={
                  <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                    <EmployeesPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Employee Routes */}
              {/* <Route 
                path="/employee" 
                element={
                  <ProtectedRoute allowedRole="EMPLOYEE">
                    <EmployeeDashboard userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                } 
              /> */}
              <Route
  path="/employee"
  element={
    <ProtectedRoute allowedRoles={["EMPLOYEE", "USER"]}>
      <EmployeeDashboard userName={userName} userEmail={userEmail} />
    </ProtectedRoute>
  }
/>
              <Route 
                path="/policy-recommendation" 
                element={
                  <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                    <PolicyRecommendation />
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