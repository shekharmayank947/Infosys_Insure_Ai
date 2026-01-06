import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Upload, 
  File, 
  X, 
  Sparkles, 
  CheckCircle 
} from 'lucide-angular';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-policy-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './policy-upload.component.html',
  styles: []
})
export class PolicyUploadComponent {
  uploadedFile = signal<File | null>(null);
  dragActive = signal(false);
  analyzing = signal(false);
  analyzed = signal(false);
  
  policyName = signal('');
  category = signal('');
  effectiveDate = signal('');
  policyType = signal('Health');
  
  uploadedPolicies = signal<any[]>([
    { id: 1, name: 'Annual Leave Policy', type: 'Other', category: 'HR', effectiveDate: '2023-01-15', status: 'Published' },
    { id: 2, name: 'Remote Work Guidelines', type: 'Other', category: 'Operations', effectiveDate: '2023-06-10', status: 'Published' },
  ]);

  // Icons
  readonly UploadIcon = Upload;
  readonly FileIcon = File;
  readonly XIcon = X;
  readonly SparklesIcon = Sparkles;
  readonly CheckCircleIcon = CheckCircle;

  extractedText = `HEALTH INSURANCE POLICY

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

  handleDrag(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      this.dragActive.set(true);
    } else if (e.type === 'dragleave') {
      this.dragActive.set(false);
    }
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive.set(false);

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      this.setFile(e.dataTransfer.files[0]);
    }
  }

  handleFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.setFile(input.files[0]);
    }
  }

  private setFile(file: File) {
    this.uploadedFile.set(file);
    this.policyName.set(file.name.replace(/\.[^/.]+$/, ''));
  }

  handleAnalyze() {
    if (!this.uploadedFile() || !this.policyName() || !this.category() || !this.effectiveDate()) {
      toast.error('Please fill all required fields');
      return;
    }

    this.analyzing.set(true);
    setTimeout(() => {
      this.analyzing.set(false);
      this.analyzed.set(true);
      toast.success('Policy analyzed successfully!');
    }, 2000);
  }

  handlePublishPolicy() {
    this.addPolicy('Published');
    toast.success('Policy published successfully!');
    this.resetForm();
  }

  handleSaveDraft() {
    this.addPolicy('Draft');
    toast.success('Policy saved as draft!');
    this.resetForm();
  }

  private addPolicy(status: string) {
    const newPolicy = {
      id: this.uploadedPolicies().length + 1,
      name: this.policyName(),
      type: this.policyType(),
      category: this.category(),
      effectiveDate: this.effectiveDate(),
      status: status
    };
    this.uploadedPolicies.update(policies => [...policies, newPolicy]);
  }

  private resetForm() {
    this.uploadedFile.set(null);
    this.analyzed.set(false);
    this.policyName.set('');
    this.category.set('');
    this.effectiveDate.set('');
    this.policyType.set('Health');
  }

  removeFile() {
    this.uploadedFile.set(null);
    this.analyzed.set(false);
  }
}
