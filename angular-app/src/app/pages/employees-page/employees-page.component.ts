import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  Search, 
  FileText, 
  Eye, 
  Edit, 
  Trash2,
  LucideAngularModule 
} from 'lucide-angular';
import { ComplianceService, ComplianceRecord } from '../../core/services/compliance.service';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './employees-page.component.html',
  styles: []
})
export class EmployeesPageComponent {
  private complianceService = inject(ComplianceService);

  // Icons
  readonly UsersIcon = Users;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly CheckCircleIcon = CheckCircle;
  readonly XCircleIcon = XCircle;
  readonly ClockIcon = Clock;
  readonly FilterIcon = Filter;
  readonly SearchIcon = Search;
  readonly FileTextIcon = FileText;
  readonly EyeIcon = Eye;
  readonly EditIcon = Edit;
  readonly Trash2Icon = Trash2;

  filterStatus = signal<string>('all');
  searchQuery = signal('');
  selectedRecord = signal<ComplianceRecord | null>(null);
  showDetailModal = signal(false);

  records = computed(() => this.complianceService.records());
  stats = computed(() => this.complianceService.getStatistics());

  filteredRecords = computed(() => {
    const records = this.records();
    const status = this.filterStatus();
    const query = this.searchQuery().toLowerCase();

    let list = [...records];

    if (status !== 'all') {
      list = list.filter((r: ComplianceRecord) => r.status === status);
    }

    if (query) {
      list = list.filter((r: ComplianceRecord) => 
        r.employeeName.toLowerCase().includes(query) ||
        r.issueTitle.toLowerCase().includes(query) ||
        r.policyName.toLowerCase().includes(query)
      );
    }

    return list;
  });

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'resolved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'in-review': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'rejected': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'pending': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  }

  handleStatusChange(recordId: string, newStatus: string) {
    this.complianceService.updateStatus(recordId, newStatus as any);
  }

  handleViewDetails(record: ComplianceRecord) {
    this.selectedRecord.set(record);
    this.showDetailModal.set(true);
  }

  closeModal() {
    this.showDetailModal.set(false);
    this.selectedRecord.set(null);
  }
}
