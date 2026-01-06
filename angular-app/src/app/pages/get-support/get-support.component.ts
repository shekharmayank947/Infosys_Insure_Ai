import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle, 
  HelpCircle, 
  LucideAngularModule 
} from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { PolicyService, Policy } from '../../core/services/policy.service';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-get-support',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './get-support.component.html',
  styles: []
})
export class GetSupportComponent implements OnInit {
  private policyService = inject(PolicyService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);

  // Icons
  readonly MessageSquareIcon = MessageSquare;
  readonly SendIcon = Send;
  readonly ClockIcon = Clock;
  readonly CheckCircleIcon = CheckCircle;
  readonly HelpCircleIcon = HelpCircle;

  policies = signal<Policy[]>([]);
  subject = signal('');
  selectedPolicy = signal('');
  queryText = signal('');

  recentQueries = signal([
    { id: 1, subject: 'Health insurance coverage query', status: 'Answered', date: '2024-01-18', response: 'Our support team has responded to your query.' },
    { id: 2, subject: 'Travel policy clarification', status: 'Pending', date: '2024-01-17', response: '' },
    { id: 3, subject: 'Remote work policy question', status: 'Answered', date: '2024-01-15', response: 'Please check the updated policy document.' },
  ]);

  get userRole() {
    return this.authService.userRole();
  }

  ngOnInit() {
    const profile = this.profileService.profile();
    if (profile && profile.role === 'employee') {
      const userPolicies = this.policyService.getPoliciesForUser(profile.email);
      this.policies.set(userPolicies);
      if (userPolicies.length > 0) {
        this.selectedPolicy.set(userPolicies[0].name);
      }
    }
  }

  handleSubmitQuery() {
    if (!this.subject().trim()) {
      toast.error('Please enter a subject for your query');
      return;
    }
    if (!this.queryText().trim()) {
      toast.error('Please describe your query');
      return;
    }

    const newQuery = {
      id: this.recentQueries().length + 1,
      subject: this.subject(),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      response: '',
    };

    this.recentQueries.update(q => [newQuery, ...q]);
    
    // Clear form
    this.subject.set('');
    this.queryText.set('');
    if (this.policies().length > 0) {
      this.selectedPolicy.set(this.policies()[0].name);
    }

    toast.success('Your query has been submitted successfully! Our support team will respond shortly.');
  }

  getPendingCount() {
    return this.recentQueries().filter(q => q.status === 'Pending').length;
  }
}
