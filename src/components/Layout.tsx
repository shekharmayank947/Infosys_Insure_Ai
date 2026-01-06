import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  role: 'hr' | 'employee';
  userName?: string;
  userEmail?: string;
}

export default function Layout({ children, role, userName, userEmail }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar role={role} />
      <div className="lg:pl-64">
        <Navbar userName={userName} userEmail={userEmail} />
        <main className="p-4 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}