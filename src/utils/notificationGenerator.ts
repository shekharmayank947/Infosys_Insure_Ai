// AI Notification Generator for Insurance Compliance System

export type IssueType = 'missing-clause' | 'high-risk' | 'general-concern' | 'recommendation';
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface NotificationData {
  issueType: IssueType;
  severity: SeverityLevel;
  issueTitle: string;
  issueDescription?: string;
  location?: string;
  actionRequired?: 'submit-to-hr' | 'review-required' | 'immediate-action' | 'informational';
}

export interface GeneratedNotification {
  title: string;
  message: string;
  action: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  icon: 'info' | 'warning' | 'error' | 'alert';
}

/**
 * Generates a professional notification message based on compliance analysis results
 */
export function generateComplianceNotification(data: NotificationData): GeneratedNotification {
  const { issueType, severity, issueTitle, issueDescription, location, actionRequired } = data;

  // Determine urgency level
  const urgency = severity;

  // Determine icon type
  let icon: 'info' | 'warning' | 'error' | 'alert';
  if (severity === 'critical') {
    icon = 'error';
  } else if (severity === 'high') {
    icon = 'alert';
  } else if (severity === 'medium') {
    icon = 'warning';
  } else {
    icon = 'info';
  }

  // Generate issue type label
  const issueTypeLabel = getIssueTypeLabel(issueType);
  
  // Generate severity label
  const severityLabel = getSeverityLabel(severity);

  // Generate title
  const title = `${severityLabel} ${issueTypeLabel} Detected`;

  // Generate message body
  let message = '';
  
  if (issueType === 'missing-clause') {
    message = `Your policy document is missing "${issueTitle}". `;
    if (issueDescription) {
      message += `${issueDescription} `;
    }
    message += 'This gap may expose your organization to compliance risks and should be addressed promptly.';
  } else if (issueType === 'high-risk') {
    message = `A potentially risky condition has been identified: "${issueTitle}". `;
    if (issueDescription) {
      message += `${issueDescription} `;
    }
    if (location) {
      message += `Found in ${location}. `;
    }
    message += 'Review and mitigation are recommended to protect your organization.';
  } else if (issueType === 'general-concern') {
    message = `${issueTitle}. `;
    if (issueDescription) {
      message += `${issueDescription} `;
    }
    message += 'Please review this concern to ensure policy compliance.';
  } else if (issueType === 'recommendation') {
    message = `Recommendation: ${issueTitle}. `;
    if (issueDescription) {
      message += `${issueDescription} `;
    }
    message += 'Consider implementing this improvement to strengthen your policy framework.';
  }

  // Generate action required
  const action = getActionMessage(actionRequired || determineAction(severity, issueType));

  return {
    title,
    message,
    action,
    urgency,
    icon
  };
}

/**
 * Get human-readable issue type label
 */
function getIssueTypeLabel(issueType: IssueType): string {
  switch (issueType) {
    case 'missing-clause':
      return 'Missing Clause';
    case 'high-risk':
      return 'High-Risk Condition';
    case 'general-concern':
      return 'Policy Concern';
    case 'recommendation':
      return 'Improvement Opportunity';
    default:
      return 'Compliance Issue';
  }
}

/**
 * Get human-readable severity label
 */
function getSeverityLabel(severity: SeverityLevel): string {
  switch (severity) {
    case 'critical':
      return 'Critical';
    case 'high':
      return 'High Priority';
    case 'medium':
      return 'Medium Priority';
    case 'low':
      return 'Low Priority';
    default:
      return '';
  }
}

/**
 * Determine appropriate action based on severity and issue type
 */
function determineAction(severity: SeverityLevel, issueType: IssueType): 'submit-to-hr' | 'review-required' | 'immediate-action' | 'informational' {
  if (severity === 'critical') {
    return 'immediate-action';
  } else if (severity === 'high' && issueType !== 'recommendation') {
    return 'submit-to-hr';
  } else if (severity === 'medium') {
    return 'review-required';
  } else {
    return 'informational';
  }
}

/**
 * Get action message text
 */
function getActionMessage(action: 'submit-to-hr' | 'review-required' | 'immediate-action' | 'informational'): string {
  switch (action) {
    case 'immediate-action':
      return 'Immediate action required. Submit this issue to HR for urgent review and resolution.';
    case 'submit-to-hr':
      return 'Submit this issue to HR for review and necessary policy updates.';
    case 'review-required':
      return 'Review this item and consult with your HR team if modifications are needed.';
    case 'informational':
      return 'Review this suggestion at your convenience to improve policy quality.';
    default:
      return 'Please review this item with your compliance team.';
  }
}

/**
 * Generate email-formatted notification
 */
export function generateEmailNotification(data: NotificationData, recipientName: string): string {
  const notification = generateComplianceNotification(data);
  
  const emailTemplate = `
Dear ${recipientName},

${notification.title}

${notification.message}

${notification.action}

Issue Details:
- Type: ${getIssueTypeLabel(data.issueType)}
- Severity: ${getSeverityLabel(data.severity)}
- Item: ${data.issueTitle}
${data.location ? `- Location: ${data.location}` : ''}

Please log in to your InsurAI dashboard to review this compliance alert and take appropriate action.

Best regards,
InsurAI Compliance System
Corporate Policy Automation Team
  `.trim();

  return emailTemplate;
}

/**
 * Generate dashboard notification summary
 */
export function generateDashboardSummary(notifications: GeneratedNotification[]): {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  message: string;
} {
  const total = notifications.length;
  const critical = notifications.filter(n => n.urgency === 'critical').length;
  const high = notifications.filter(n => n.urgency === 'high').length;
  const medium = notifications.filter(n => n.urgency === 'medium').length;
  const low = notifications.filter(n => n.urgency === 'low').length;

  let message = '';
  
  if (critical > 0) {
    message = `${critical} critical issue${critical > 1 ? 's' : ''} require immediate attention. `;
  }
  
  if (high > 0) {
    message += `${high} high-priority item${high > 1 ? 's' : ''} should be submitted to HR. `;
  }
  
  if (medium > 0) {
    message += `${medium} medium-priority item${medium > 1 ? 's' : ''} need${medium === 1 ? 's' : ''} review. `;
  }
  
  if (total === 0) {
    message = 'No compliance issues detected. Your policy is in good standing.';
  } else if (!message) {
    message = `${total} informational item${total > 1 ? 's' : ''} available for review.`;
  }

  return {
    total,
    critical,
    high,
    medium,
    low,
    message: message.trim()
  };
}

/**
 * Generate user-friendly toast notification message
 */
export function generateToastMessage(data: NotificationData): string {
  const { severity, issueTitle } = data;
  
  if (severity === 'critical') {
    return `Critical issue detected: ${issueTitle}. Immediate HR submission recommended.`;
  } else if (severity === 'high') {
    return `High-priority issue found: ${issueTitle}. Please submit to HR.`;
  } else if (severity === 'medium') {
    return `${issueTitle} requires review. Consider submitting to HR.`;
  } else {
    return `Suggestion: ${issueTitle}. Review when convenient.`;
  }
}
