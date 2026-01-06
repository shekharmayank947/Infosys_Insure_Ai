import { useState } from 'react';
import Layout from '../components/Layout';
import {
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  FileText,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  getAllComplianceRecords,
  updateComplianceRecordStatus,
  getComplianceStatistics,
  type ComplianceRecord,
} from '../data/complianceRecords';

interface EmployeesPageProps {
  userName?: string;
  userEmail?: string;
}

export default function EmployeesPage({ userName, userEmail }: EmployeesPageProps) {
  const [records, setRecords] = useState<ComplianceRecord[]>(getAllComplianceRecords());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const stats = getComplianceStatistics();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'in-review':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'pending':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const handleStatusChange = (recordId: string, newStatus: ComplianceRecord['status']) => {
    const updatedRecord = updateComplianceRecordStatus(recordId, newStatus);
    if (updatedRecord) {
      setRecords(getAllComplianceRecords());
    }
  };

  const handleViewDetails = (record: ComplianceRecord) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  // Filter records based on status and search
  const filteredRecords = records.filter((record) => {
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.issueTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.policyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Layout role="hr">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white">Employee Compliance Records</h1>
              <p className="text-gray-600 dark:text-gray-400">
                View, track, and manage employee-submitted compliance issues
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Total Submissions</p>
            <p className="text-gray-900 dark:text-white">{stats.total}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Pending Review</p>
            <p className="text-gray-900 dark:text-white">{stats.pending}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Critical Issues</p>
            <p className="text-gray-900 dark:text-white">{stats.critical}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Resolved</p>
            <p className="text-gray-900 dark:text-white">{stats.resolved}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex space-x-2">
                {['all', 'pending', 'in-review', 'resolved', 'rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg transition ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee, issue, or policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Compliance Records Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">ID</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Employee</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Issue</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Policy</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Severity</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400">No compliance records found</p>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    >
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{record.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900 dark:text-white">{record.employeeName}</p>
                          <p className="text-gray-600 dark:text-gray-400">{record.employeeEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 dark:text-white">{record.issueTitle}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Type: {record.issueType.replace('-', ' ')}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {record.policyName}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${getSeverityColor(record.severity)}`}>
                          {record.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={record.status}
                          onChange={(e) =>
                            handleStatusChange(record.id, e.target.value as ComplianceRecord['status'])
                          }
                          className={`px-3 py-1 rounded-full outline-none cursor-pointer ${getStatusColor(
                            record.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-review">In Review</option>
                          <option value="resolved">Resolved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {record.submittedDate}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(record)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedRecord && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-900 dark:text-white">Compliance Record Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Record ID</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Submitted Date</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.submittedDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Employee</p>
                  <p className="text-gray-900 dark:text-white">{selectedRecord.employeeName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{selectedRecord.employeeEmail}</p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Policy Name</p>
                  <p className="text-gray-900 dark:text-white">{selectedRecord.policyName}</p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Document Name</p>
                  <p className="text-gray-900 dark:text-white">{selectedRecord.documentName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Issue Type</p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedRecord.issueType.replace('-', ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Severity</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${getSeverityColor(
                        selectedRecord.severity
                      )}`}
                    >
                      {selectedRecord.severity}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Issue Title</p>
                  <p className="text-gray-900 dark:text-white">{selectedRecord.issueTitle}</p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Description</p>
                  <p className="text-gray-900 dark:text-white">{selectedRecord.issueDescription}</p>
                </div>

                {selectedRecord.complianceScore && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Compliance Score</p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full"
                          style={{ width: `${selectedRecord.complianceScore}%` }}
                        />
                      </div>
                      <span className="text-gray-900 dark:text-white">
                        {selectedRecord.complianceScore}/100
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full ${getStatusColor(
                      selectedRecord.status
                    )}`}
                  >
                    {selectedRecord.status}
                  </span>
                </div>

                {selectedRecord.assignedTo && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Assigned To</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.assignedTo}</p>
                  </div>
                )}

                {selectedRecord.notes && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Notes</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.notes}</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Update Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
