import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import { FileText, Download, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getPoliciesForUser, getPendingAcknowledgments, type Policy } from '../data/policyData';

interface EmployeeDashboardProps {
  userName?: string;
  userEmail?: string;
}

export default function EmployeeDashboard({ userName = 'Employee', userEmail = 'john.anderson@company.com' }: EmployeeDashboardProps) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  // Load policies assigned to the current user
  useEffect(() => {
    if (userEmail) {
      const userPolicies = getPoliciesForUser(userEmail);
      setPolicies(userPolicies);
      setPendingCount(getPendingAcknowledgments(userEmail));
    }
  }, [userEmail]);

  const renewalReminders = [
    { id: 1, policy: 'Health Insurance Policy', dueDate: '2024-02-15', daysLeft: 25 },
    { id: 2, policy: 'Travel Policy', dueDate: '2024-03-01', daysLeft: 39 },
  ];

  const handleAcknowledge = (policyId: number) => {
    setPolicies((prevPolicies) =>
      prevPolicies.map((policy) =>
        policy.id === policyId ? { ...policy, acknowledged: true } : policy
      )
    );
    setPendingCount((prev) => Math.max(0, prev - 1));
    toast.success('Policy acknowledged successfully!');
  };

  const handleDownloadPDF = (policyName: string) => {
    toast.success(`Preparing ${policyName} for download...`);
    
    // Create a simple PDF content as text
    const pdfContent = `
===========================================
${policyName}
===========================================

Policy Document
Generated on: ${new Date().toLocaleDateString()}

This is a policy document for ${policyName}.

Company: InsurAI - Corporate Policy Automation System
Document Type: Policy Document
Status: Active

Policy Details:
--------------
This document contains the complete policy information
and guidelines for ${policyName}.

All employees are required to read and acknowledge
this policy as per company requirements.

For more information, please contact HR department.

===========================================
End of Document
===========================================
    `.trim();

    // Create a Blob with the PDF content
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${policyName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('PDF downloaded successfully!');
  };

  return (
    <Layout role="employee" userName={userName} userEmail={userEmail}>
      <div className="space-y-6">
        {/* Header with Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Welcome back, {userName}!</h1>
              <p className="opacity-90">You have {pendingCount} pending policy acknowledgments and 1 renewal reminder</p>
            </div>
            <div className="hidden md:block w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Assigned Policies"
            value={policies.length.toString()}
            icon={FileText}
            trend="All active"
            trendUp={true}
            bgColor="from-blue-600 to-blue-700"
          />
          <DashboardCard
            title="Pending Actions"
            value={pendingCount.toString()}
            icon={Clock}
            trend="Needs acknowledgment"
            trendUp={false}
            bgColor="from-amber-500 to-orange-600"
          />
          <DashboardCard
            title="AI Compliance Checker"
            value="80%"
            icon={CheckCircle}
            trend="+5% this month"
            trendUp={true}
            bgColor="from-green-500 to-emerald-600"
          />
          <DashboardCard
            title="Open Queries"
            value="1"
            icon={MessageSquare}
            trend="1 pending response"
            trendUp={false}
            bgColor="from-purple-600 to-purple-700"
          />
        </div>

        {/* Renewal Reminders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <h3 className="text-gray-900 dark:text-white">Renewal Reminders</h3>
          </div>
          <div className="space-y-3">
            {renewalReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
              >
                <div>
                  <p className="text-gray-900 dark:text-white">{reminder.policy}</p>
                  <p className="text-gray-600 dark:text-gray-400">Due date: {reminder.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-700 dark:text-amber-400">{reminder.daysLeft} days left</p>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Policies */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">My Assigned Policies</h3>
          {policies.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">No policies assigned to you yet.</p>
              <p className="text-gray-500 dark:text-gray-500">Please contact HR for more information.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">{policy.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">Category: {policy.category} • Last updated: {policy.lastUpdated}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span
                          className={`px-3 py-1 rounded-full ${
                            policy.status === 'Active'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {policy.status}
                        </span>
                        {policy.acknowledged ? (
                          <span className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>Acknowledged</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
                            <AlertCircle className="w-4 h-4" />
                            <span>Pending Acknowledgment</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => handleDownloadPDF(policy.name)}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                    {!policy.acknowledged && (
                      <button
                        className="px-4 py-2 border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                        onClick={() => handleAcknowledge(policy.id)}
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
