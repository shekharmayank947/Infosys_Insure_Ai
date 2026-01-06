import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import { FileText, UserCheck, Clock, Upload, ShieldCheck, Users, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getComplianceStatistics } from '../data/complianceRecords';

interface HRDashboardProps {
  userName?: string;
  userEmail?: string;
}

export default function HRDashboard({ userName = 'HR Manager', userEmail }: HRDashboardProps) {
  const navigate = useNavigate();

  const employeePolicies = [
    { id: 1, name: 'John Smith', department: 'Engineering', policies: 5, status: 'Complete', compliance: 100 },
    { id: 2, name: 'Sarah Johnson', department: 'Marketing', policies: 4, status: 'Pending', compliance: 80 },
    { id: 3, name: 'Michael Chen', department: 'Sales', policies: 6, status: 'Complete', compliance: 100 },
    { id: 4, name: 'Emily Davis', department: 'HR', policies: 5, status: 'Complete', compliance: 100 },
    { id: 5, name: 'David Wilson', department: 'Finance', policies: 3, status: 'Incomplete', compliance: 60 },
    { id: 6, name: 'Lisa Anderson', department: 'Operations', policies: 4, status: 'Pending', compliance: 75 },
  ];

  const complianceStats = getComplianceStatistics();

  return (
    <Layout role="hr" userName={userName} userEmail={userEmail}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">HR Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userName}! Manage employee policies and approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Policy Status"
            value="Active"
            icon={FileText}
            trend="142 total policies"
            trendUp={true}
            bgColor="from-blue-600 to-blue-700"
          />
          <DashboardCard
            title="Employee Requests"
            value="23"
            icon={UserCheck}
            trend="8 new today"
            trendUp={true}
            bgColor="from-purple-600 to-purple-700"
          />
          <DashboardCard
            title="Compliance Rate"
            value="94%"
            icon={ShieldCheck}
            trend="Up from last month"
            trendUp={true}
            bgColor="from-green-500 to-emerald-600"
          />
          <DashboardCard
            title="Team Members"
            value="84"
            icon={Users}
            trend="+6 this month"
            trendUp={true}
            bgColor="from-amber-500 to-orange-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/policy-upload')}
              className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Upload Policy</p>
                <p className="text-gray-600">Add new policy document</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/compliance-checker')}
              className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Check Compliance</p>
                <p className="text-gray-600">Run AI compliance scan</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/employees')}
              className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">View Employees</p>
                <p className="text-gray-600">Manage team members</p>
              </div>
            </button>
          </div>
        </div>

        {/* Employee Compliance Issues Alert */}
        {complianceStats.pending > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-2">Employee Compliance Issues Require Attention</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {complianceStats.pending} employee-submitted compliance issues are pending review. 
                    {complianceStats.critical > 0 && ` Including ${complianceStats.critical} critical issues that need immediate attention.`}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Total Submissions</p>
                      <p className="text-gray-900 dark:text-white">{complianceStats.total}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Pending</p>
                      <p className="text-amber-700 dark:text-amber-400">{complianceStats.pending}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Critical</p>
                      <p className="text-red-700 dark:text-red-400">{complianceStats.critical}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Resolved</p>
                      <p className="text-green-700 dark:text-green-400">{complianceStats.resolved}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/employees')}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition whitespace-nowrap"
              >
                View All Issues
              </button>
            </div>
          </div>
        )}

        {/* Employee Policy Mapping Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Employee Policy Mapping</h3>
            <button className="text-blue-600 hover:underline">Export Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Employee Name</th>
                  <th className="text-left py-3 px-4 text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 text-gray-700">Policies Assigned</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700">Compliance</th>
                  <th className="text-left py-3 px-4 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeePolicies.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{employee.name}</td>
                    <td className="py-3 px-4 text-gray-600">{employee.department}</td>
                    <td className="py-3 px-4 text-gray-600">{employee.policies}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          employee.status === 'Complete'
                            ? 'bg-green-100 text-green-700'
                            : employee.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              employee.compliance >= 80 ? 'bg-green-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${employee.compliance}%` }}
                          />
                        </div>
                        <span className="text-gray-700">{employee.compliance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}