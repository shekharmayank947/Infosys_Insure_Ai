import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  File, 
  Trash2, 
  Send, 
  Info 
} from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { ComplianceService } from '../../core/services/compliance.service';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-compliance-checker',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './compliance-checker.component.html',
  styles: []
})
export class ComplianceCheckerComponent {
  activeTab = signal<'upload' | 'paste'>('upload');
  analyzing = signal(false);
  analyzed = signal(false);
  policyText = signal('');
  uploadedFile = signal<File | null>(null);
  dragActive = signal(false);

  private complianceService = inject(ComplianceService);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  // Icons
  readonly UploadIcon = Upload;
  readonly FileTextIcon = FileText;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly CheckCircleIcon = CheckCircle;
  readonly XCircleIcon = XCircle;
  readonly SparklesIcon = Sparkles;
  readonly FileIcon = File;
  readonly Trash2Icon = Trash2;
  readonly SendIcon = Send;
  readonly InfoIcon = Info;

  complianceResults = {
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

  handleDrag(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      this.dragActive.set(true);
    } else if (e.type === "dragleave") {
      this.dragActive.set(false);
    }
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive.set(false);
    
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      this.handleFiles(e.dataTransfer.files[0]);
    }
  }

  handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFiles(input.files[0]);
    }
  }

  handleFiles(file: File) {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size too large. Maximum size is 10MB.');
      return;
    }

    this.uploadedFile.set(file);
    toast.success(`File "${file.name}" uploaded successfully!`);
  }

  handleRemoveFile() {
    this.uploadedFile.set(null);
    this.analyzed.set(false);
    toast.info('File removed');
  }

  handleAnalyze() {
    if (this.activeTab() === 'upload' && !this.uploadedFile()) {
      toast.error('Please upload a document first');
      return;
    }

    if (this.activeTab() === 'paste' && !this.policyText().trim()) {
      toast.error('Please paste policy text first');
      return;
    }

    this.analyzing.set(true);
    toast.info('AI is analyzing your document for compliance...');
    
    setTimeout(() => {
      this.analyzing.set(false);
      this.analyzed.set(true);
      toast.success('Compliance analysis complete!');
    }, 2500);
  }

  handleDownloadReport() {
    const reportContent = `
===========================================
COMPLIANCE ANALYSIS REPORT
===========================================

Generated: ${new Date().toLocaleString()}\nDocument: ${this.uploadedFile()?.name || 'Pasted Text'}

OVERALL COMPLIANCE SCORE: ${this.complianceResults.score}/100
Status: Moderate Risk - Requires Attention

===========================================
MISSING CLAUSES (${this.complianceResults.missingClauses.length})
===========================================

${this.complianceResults.missingClauses.map((clause, idx) => `
${idx + 1}. ${clause.clause} [${clause.severity.toUpperCase()}]
   ${clause.description}
`).join('\n')}

===========================================
HIGH-RISK CONDITIONS (${this.complianceResults.highRiskConditions.length})
===========================================

${this.complianceResults.highRiskConditions.map((risk, idx) => `
${idx + 1}. ${risk.condition} [${risk.severity.toUpperCase()}]
   ${risk.description}
   Location: ${risk.location}
`).join('\n')}

===========================================
AI RECOMMENDATIONS
===========================================

${this.complianceResults.recommendations.map((rec, idx) => `
${idx + 1}. ${rec.title}
   ${rec.description}
`).join('\n')}

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
  }

  handleSubmitToHR(issue: any, type: 'missing-clause' | 'high-risk') {
    const profile = this.profileService.profile();
    if (!profile) {
      toast.error('User information not available');
      return;
    }

    this.complianceService.addRecord({
      employeeName: profile.fullName,
      employeeEmail: profile.email,
      policyName: this.uploadedFile()?.name || 'Pasted Policy Text',
      issueType: type as any,
      issueTitle: type === 'missing-clause' ? issue.clause : issue.condition,
      issueDescription: issue.description,
      severity: issue.severity as any,
      complianceScore: this.complianceResults.score,
      documentName: this.uploadedFile()?.name || 'Pasted Text'
    });

    toast.success(`Compliance issue "${type === 'missing-clause' ? issue.clause : issue.condition}" submitted to HR successfully!`);
  }
}
