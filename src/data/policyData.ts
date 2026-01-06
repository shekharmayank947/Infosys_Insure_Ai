// Centralized policy data with user assignments
export interface Policy {
  id: number;
  name: string;
  category: string;
  status: string;
  lastUpdated: string;
  acknowledged: boolean;
  assignedTo: string[]; // Array of user emails
}

// All policies in the system with their assignments
export const allPolicies: Policy[] = [
  {
    id: 1,
    name: 'Health Insurance Policy',
    category: 'Health',
    status: 'Active',
    lastUpdated: '2024-01-15',
    acknowledged: true,
    assignedTo: ['john.anderson@company.com', 'john.smith@company.com', 'sarah.johnson@company.com', 'michael.chen@company.com', 'emily.davis@company.com']
  },
  {
    id: 2,
    name: 'Travel Policy',
    category: 'Travel',
    status: 'Active',
    lastUpdated: '2024-01-10',
    acknowledged: true,
    assignedTo: ['john.anderson@company.com', 'john.smith@company.com', 'michael.chen@company.com', 'lisa.anderson@company.com']
  },
  {
    id: 3,
    name: 'Asset Management Policy',
    category: 'Asset',
    status: 'Active',
    lastUpdated: '2024-01-05',
    acknowledged: false,
    assignedTo: ['john.anderson@company.com', 'sarah.johnson@company.com', 'michael.chen@company.com', 'david.wilson@company.com', 'lisa.anderson@company.com']
  },
  {
    id: 4,
    name: 'Work From Home Policy',
    category: 'Other',
    status: 'Active',
    lastUpdated: '2023-12-20',
    acknowledged: true,
    assignedTo: ['john.anderson@company.com', 'john.smith@company.com', 'sarah.johnson@company.com', 'emily.davis@company.com', 'david.wilson@company.com']
  },
  {
    id: 5,
    name: 'Data Protection Policy',
    category: 'Liability',
    status: 'Pending Review',
    lastUpdated: '2024-01-18',
    acknowledged: false,
    assignedTo: ['john.anderson@company.com', 'john.smith@company.com', 'emily.davis@company.com', 'michael.chen@company.com']
  },
  {
    id: 6,
    name: 'Code of Conduct Policy',
    category: 'Compliance',
    status: 'Active',
    lastUpdated: '2024-01-12',
    acknowledged: true,
    assignedTo: ['sarah.johnson@company.com', 'michael.chen@company.com', 'lisa.anderson@company.com']
  },
  {
    id: 7,
    name: 'Remote Work Security Policy',
    category: 'Security',
    status: 'Active',
    lastUpdated: '2024-01-08',
    acknowledged: false,
    assignedTo: ['john.smith@company.com', 'david.wilson@company.com']
  },
  {
    id: 8,
    name: 'Leave and Attendance Policy',
    category: 'HR',
    status: 'Active',
    lastUpdated: '2024-01-03',
    acknowledged: true,
    assignedTo: ['emily.davis@company.com', 'sarah.johnson@company.com', 'lisa.anderson@company.com']
  },
];

// Helper function to get policies assigned to a specific user
export function getPoliciesForUser(userEmail: string): Policy[] {
  return allPolicies.filter(policy => 
    policy.assignedTo.includes(userEmail.toLowerCase())
  );
}

// Helper function to count pending acknowledgments for a user
export function getPendingAcknowledgments(userEmail: string): number {
  const userPolicies = getPoliciesForUser(userEmail);
  return userPolicies.filter(policy => !policy.acknowledged).length;
}
