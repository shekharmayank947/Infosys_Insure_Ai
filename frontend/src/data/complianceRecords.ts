// Centralized compliance records data store
export interface ComplianceRecord {
  id: string;
  employeeName: string;
  employeeEmail: string;
  policyName: string;
  issueType: 'missing-clause' | 'high-risk' | 'general-concern' | 'recommendation';
  issueTitle: string;
  issueDescription: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  submittedDate: string;
  status: 'pending' | 'in-review' | 'resolved' | 'rejected';
  assignedTo?: string;
  notes?: string;
  complianceScore?: number;
  documentName?: string;
}

// Sample compliance records submitted by employees
let complianceRecords: ComplianceRecord[] = [
  {
    id: 'CR-001',
    employeeName: 'John Anderson',
    employeeEmail: 'john.anderson@company.com',
    policyName: 'Health Insurance Policy',
    issueType: 'missing-clause',
    issueTitle: 'Missing Data Privacy Compliance (GDPR)',
    issueDescription: 'The policy lacks data protection and privacy clauses required for GDPR compliance. This could expose the company to regulatory penalties.',
    severity: 'high',
    submittedDate: '2024-12-10',
    status: 'in-review',
    assignedTo: 'HR Team',
    complianceScore: 78,
    documentName: 'Health_Insurance_Policy_v2.pdf'
  },
  {
    id: 'CR-002',
    employeeName: 'Sarah Johnson',
    employeeEmail: 'sarah.johnson@company.com',
    policyName: 'Travel Policy',
    issueType: 'high-risk',
    issueTitle: 'Unlimited Liability Clause',
    issueDescription: 'Section 4.2 contains an unlimited liability clause that may expose company to significant financial risk during international travel incidents.',
    severity: 'critical',
    submittedDate: '2024-12-11',
    status: 'pending',
    complianceScore: 65,
    documentName: 'Travel_Policy_2024.pdf'
  },
  {
    id: 'CR-003',
    employeeName: 'Michael Chen',
    employeeEmail: 'michael.chen@company.com',
    policyName: 'Work From Home Policy',
    issueType: 'missing-clause',
    issueTitle: 'Grievance Redressal Mechanism Missing',
    issueDescription: 'No clear process defined for handling employee grievances related to remote work disputes or equipment issues.',
    severity: 'medium',
    submittedDate: '2024-12-09',
    status: 'resolved',
    assignedTo: 'John Davis',
    notes: 'Added grievance process in Section 6. Policy updated and redistributed.',
    complianceScore: 82,
    documentName: 'WFH_Policy.pdf'
  },
  {
    id: 'CR-004',
    employeeName: 'Emily Davis',
    employeeEmail: 'emily.davis@company.com',
    policyName: 'Data Protection Policy',
    issueType: 'high-risk',
    issueTitle: 'Vague Termination Terms',
    issueDescription: 'Policy termination conditions in Section 7.1 are not clearly specified, leading to potential legal disputes.',
    severity: 'high',
    submittedDate: '2024-12-08',
    status: 'in-review',
    assignedTo: 'Sarah Mitchell',
    complianceScore: 71,
    documentName: 'Data_Protection_Policy_Draft.pdf'
  },
  {
    id: 'CR-005',
    employeeName: 'David Wilson',
    employeeEmail: 'david.wilson@company.com',
    policyName: 'Asset Management Policy',
    issueType: 'recommendation',
    issueTitle: 'Add Force Majeure Clause',
    issueDescription: 'Recommend adding force majeure clause to protect company during unforeseen circumstances like natural disasters or pandemics.',
    severity: 'low',
    submittedDate: '2024-12-12',
    status: 'pending',
    complianceScore: 88,
    documentName: 'Asset_Management.pdf'
  },
];

// Get all compliance records
export function getAllComplianceRecords(): ComplianceRecord[] {
  return [...complianceRecords];
}

// Get compliance records by status
export function getComplianceRecordsByStatus(status: ComplianceRecord['status']): ComplianceRecord[] {
  return complianceRecords.filter(record => record.status === status);
}

// Get compliance records by employee
export function getComplianceRecordsByEmployee(employeeEmail: string): ComplianceRecord[] {
  return complianceRecords.filter(record => record.employeeEmail.toLowerCase() === employeeEmail.toLowerCase());
}

// Add a new compliance record
export function addComplianceRecord(record: Omit<ComplianceRecord, 'id' | 'submittedDate' | 'status'>): ComplianceRecord {
  const newRecord: ComplianceRecord = {
    ...record,
    id: `CR-${String(complianceRecords.length + 1).padStart(3, '0')}`,
    submittedDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  complianceRecords.push(newRecord);
  return newRecord;
}

// Update compliance record status
export function updateComplianceRecordStatus(
  id: string, 
  status: ComplianceRecord['status'],
  assignedTo?: string,
  notes?: string
): ComplianceRecord | null {
  const recordIndex = complianceRecords.findIndex(record => record.id === id);
  if (recordIndex === -1) return null;
  
  complianceRecords[recordIndex] = {
    ...complianceRecords[recordIndex],
    status,
    ...(assignedTo && { assignedTo }),
    ...(notes && { notes })
  };
  
  return complianceRecords[recordIndex];
}

// Get statistics
export function getComplianceStatistics() {
  const total = complianceRecords.length;
  const pending = complianceRecords.filter(r => r.status === 'pending').length;
  const inReview = complianceRecords.filter(r => r.status === 'in-review').length;
  const resolved = complianceRecords.filter(r => r.status === 'resolved').length;
  const critical = complianceRecords.filter(r => r.severity === 'critical').length;
  const high = complianceRecords.filter(r => r.severity === 'high').length;
  
  return {
    total,
    pending,
    inReview,
    resolved,
    critical,
    high,
    actionRequired: pending + critical
  };
}
