import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'hr',
        data: { role: 'hr' },
        loadComponent: () => import('./pages/hr-dashboard/hr-dashboard.component').then(m => m.HRDashboardComponent)
      },
      {
        path: 'policy-upload',
        data: { role: 'hr' },
        loadComponent: () => import('./pages/policy-upload/policy-upload.component').then(m => m.PolicyUploadComponent)
      },
      {
        path: 'compliance-checker',
        // Available for both roles as per React logic
        loadComponent: () => import('./pages/compliance-checker/compliance-checker.component').then(m => m.ComplianceCheckerComponent)
      },
      {
        path: 'reports',
        data: { role: 'hr' },
        loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'settings',
        // Available for both roles
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'employees',
        data: { role: 'hr' },
        loadComponent: () => import('./pages/employees-page/employees-page.component').then(m => m.EmployeesPageComponent)
      },
      {
        path: 'hr-profile',
        data: { role: 'hr' },
        loadComponent: () => import('./pages/hr-profile/hr-profile.component').then(m => m.HRProfileComponent)
      },
      {
        path: 'employee',
        data: { role: 'employee' },
        loadComponent: () => import('./pages/employee-dashboard/employee-dashboard.component').then(m => m.EmployeeDashboardComponent)
      },
      {
        path: 'policy-recommendation',
        data: { role: 'employee' },
        loadComponent: () => import('./pages/policy-recommendation/policy-recommendation.component').then(m => m.PolicyRecommendationComponent)
      },
      {
        path: 'support',
        data: { role: 'employee' },
        loadComponent: () => import('./pages/get-support/get-support.component').then(m => m.GetSupportComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
