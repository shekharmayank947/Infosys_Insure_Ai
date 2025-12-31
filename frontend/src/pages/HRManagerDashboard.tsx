import { useState } from 'react';
import { 
  UserCog, 
  Users, 
  TrendingUp, 
  Calendar, 
  Award,
  Target,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  UserCheck,
  UserX,
  Briefcase,
  GraduationCap,
  DollarSign
} from 'lucide-react';
import Layout from '../components/Layout';

interface HRMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'on-leave' | 'probation';
  performance: number;
  joinDate: string;
  avatar: string;
}

interface HRTask {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
}

export default function HRManagerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'tasks' | 'performance'>('overview');

  const hrMetrics: HRMetric[] = [
    {
      label: 'Total Employees',
      value: '247',
      change: '+12 this month',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'New Hires',
      value: '18',
      change: '+3 this week',
      trend: 'up',
      icon: UserPlus,
      color: 'green'
    },
    {
      label: 'Avg Performance',
      value: '87%',
      change: '+5% from last quarter',
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    {
      label: 'Retention Rate',
      value: '94%',
      change: '+2% YoY',
      trend: 'up',
      icon: Award,
      color: 'orange'
    },
    {
      label: 'Active Recruitments',
      value: '12',
      change: '5 positions filled',
      trend: 'down',
      icon: Briefcase,
      color: 'indigo'
    },
    {
      label: 'Training Completed',
      value: '156',
      change: '89% completion rate',
      trend: 'up',
      icon: GraduationCap,
      color: 'teal'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      performance: 92,
      joinDate: '2022-03-15',
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Product Manager',
      department: 'Product',
      status: 'active',
      performance: 88,
      joinDate: '2021-07-20',
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emily Davis',
      role: 'UX Designer',
      department: 'Design',
      status: 'on-leave',
      performance: 85,
      joinDate: '2023-01-10',
      avatar: 'ED'
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Junior Developer',
      department: 'Engineering',
      status: 'probation',
      performance: 78,
      joinDate: '2024-11-01',
      avatar: 'JW'
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      role: 'Marketing Lead',
      department: 'Marketing',
      status: 'active',
      performance: 90,
      joinDate: '2020-05-12',
      avatar: 'LA'
    }
  ];

  const hrTasks: HRTask[] = [
    {
      id: '1',
      title: 'Review Q4 Performance Evaluations',
      priority: 'high',
      dueDate: '2024-12-20',
      status: 'in-progress',
      assignedTo: 'HR Team'
    },
    {
      id: '2',
      title: 'Onboard New Software Engineers',
      priority: 'high',
      dueDate: '2024-12-16',
      status: 'pending',
      assignedTo: 'Sarah Mitchell'
    },
    {
      id: '3',
      title: 'Update Employee Handbook',
      priority: 'medium',
      dueDate: '2024-12-25',
      status: 'in-progress',
      assignedTo: 'HR Team'
    },
    {
      id: '4',
      title: 'Conduct Exit Interviews',
      priority: 'medium',
      dueDate: '2024-12-18',
      status: 'pending',
      assignedTo: 'John Davis'
    },
    {
      id: '5',
      title: 'Benefits Enrollment Verification',
      priority: 'low',
      dueDate: '2024-12-30',
      status: 'completed',
      assignedTo: 'Benefits Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'on-leave':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'probation':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 dark:text-green-400';
    if (performance >= 80) return 'text-blue-600 dark:text-blue-400';
    if (performance >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Layout role="hr">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <UserCog className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white">HR Management Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Comprehensive workforce management and analytics</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hrMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-${metric.color}-100 dark:bg-${metric.color}-900/30 rounded-lg`}>
                    <Icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                  </div>
                  <span className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    <TrendingUp className={`w-4 h-4 mr-1 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
                <p className="text-gray-900 dark:text-white mb-2">{metric.value}</p>
                <p className="text-gray-500 dark:text-gray-500">{metric.change}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'team', label: 'Team Directory', icon: Users },
              { id: 'tasks', label: 'HR Tasks', icon: CheckCircle2 },
              { id: 'performance', label: 'Performance', icon: Target }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 transition ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                Department Distribution
              </h3>
              <div className="space-y-4">
                {[
                  { dept: 'Engineering', count: 87, percentage: 35 },
                  { dept: 'Product', count: 42, percentage: 17 },
                  { dept: 'Design', count: 28, percentage: 11 },
                  { dept: 'Marketing', count: 35, percentage: 14 },
                  { dept: 'Sales', count: 55, percentage: 23 }
                ].map((dept, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">{dept.dept}</span>
                      <span className="text-gray-900 dark:text-white">{dept.count} employees</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: 'New employee onboarded', user: 'James Wilson', time: '2 hours ago', icon: UserPlus, color: 'green' },
                  { action: 'Performance review completed', user: 'Sarah Johnson', time: '5 hours ago', icon: CheckCircle2, color: 'blue' },
                  { action: 'Leave request approved', user: 'Emily Davis', time: '1 day ago', icon: Calendar, color: 'purple' },
                  { action: 'Training session scheduled', user: 'HR Team', time: '2 days ago', icon: GraduationCap, color: 'orange' },
                  { action: 'Policy document updated', user: 'Admin', time: '3 days ago', icon: AlertCircle, color: 'red' }
                ].map((activity, index) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <div className={`p-2 bg-${activity.color}-100 dark:bg-${activity.color}-900/30 rounded-lg`}>
                        <ActivityIcon className={`w-4 h-4 text-${activity.color}-600 dark:text-${activity.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-gray-600 dark:text-gray-400">{activity.user}</p>
                      </div>
                      <span className="text-gray-500 dark:text-gray-500">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Employee</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Role</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Department</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Performance</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Join Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                            {member.avatar}
                          </div>
                          <span className="text-gray-900 dark:text-white">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{member.role}</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{member.department}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{member.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 dark:text-white">HR Task Management</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Add New Task
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {hrTasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-2">{task.title}</h4>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Due: {task.dueDate}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500">Assigned to: {task.assignedTo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-600" />
                Top Performers
              </h3>
              <div className="space-y-4">
                {teamMembers
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 5)
                  .map((member, index) => (
                    <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <span className="text-gray-900 dark:text-white">#{index + 1}</span>
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                      </div>
                      <span className={`${getPerformanceColor(member.performance)}`}>
                        {member.performance}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Performance Analytics
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Excellent (90-100%)</span>
                    <span className="text-green-600 dark:text-green-400">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Good (80-89%)</span>
                    <span className="text-blue-600 dark:text-blue-400">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Average (70-79%)</span>
                    <span className="text-yellow-600 dark:text-yellow-400">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Needs Improvement (&lt;70%)</span>
                    <span className="text-red-600 dark:text-red-400">7%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '7%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}