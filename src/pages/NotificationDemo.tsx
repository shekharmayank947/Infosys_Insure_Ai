import { useState } from 'react';
import Layout from '../components/Layout';
import { 
  generateComplianceNotification, 
  generateEmailNotification, 
  generateDashboardSummary,
  generateToastMessage,
  type NotificationData,
  type IssueType,
  type SeverityLevel
} from '../utils/notificationGenerator';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Mail, Bell, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationDemo() {
  const role = sessionStorage.getItem('userRole') === 'hr' ? 'hr' : 'employee';
  
  const [selectedIssueType, setSelectedIssueType] = useState<IssueType>('missing-clause');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel>('high');
  const [issueTitle, setIssueTitle] = useState('Data Privacy Compliance (GDPR)');
  const [issueDescription, setIssueDescription] = useState('Missing data protection and privacy clauses required for GDPR compliance.');
  const [location, setLocation] = useState('Section 4.2');

  // Sample notifications for dashboard summary
  const sampleNotifications = [
    generateComplianceNotification({
      issueType: 'high-risk',
      severity: 'critical',
      issueTitle: 'Unlimited liability clause',
      issueDescription: 'May expose company to significant financial risk',
      location: 'Section 4.2'
    }),
    generateComplianceNotification({
      issueType: 'missing-clause',
      severity: 'high',
      issueTitle: 'Grievance Redressal Mechanism',
      issueDescription: 'No clear process defined for handling employee grievances'
    }),
    generateComplianceNotification({
      issueType: 'missing-clause',
      severity: 'medium',
      issueTitle: 'Dispute Resolution Process',
      issueDescription: 'Arbitration and dispute resolution process not clearly defined'
    }),
    generateComplianceNotification({
      issueType: 'recommendation',
      severity: 'low',
      issueTitle: 'Add Force Majeure Clause',
      issueDescription: 'Recommend adding clause for unforeseen circumstances'
    })
  ];

  const notificationData: NotificationData = {
    issueType: selectedIssueType,
    severity: selectedSeverity,
    issueTitle,
    issueDescription,
    location: selectedIssueType === 'high-risk' ? location : undefined
  };

  const generatedNotification = generateComplianceNotification(notificationData);
  const emailNotification = generateEmailNotification(notificationData, 'John Anderson');
  const dashboardSummary = generateDashboardSummary(sampleNotifications);
  const toastMessage = generateToastMessage(notificationData);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />;
      case 'alert':
        return <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      default:
        return <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'medium':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <Layout role={role}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">AI Notification Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Professional compliance notification system for enterprise insurance automation
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Configure Notification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Issue Type */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Issue Type</label>
              <select
                value={selectedIssueType}
                onChange={(e) => setSelectedIssueType(e.target.value as IssueType)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="missing-clause">Missing Clause</option>
                <option value="high-risk">High-Risk Condition</option>
                <option value="general-concern">General Concern</option>
                <option value="recommendation">Recommendation</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Severity Level</label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as SeverityLevel)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Issue Title */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Issue Title</label>
              <input
                type="text"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                placeholder="Enter issue title..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Issue Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Issue Description</label>
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Enter detailed description..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* Location (only for high-risk) */}
            {selectedIssueType === 'high-risk' && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Location in Document</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Section 4.2"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Generated Dashboard Notification */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">Dashboard Notification</h3>
            <button
              onClick={() => copyToClipboard(generatedNotification.message, 'Notification')}
              className="flex items-center space-x-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>

          <div className={`p-6 rounded-xl border-2 ${getUrgencyColor(generatedNotification.urgency)}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {getIconComponent(generatedNotification.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-gray-900 dark:text-white">{generatedNotification.title}</h4>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-current">
                    {generatedNotification.urgency.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {generatedNotification.message}
                </p>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Action Required:</strong> {generatedNotification.action}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">Toast Notification</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => copyToClipboard(toastMessage, 'Toast message')}
                className="flex items-center space-x-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => toast.info(toastMessage)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Test Toast
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-900 dark:text-gray-100">{toastMessage}</p>
          </div>
        </div>

        {/* Email Notification */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-gray-900 dark:text-white">Email Notification</h3>
            </div>
            <button
              onClick={() => copyToClipboard(emailNotification, 'Email template')}
              className="flex items-center space-x-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <pre className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
              {emailNotification}
            </pre>
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Dashboard Summary (Multiple Issues)</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Total</p>
              <p className="text-gray-900 dark:text-white">{dashboardSummary.total}</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Critical</p>
              <p className="text-red-700 dark:text-red-400">{dashboardSummary.critical}</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-1">High</p>
              <p className="text-amber-700 dark:text-amber-400">{dashboardSummary.high}</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Medium</p>
              <p className="text-orange-700 dark:text-orange-400">{dashboardSummary.medium}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Low</p>
              <p className="text-blue-700 dark:text-blue-400">{dashboardSummary.low}</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-gray-900 dark:text-white">{dashboardSummary.message}</p>
          </div>
        </div>

        {/* Sample Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Sample Notifications</h3>
          
          <div className="space-y-3">
            {sampleNotifications.map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getUrgencyColor(notification.urgency)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getIconComponent(notification.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-gray-900 dark:text-white">{notification.title}</p>
                      <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded-full border border-current">
                        {notification.urgency}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
