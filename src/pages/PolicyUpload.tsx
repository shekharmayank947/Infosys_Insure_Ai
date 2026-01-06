import { useState } from 'react';
import Layout from '../components/Layout';
import { Upload, File, X, Sparkles, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PolicyUploadProps {
  userName?: string;
  userEmail?: string;
}

export default function PolicyUpload({ userName, userEmail }: PolicyUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [policyName, setPolicyName] = useState('');
  const [category, setCategory] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [policyType, setPolicyType] = useState('Health');
  
  const [uploadedPolicies, setUploadedPolicies] = useState<any[]>([
    { id: 1, name: 'Annual Leave Policy', type: 'Other', category: 'HR', effectiveDate: '2023-01-15', status: 'Published' },
    { id: 2, name: 'Remote Work Guidelines', type: 'Other', category: 'Operations', effectiveDate: '2023-06-10', status: 'Published' },
  ]);

  const extractedText = `HEALTH INSURANCE POLICY

Policy Number: HIP-2024-001
Effective Date: January 1, 2024

COVERAGE DETAILS:
This policy provides comprehensive health insurance coverage for all full-time employees and their immediate family members.

KEY BENEFITS:
• In-patient hospitalization coverage up to $100,000 per year
• Out-patient treatment coverage up to $5,000 per year
• Maternity benefits up to $15,000
• Annual health check-up included
• Dental and vision care coverage

EXCLUSIONS:
• Pre-existing conditions (first 2 years)
• Cosmetic procedures
• Experimental treatments

CLAIMS PROCESS:
All claims must be submitted within 30 days of treatment with proper documentation.`;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      setPolicyName(e.dataTransfer.files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setPolicyName(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleAnalyze = () => {
    if (!uploadedFile || !policyName || !category || !effectiveDate) {
      toast.error('Please fill all required fields');
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      toast.success('Policy analyzed successfully!');
    }, 2000);
  };

  const handlePublishPolicy = () => {
    const newPolicy = {
      id: uploadedPolicies.length + 1,
      name: policyName,
      type: policyType,
      category: category,
      effectiveDate: effectiveDate,
      status: 'Published'
    };
    
    setUploadedPolicies([...uploadedPolicies, newPolicy]);
    toast.success('Policy published successfully!');
    
    // Reset form
    setUploadedFile(null);
    setAnalyzed(false);
    setPolicyName('');
    setCategory('');
    setEffectiveDate('');
    setPolicyType('Health');
  };

  const handleSaveDraft = () => {
    const newPolicy = {
      id: uploadedPolicies.length + 1,
      name: policyName,
      type: policyType,
      category: category,
      effectiveDate: effectiveDate,
      status: 'Draft'
    };
    
    setUploadedPolicies([...uploadedPolicies, newPolicy]);
    toast.success('Policy saved as draft!');
    
    // Reset form
    setUploadedFile(null);
    setAnalyzed(false);
    setPolicyName('');
    setCategory('');
    setEffectiveDate('');
    setPolicyType('Health');
  };

  return (
    <Layout role="hr">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">Upload Policy Document</h1>
          <p className="text-gray-600">Upload and analyze policy documents with AI</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Document Upload</h3>
          
          {!uploadedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-900 mb-2">Drag and drop your policy document here</p>
                <p className="text-gray-600 mb-4">or</p>
                <label className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition">
                  Browse Files
                  <input
                    type="file"
                    onChange={handleFileInput}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX, TXT</p>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <File className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">{uploadedFile.name}</p>
                  <p className="text-gray-600">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setAnalyzed(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Policy Details Form */}
        {uploadedFile && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Policy Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Policy Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={policyName}
                  onChange={(e) => setPolicyName(e.target.value)}
                  placeholder="Enter policy name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Employee Benefits"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Effective Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Policy Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={policyType}
                  onChange={(e) => setPolicyType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Health">Health</option>
                  <option value="Asset">Asset</option>
                  <option value="Travel">Travel</option>
                  <option value="Liability">Liability</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="mt-6 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Extracted Text Preview */}
        {analyzed && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-gray-900">AI Analysis Complete</h3>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900 mb-2">AI Insights</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>✓ Policy structure is well-defined</li>
                    <li>✓ All mandatory clauses are present</li>
                    <li>⚠ Consider adding grievance redressal procedure</li>
                    <li>✓ Compliance score: 92/100</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-gray-900 mb-3">Extracted Text Preview</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-700">{extractedText}</pre>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handlePublishPolicy}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Approve & Publish
              </button>
              <button
                onClick={handleSaveDraft}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Save as Draft
              </button>
            </div>
          </div>
        )}

        {/* Uploaded Policies List */}
        {uploadedPolicies.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Uploaded Policies</h3>
            <div className="space-y-3">
              {uploadedPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <File className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">{policy.name}</p>
                      <p className="text-gray-600">
                        Type: {policy.type} • Category: {policy.category} • Effective: {policy.effectiveDate}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      policy.status === 'Published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {policy.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}