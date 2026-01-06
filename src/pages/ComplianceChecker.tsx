import { useState } from 'react';
import Layout from '../components/Layout';
import { Upload, FileText, AlertTriangle, CheckCircle, XCircle, Sparkles, File, Trash2, Send, Info } from 'lucide-react';
import { toast } from 'sonner';
import { addComplianceRecord } from '../data/complianceRecords';
import { generateComplianceNotification, generateDashboardSummary, generateToastMessage, type NotificationData } from '../utils/notificationGenerator';

interface ComplianceCheckerProps {
  userName?: string;
  userEmail?: string;
}

export default function ComplianceChecker({ userName, userEmail }: ComplianceCheckerProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [policyText, setPolicyText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Determine role based on sessionStorage
  const role = sessionStorage.getItem('userRole') === 'hr' ? 'hr' : 'employee';

  const complianceResults = {
    score: 78,
    missingClauses: [
      { id: 1, clause: 'Grievance Redressal Mechanism', severity: 'high', description: 'No clear process defined for handling employee grievances' },
      { id: 2, clause: 'Data Privacy Compliance (GDPR)', severity: 'high', description: 'Missing data protection and privacy clauses' },
      { id: 3, clause: 'Dispute Resolution Process', severity: 'medium', description: 'Arbitration and dispute resolution process not clearly defined' },
    ],
    highRiskConditions: [
      { id: 1, condition: 'Unlimited liability clause', severity: 'critical', description: 'May expose company to significant financial risk', location: 'Section 4.2' },
      { id: 2, condition: 'Vague termination terms', severity: 'high', description: 'Policy termination conditions are not clearly specified', location: 'Section 7.1' },
    ],
    recommendations: [
      { id: 1, title: 'Add Data Protection Clause', description: 'Include GDPR-compliant data protection and privacy terms' },
      { id: 2, title: 'Define Liability Limits', description: 'Set clear maximum liability amounts to protect the organization' },
      { id: 3, title: 'Strengthen Dispute Resolution', description: 'Add detailed arbitration and mediation procedures' },
      { id: 4, title: 'Include Force Majeure', description: 'Add force majeure clause for unforeseen circumstances' },
    ],
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size too large. Maximum size is 10MB.');
      return;
    }

    setUploadedFile(file);
    toast.success(`File "${file.name}" uploaded successfully!`);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setAnalyzed(false);
    toast.info('File removed');
  };

  const handleAnalyze = () => {
    if (activeTab === 'upload' && !uploadedFile) {
      toast.error('Please upload a document first');
      return;
    }

    if (activeTab === 'paste' && !policyText.trim()) {
      toast.error('Please paste policy text first');
      return;
    }

    setAnalyzing(true);
    toast.info('AI is analyzing your document for compliance...');
    
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      toast.success('Compliance analysis complete!');
    }, 2500);
  };

  const handleDownloadReport = () => {
    const reportContent = `
===========================================
COMPLIANCE ANALYSIS REPORT
===========================================

Generated: ${new Date().toLocaleString()}\nDocument: ${uploadedFile?.name || 'Pasted Text'}

OVERALL COMPLIANCE SCORE: ${complianceResults.score}/100
Status: Moderate Risk - Requires Attention

===========================================
MISSING CLAUSES (${complianceResults.missingClauses.length})
===========================================

${complianceResults.missingClauses.map((clause, idx) => `
${idx + 1}. ${clause.clause} [${clause.severity.toUpperCase()}]
   ${clause.description}
`).join('\\n')}

===========================================
HIGH-RISK CONDITIONS (${complianceResults.highRiskConditions.length})
===========================================

${complianceResults.highRiskConditions.map((risk, idx) => `
${idx + 1}. ${risk.condition} [${risk.severity.toUpperCase()}]
   ${risk.description}
   Location: ${risk.location}
`).join('\\n')}

===========================================
AI RECOMMENDATIONS
===========================================

${complianceResults.recommendations.map((rec, idx) => `
${idx + 1}. ${rec.title}
   ${rec.description}
`).join('\\n')}

===========================================
End of Report
===========================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Compliance_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('Report downloaded successfully!');
  };

  // Submit compliance issues to HR
  const handleSubmitToHR = (issue: any, type: 'missing-clause' | 'high-risk') => {
    if (!userName || !userEmail) {
      toast.error('User information not available');
      return;
    }

    const record = addComplianceRecord({
      employeeName: userName,
      employeeEmail: userEmail,
      policyName: uploadedFile?.name || 'Pasted Policy Text',
      issueType: type,
      issueTitle: type === 'missing-clause' ? issue.clause : issue.condition,
      issueDescription: issue.description,
      severity: issue.severity as any,
      complianceScore: complianceResults.score,
      documentName: uploadedFile?.name || 'Pasted Text'
    });

    toast.success(`Compliance issue "${record.issueTitle}" submitted to HR successfully!`);
  };

  return (
    <Layout role={role}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">AI Compliance Checker</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload documents and let AI analyze them for compliance issues and risks</p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-3 px-4 transition ${
                activeTab === 'upload'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Upload Document
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`pb-3 px-4 transition ${
                activeTab === 'paste'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Paste Text
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : uploadedFile
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                {uploadedFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <File className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-gray-900 dark:text-gray-100 mb-2">{uploadedFile.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                    <button
                      onClick={handleRemoveFile}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove File</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-900 dark:text-gray-100 mb-2">
                      Drag & drop your document here, or click to browse
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">PDF, DOC, DOCX formats supported (Max 10MB)</p>
                    <label className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <textarea
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                placeholder="Paste your policy text here for AI analysis..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {policyText.length} characters
              </p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="mt-6 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing Compliance with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Run AI Compliance Check</span>
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {analyzed && (
          <>
            {/* Compliance Score */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 dark:text-white">Overall Compliance Score</h3>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-purple-600 dark:text-purple-400">AI Powered</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex-1">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Compliance Level</span>
                    <span className="text-gray-900 dark:text-white">{complianceResults.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-600 h-4 rounded-full transition-all"
                      style={{ width: `${complianceResults.score}%` }}
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Moderate Risk - Requires attention</p>
                </div>
                <div className="text-center">
                  <div className="text-amber-600 dark:text-amber-400 mb-2">
                    <AlertTriangle className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Warning</p>
                </div>
              </div>
            </div>

            {/* Missing Clauses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h3 className="text-gray-900 dark:text-white">Missing Clauses</h3>
                <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">
                  {complianceResults.missingClauses.length} issues
                </span>
              </div>
              
              <div className="space-y-3">
                {complianceResults.missingClauses.map((clause) => (
                  <div
                    key={clause.id}
                    className="p-4 border-l-4 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20 rounded-r-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="text-gray-900 dark:text-gray-100">{clause.clause}</p>
                          <span
                            className={`px-2 py-1 rounded-full ${
                              clause.severity === 'high'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {clause.severity}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{clause.description}</p>
                      </div>
                      <button
                        onClick={() => handleSubmitToHR(clause, 'missing-clause')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Submit to HR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Risk Conditions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <h3 className="text-gray-900 dark:text-white">High-Risk Conditions Detected</h3>
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full">
                  {complianceResults.highRiskConditions.length} risks
                </span>
              </div>
              
              <div className="space-y-3">
                {complianceResults.highRiskConditions.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-4 border-l-4 border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-r-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-gray-900 dark:text-gray-100">{risk.condition}</p>
                      <span
                        className={`px-2 py-1 rounded-full ${
                          risk.severity === 'critical'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{risk.description}</p>
                    <p className="text-gray-600 dark:text-gray-400">Found in: {risk.location}</p>
                    <button
                      onClick={() => handleSubmitToHR(risk, 'high-risk')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Submit to HR
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-gray-900 dark:text-white">AI Recommendations</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complianceResults.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-gray-100 mb-1">{rec.title}</p>
                        <p className="text-gray-600 dark:text-gray-400">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleDownloadReport}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Download Full Report
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                Export PDF
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}