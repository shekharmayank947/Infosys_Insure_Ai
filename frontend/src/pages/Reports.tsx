import Layout from '../components/Layout';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Download, Filter, Calendar, TrendingUp } from 'lucide-react';

interface ReportsProps {
  userName?: string;
  userEmail?: string;
}

export default function Reports({ userName, userEmail }: ReportsProps) {
  // Determine role based on sessionStorage
  const role = sessionStorage.getItem('userRole') === 'hr' ? 'hr' : 'employee';

  const complianceTrendData = [
    { month: 'Jan', compliance: 78, target: 85 },
    { month: 'Feb', compliance: 82, target: 85 },
    { month: 'Mar', compliance: 85, target: 85 },
    { month: 'Apr', compliance: 88, target: 90 },
    { month: 'May', compliance: 91, target: 90 },
    { month: 'Jun', compliance: 94, target: 90 },
  ];

  const employeeAdoptionData = [
    { department: 'Engineering', adoption: 95 },
    { department: 'Sales', adoption: 88 },
    { department: 'Marketing', adoption: 92 },
    { department: 'HR', adoption: 98 },
    { department: 'Finance', adoption: 90 },
    { department: 'Operations', adoption: 85 },
  ];

  const riskHeatmapData = [
    { category: 'Health', risk: 2 },
    { category: 'Travel', risk: 5 },
    { category: 'Asset', risk: 3 },
    { category: 'Liability', risk: 7 },
    { category: 'Other', risk: 4 },
  ];

  const renewalTimelineData = [
    { month: 'Jul', renewals: 12, budget: 15 },
    { month: 'Aug', renewals: 8, budget: 10 },
    { month: 'Sep', renewals: 15, budget: 18 },
    { month: 'Oct', renewals: 20, budget: 20 },
    { month: 'Nov', renewals: 18, budget: 22 },
    { month: 'Dec', renewals: 10, budget: 12 },
  ];

  const policyDistributionData = [
    { name: 'Health', value: 35, count: 87 },
    { name: 'Travel', value: 25, count: 62 },
    { name: 'Asset', value: 20, count: 50 },
    { name: 'Liability', value: 15, count: 37 },
    { name: 'Other', value: 5, count: 11 },
  ];

  const radarData = [
    { subject: 'Coverage', A: 85, fullMark: 100 },
    { subject: 'Compliance', A: 92, fullMark: 100 },
    { subject: 'Cost Efficiency', A: 78, fullMark: 100 },
    { subject: 'Employee Satisfaction', A: 88, fullMark: 100 },
    { subject: 'Risk Management', A: 75, fullMark: 100 },
    { subject: 'Processing Speed', A: 95, fullMark: 100 },
  ];

  const COLORS = ['#1F6FEB', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <Layout role={role}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Calendar className="w-5 h-5" />
              <span>Date Range</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-2">Total Policies</p>
            <p className="text-gray-900 mb-2">247</p>
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-2">Avg Compliance</p>
            <p className="text-gray-900 mb-2">94%</p>
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8.2%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-2">Active Employees</p>
            <p className="text-gray-900 mb-2">1,248</p>
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+3.1%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-2">Risk Score</p>
            <p className="text-gray-900 mb-2">Low</p>
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>Improved</span>
            </div>
          </div>
        </div>

        {/* Policy Compliance Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Policy Compliance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={complianceTrendData}>
              <defs>
                <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area type="monotone" dataKey="compliance" stroke="#1F6FEB" fillOpacity={1} fill="url(#colorCompliance)" />
              <Area type="monotone" dataKey="target" stroke="#10B981" fillOpacity={1} fill="url(#colorTarget)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Actual Compliance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-gray-700">Target</span>
            </div>
          </div>
        </div>

        {/* Employee Adoption & Risk Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Adoption Graph */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Employee Adoption by Department</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeAdoptionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="department" type="category" stroke="#9ca3af" width={100} />
                <Tooltip />
                <Bar dataKey="adoption" fill="#8B5CF6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Heatmap */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Risk Heatmap by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskHeatmapData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="risk" radius={[8, 8, 0, 0]}>
                  {riskHeatmapData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.risk >= 6
                          ? '#EF4444'
                          : entry.risk >= 4
                          ? '#F59E0B'
                          : '#10B981'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Low (1-3)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-gray-700">Medium (4-5)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">High (6+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Renewal Timeline & Policy Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Renewal Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Renewal Timeline Visualization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={renewalTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="renewals" stroke="#1F6FEB" strokeWidth={2} />
                <Line type="monotone" dataKey="budget" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Actual Renewals</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Budget</span>
              </div>
            </div>
          </div>

          {/* Policy Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Policy Distribution</h3>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={250}>
                <PieChart>
                  <Pie
                    data={policyDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {policyDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {policyDistributionData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">{item.count}</p>
                      <p className="text-gray-600">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Radar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Overall Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#9ca3af" />
              <Radar name="Performance" dataKey="A" stroke="#1F6FEB" fill="#1F6FEB" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}