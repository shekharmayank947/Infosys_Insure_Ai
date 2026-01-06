import { useState } from 'react';
import Layout from '../components/Layout';
import { Sparkles, FileText, Download, CheckCircle, TrendingUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function PolicyRecommendation() {
  const location = useLocation();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [employeeType, setEmployeeType] = useState('');
  const [department, setDepartment] = useState('');
  const [coverageNeeds, setCoverageNeeds] = useState<string[]>([]);

  // Determine role based on current route
  const role = location.pathname.includes('/hr') ? 'hr' : 
               location.pathname.includes('/admin') ? 'admin' : 
               location.pathname.includes('/employee') ? 'employee' : 'employee';

  const coverageOptions = [
    'Health Insurance',
    'Travel Insurance',
    'Life Insurance',
    'Accident Coverage',
    'Dental & Vision',
    'Remote Work Equipment',
    'Professional Development',
    'Wellness Programs',
  ];

  const recommendedPolicies = [
    {
      id: 1,
      name: 'Comprehensive Health Insurance',
      type: 'Health',
      coverage: '$100,000',
      premium: '$450/month',
      score: 95,
      features: [
        'In-patient hospitalization',
        'Out-patient treatment',
        'Maternity benefits',
        'Mental health coverage',
      ],
    },
    {
      id: 2,
      name: 'Corporate Travel Policy',
      type: 'Travel',
      coverage: '$50,000',
      premium: '$120/month',
      score: 88,
      features: [
        'International coverage',
        'Trip cancellation',
        'Lost baggage protection',
        'Emergency medical',
      ],
    },
    {
      id: 3,
      name: 'Equipment & Asset Protection',
      type: 'Asset',
      coverage: '$25,000',
      premium: '$80/month',
      score: 82,
      features: [
        'Laptop & mobile coverage',
        'Theft protection',
        'Accidental damage',
        'Replacement guarantee',
      ],
    },
  ];

  const handleCoverageToggle = (option: string) => {
    if (coverageNeeds.includes(option)) {
      setCoverageNeeds(coverageNeeds.filter((item) => item !== option));
    } else {
      setCoverageNeeds([...coverageNeeds, option]);
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <Layout role={role}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-8 h-8" />
            <h1>AI Policy Recommendation Engine</h1>
          </div>
          <p className="opacity-90">Get personalized policy recommendations based on employee needs</p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Employee & Coverage Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Employee Type</label>
              <select
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select employee type</option>
                <option value="full-time">Full-Time Employee</option>
                <option value="part-time">Part-Time Employee</option>
                <option value="contractor">Contractor</option>
                <option value="intern">Intern</option>
                <option value="executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select department</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-3">Coverage Needs (Select all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {coverageOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleCoverageToggle(option)}
                  className={`px-4 py-3 rounded-lg border-2 transition ${
                    coverageNeeds.includes(option)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {coverageNeeds.includes(option) && (
                      <CheckCircle className="w-4 h-4 ml-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !employeeType || !department || coverageNeeds.length === 0}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
          >
            {generating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Recommendations...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Recommendations</span>
              </>
            )}
          </button>
        </div>

        {/* Recommended Policies */}
        {generated && (
          <>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-green-900 mb-2">AI Analysis Complete!</p>
                  <p className="text-green-800">
                    Based on the employee profile ({employeeType} in {department}) and selected coverage needs,
                    we've identified {recommendedPolicies.length} highly suitable policies.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Recommended Policy Templates</h3>
                <div className="flex items-center space-x-2 text-purple-600">
                  <Sparkles className="w-5 h-5" />
                  <span>AI Powered</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {recommendedPolicies.map((policy) => (
                  <div
                    key={policy.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition group"
                  >
                    {/* Score Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {policy.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">{policy.score}% match</span>
                      </div>
                    </div>

                    {/* Policy Name */}
                    <h4 className="text-gray-900 mb-2">{policy.name}</h4>

                    {/* Coverage & Premium */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-gray-600">Coverage</p>
                        <p className="text-gray-900">{policy.coverage}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">Premium</p>
                        <p className="text-gray-900">{policy.premium}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-gray-700 mb-2">Key Features:</p>
                      <ul className="space-y-2">
                        {policy.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Select Policy
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Draft Policy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-gray-900 mb-1">Generate Custom Policy Draft</h3>
                  <p className="text-gray-600">Create a tailored policy document based on your selections</p>
                </div>
                <FileText className="w-12 h-12 text-blue-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-900 mb-1">Employee Type</p>
                  <p className="text-blue-700">{employeeType || 'Not selected'}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-purple-900 mb-1">Department</p>
                  <p className="text-purple-700">{department || 'Not selected'}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-900 mb-1">Coverage Items</p>
                  <p className="text-green-700">{coverageNeeds.length} selected</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Draft Policy</span>
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Template</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}