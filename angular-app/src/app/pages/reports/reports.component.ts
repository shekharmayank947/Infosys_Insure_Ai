import { Component, inject, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  LucideAngularModule 
} from 'lucide-angular';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NgxChartsModule],
  templateUrl: './reports.component.html',
  styles: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsComponent {
  private authService = inject(AuthService);
  readonly LegendPosition = LegendPosition;

  // Icons
  readonly DownloadIcon = Download;
  readonly FilterIcon = Filter;
  readonly CalendarIcon = Calendar;
  readonly TrendingUpIcon = TrendingUp;

  get userRole() {
    return this.authService.userRole();
  }

  // Data for ngx-charts
  complianceTrendData = [
    {
      name: 'Actual Compliance',
      series: [
        { name: 'Jan', value: 78 },
        { name: 'Feb', value: 82 },
        { name: 'Mar', value: 85 },
        { name: 'Apr', value: 88 },
        { name: 'May', value: 91 },
        { name: 'Jun', value: 94 },
      ]
    },
    {
      name: 'Target',
      series: [
        { name: 'Jan', value: 85 },
        { name: 'Feb', value: 85 },
        { name: 'Mar', value: 85 },
        { name: 'Apr', value: 90 },
        { name: 'May', value: 90 },
        { name: 'Jun', value: 90 },
      ]
    }
  ];

  employeeAdoptionData = [
    { name: 'Engineering', value: 95 },
    { name: 'Sales', value: 88 },
    { name: 'Marketing', value: 92 },
    { name: 'HR', value: 98 },
    { name: 'Finance', value: 90 },
    { name: 'Operations', value: 85 },
  ];

  riskHeatmapData = [
    { name: 'Health', value: 2 },
    { name: 'Travel', value: 5 },
    { name: 'Asset', value: 3 },
    { name: 'Liability', value: 7 },
    { name: 'Other', value: 4 },
  ];

  renewalTimelineData = [
    {
      name: 'Actual Renewals',
      series: [
        { name: 'Jul', value: 12 },
        { name: 'Aug', value: 8 },
        { name: 'Sep', value: 15 },
        { name: 'Oct', value: 20 },
        { name: 'Nov', value: 18 },
        { name: 'Dec', value: 10 },
      ]
    },
    {
      name: 'Budget',
      series: [
        { name: 'Jul', value: 15 },
        { name: 'Aug', value: 10 },
        { name: 'Sep', value: 18 },
        { name: 'Oct', value: 20 },
        { name: 'Nov', value: 22 },
        { name: 'Dec', value: 12 },
      ]
    }
  ];

  policyDistributionData = [
    { name: 'Health', value: 87 },
    { name: 'Travel', value: 62 },
    { name: 'Asset', value: 50 },
    { name: 'Liability', value: 37 },
    { name: 'Other', value: 11 },
  ];

  radarData = [
    { name: 'Coverage', value: 85 },
    { name: 'Compliance', value: 92 },
    { name: 'Cost Efficiency', value: 78 },
    { name: 'Employee Satisfaction', value: 88 },
    { name: 'Risk Management', value: 75 },
    { name: 'Processing Speed', value: 95 },
  ];

  colorScheme: any = {
    domain: ['#1F6FEB', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444']
  };

  areaColors: any = {
    domain: ['#1F6FEB', '#10B981']
  };

  barColors: any = {
    domain: ['#8B5CF6']
  };

  getRiskColor(value: number): string {
    if (value >= 6) return '#EF4444';
    if (value >= 4) return '#F59E0B';
    return '#10B981';
  }
}
