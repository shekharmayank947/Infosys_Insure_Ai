import Layout from '../components/Layout';
import { MessageSquare, Send, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { getPoliciesForUser, type Policy } from '../data/policyData';

interface GetSupportProps {
  userName?: string;
  userEmail?: string;
  role?: 'hr' | 'employee';
}

export default function GetSupport({ userName = 'User', userEmail = 'user@company.com', role = 'employee' }: GetSupportProps) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [subject, setSubject] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [queryText, setQueryText] = useState('');

  // Load policies assigned to the current user
  useEffect(() => {
    if (userEmail && role === 'employee') {
      const userPolicies = getPoliciesForUser(userEmail);
      setPolicies(userPolicies);
      if (userPolicies.length > 0) {
        setSelectedPolicy(userPolicies[0].name);
      }
    }
  }, [userEmail, role]);

  const [recentQueries, setRecentQueries] = useState([
    { id: 1, subject: 'Health insurance coverage query', status: 'Answered', date: '2024-01-18', response: 'Our support team has responded to your query.' },
    { id: 2, subject: 'Travel policy clarification', status: 'Pending', date: '2024-01-17', response: '' },
    { id: 3, subject: 'Remote work policy question', status: 'Answered', date: '2024-01-15', response: 'Please check the updated policy document.' },
  ]);

  const handleSubmitQuery = () => {
    if (!subject.trim()) {
      toast.error('Please enter a subject for your query');
      return;
    }
    if (!queryText.trim()) {
      toast.error('Please describe your query');
      return;
    }

    // Add new query to the list
    const newQuery = {
      id: recentQueries.length + 1,
      subject: subject,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      response: '',
    };

    setRecentQueries([newQuery, ...recentQueries]);
    
    // Clear form
    setSubject('');
    setQueryText('');
    if (policies.length > 0) {
      setSelectedPolicy(policies[0].name);
    }

    toast.success('Your query has been submitted successfully! Our support team will respond shortly.');
  };

  return (
    <Layout role={role} userName={userName} userEmail={userEmail}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="mb-2">Get Support</h1>
              <p className="opacity-90">Submit your policy queries and get help from our support team</p>
            </div>
          </div>
        </div>

        {/* Submit Policy Query Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Submit Policy Query</h3>
              <p className="text-gray-600 dark:text-gray-400">Ask questions about your policies and get expert assistance</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
              <input
                type="text"
                placeholder="Enter query subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {role === 'employee' && policies.length > 0 && (
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Related Policy (Optional)</label>
                <select
                  value={selectedPolicy}
                  onChange={(e) => setSelectedPolicy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select a policy (optional)</option>
                  {policies.map((policy) => (
                    <option key={policy.id} value={policy.name}>
                      {policy.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Query *</label>
              <textarea
                rows={5}
                placeholder="Describe your query in detail..."
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              onClick={handleSubmitQuery}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Send className="w-4 h-4" />
              <span>Submit Query</span>
            </button>
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">Your Queries</h3>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
              {recentQueries.filter(q => q.status === 'Pending').length} pending
            </span>
          </div>

          {recentQueries.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">No queries submitted yet</p>
              <p className="text-gray-500 dark:text-gray-500">Submit your first query using the form above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentQueries.map((query) => (
                <div
                  key={query.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-gray-900 dark:text-white">{query.subject}</p>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            query.status === 'Answered'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {query.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Submitted on {query.date}</p>
                    </div>
                    {query.status === 'Pending' ? (
                      <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  
                  {query.response && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300 mb-1">Support Response:</p>
                      <p className="text-gray-600 dark:text-gray-400">{query.response}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support Contact Info */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-gray-900 dark:text-white mb-4">Need Immediate Assistance?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-1">Email Support</p>
              <a href="mailto:support@insurai.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                support@insurai.com
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-1">Phone Support</p>
              <a href="tel:+1-800-123-4567" className="text-blue-600 dark:text-blue-400 hover:underline">
                +1 (800) 123-4567
              </a>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Support hours: Monday - Friday, 9:00 AM - 6:00 PM EST
          </p>
        </div>
      </div>
    </Layout>
  );
}
