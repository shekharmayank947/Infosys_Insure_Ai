import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { 
  LucideAngularModule, 
  LayoutDashboard, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  UserCircle, 
  Shield, 
  CheckCircle, 
  Menu, 
  X 
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {
  @Input() role: 'hr' | 'employee' = 'employee';
  isOpen = signal(false);

  // Icons
  readonly DashboardIcon = LayoutDashboard;
  readonly ComplianceIcon = ShieldCheck;
  readonly UsersIcon = Users;
  readonly ReportsIcon = BarChart3;
  readonly ProfileIcon = UserCircle;
  readonly ShieldIcon = Shield;
  readonly CheckCircleIcon = CheckCircle;
  readonly MenuIcon = Menu;
  readonly XIcon = X;

  private authService = inject(AuthService);

  get menuItems() {
    if (this.role === 'hr') {
      return [
        { icon: this.DashboardIcon, label: 'Dashboard', path: '/hr' },
        { icon: this.ComplianceIcon, label: 'Compliance Checker', path: '/compliance-checker' },
        { icon: this.UsersIcon, label: 'Employees', path: '/employees' },
        { icon: this.ReportsIcon, label: 'Reports', path: '/reports' },
        { icon: this.ProfileIcon, label: 'My Profile', path: '/hr-profile' },
      ];
    }
    return [
      { icon: this.DashboardIcon, label: 'Dashboard', path: '/employee' },
      { icon: this.CheckCircleIcon, label: 'AI Compliance Checker', path: '/compliance-checker' },
      { icon: this.ProfileIcon, label: 'My Profile', path: '/settings' },
    ];
  }

  get dashboardPath() {
    return this.role === 'hr' ? '/hr' : '/employee';
  }

  toggleSidebar() {
    this.isOpen.update(v => !v);
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}
