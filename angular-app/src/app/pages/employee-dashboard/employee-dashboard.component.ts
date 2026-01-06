import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  FileText, 
  Download, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-angular';
import { DashboardCardComponent } from '../../shared/dashboard-card/dashboard-card.component';
import { PolicyService, Policy } from '../../core/services/policy.service';
import { ProfileService } from '../../core/services/profile.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardCardComponent],
  templateUrl: './employee-dashboard.component.html',
  styles: []
})
export class EmployeeDashboardComponent {
  private policyService = inject(PolicyService);
  public profileService = inject(ProfileService);

  // Icons
  readonly FileTextIcon = FileText;
  readonly DownloadIcon = Download;
  readonly MessageSquareIcon = MessageSquare;
  readonly ClockIcon = Clock;
  readonly CheckCircleIcon = CheckCircle;
  readonly AlertCircleIcon = AlertCircle;

  policies = computed(() => {
    const email = this.profileService.profile()?.email;
    if (!email) return [];
    return this.policyService.getPoliciesForUser(email);
  });

  pendingCount = computed(() => {
    const email = this.profileService.profile()?.email;
    if (!email) return 0;
    return this.policyService.getPendingCount(email);
  });

  renewalReminders = [
    { id: 1, policy: 'Health Insurance Policy', dueDate: '2024-02-15', daysLeft: 25 },
    { id: 2, policy: 'Travel Policy', dueDate: '2024-03-01', daysLeft: 39 },
  ];

  get userName() {
    return this.profileService.profile()?.fullName || 'Employee';
  }

  handleAcknowledge(policyId: number) {
    this.policyService.acknowledgePolicy(policyId);
    toast.success('Policy acknowledged successfully!');
  }

  handleDownloadPDF(policyName: string) {
    toast.success(`Preparing ${policyName} for download...`);
    
    const pdfContent = `
===========================================
${policyName}
===========================================

Policy Document
Generated on: ${new Date().toLocaleDateString()}

This is a policy document for ${policyName}.

Company: InsurAI - Corporate Policy Automation System
Document Type: Policy Document
Status: Active

Policy Details:
--------------
This document contains the complete policy information
and guidelines for ${policyName}.

All employees are required to read and acknowledge
this policy as per company requirements.

For more information, please contact HR department.

===========================================
End of Document
===========================================
    `.trim();

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${policyName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('PDF downloaded successfully!');
  }
}
