import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  LucideAngularModule, 
  FileText, 
  UserCheck, 
  Clock, 
  Upload, 
  ShieldCheck, 
  Users, 
  AlertTriangle 
} from 'lucide-angular';
import { DashboardCardComponent } from '../../shared/dashboard-card/dashboard-card.component';
import { ComplianceService } from '../../core/services/compliance.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DashboardCardComponent],
  templateUrl: './hr-dashboard.component.html',
  styles: []
})
export class HRDashboardComponent {
  private router = inject(Router);
  public complianceService = inject(ComplianceService);
  public profileService = inject(ProfileService);

  // Icons
  readonly FileTextIcon = FileText;
  readonly UserCheckIcon = UserCheck;
  readonly ClockIcon = Clock;
  readonly UploadIcon = Upload;
  readonly ShieldCheckIcon = ShieldCheck;
  readonly UsersIcon = Users;
  readonly AlertTriangleIcon = AlertTriangle;

  employeePolicies = [
    { id: 1, name: 'John Smith', department: 'Engineering', policies: 5, status: 'Complete', compliance: 100 },
    { id: 2, name: 'Sarah Johnson', department: 'Marketing', policies: 4, status: 'Pending', compliance: 80 },
    { id: 3, name: 'Michael Chen', department: 'Sales', policies: 6, status: 'Complete', compliance: 100 },
    { id: 4, name: 'Emily Davis', department: 'HR', policies: 5, status: 'Complete', compliance: 100 },
    { id: 5, name: 'David Wilson', department: 'Finance', policies: 3, status: 'Incomplete', compliance: 60 },
    { id: 6, name: 'Lisa Anderson', department: 'Operations', policies: 4, status: 'Pending', compliance: 75 },
  ];

  get complianceStats() {
    return this.complianceService.getStatistics();
  }

  get userName() {
    return this.profileService.profile()?.fullName || 'HR Manager';
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
