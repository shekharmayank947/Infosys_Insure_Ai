import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Key, 
  Mail, 
  Search, 
  LucideAngularModule 
} from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from '../../core/services/profile.service';
import { EmployeeProfileComponent } from '../../shared/employee-profile/employee-profile.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, EmployeeProfileComponent],
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent {
  private authService = inject(AuthService);
  public profileService = inject(ProfileService);

  // Icons
  readonly UserPlusIcon = UserPlus;
  readonly EditIcon = Edit;
  readonly Trash2Icon = Trash2;
  readonly KeyIcon = Key;
  readonly MailIcon = Mail;
  readonly SearchIcon = Search;

  showAddUser = signal(false);
  searchQuery = signal('');
  
  users = signal([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'HR Manager', status: 'Active', department: 'HR', joinDate: '2023-02-20' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@company.com', role: 'Employee', status: 'Active', department: 'Engineering', joinDate: '2023-03-10' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', role: 'HR Manager', status: 'Active', department: 'HR', joinDate: '2023-04-05' },
    { id: 4, name: 'David Wilson', email: 'david.w@company.com', role: 'Employee', status: 'Inactive', department: 'Finance', joinDate: '2023-05-12' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@company.com', role: 'Employee', status: 'Active', department: 'Operations', joinDate: '2023-06-18' },
    { id: 6, name: 'Jennifer Martinez', email: 'jennifer.m@company.com', role: 'Employee', status: 'Active', department: 'Marketing', joinDate: '2023-08-30' },
  ]);

  // Form state for new user
  newUserName = '';
  newUserEmail = '';
  newUserRole = 'Employee';
  newUserDepartment = 'Engineering';

  get userRole() {
    return this.authService.userRole();
  }

  activeUsersCount = computed(() => this.users().filter(u => u.status === 'Active').length);
  hrManagersCount = computed(() => this.users().filter(u => u.role === 'HR Manager').length);

  get filteredUsers() {
    const query = this.searchQuery().toLowerCase();
    return this.users().filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)
    );
  }

  handleDeleteUser(userId: number, userName: string) {
    this.users.update(users => users.filter(u => u.id !== userId));
    toast.success(`User ${userName} has been removed`);
  }

  handleResetPassword(userName: string) {
    toast.success(`Password reset link sent to ${userName}`);
  }

  handleAddUser() {
    if (!this.newUserName || !this.newUserEmail) {
      toast.error('Please fill all required fields');
      return;
    }

    const newUser = {
      id: this.users().length + 1,
      name: this.newUserName,
      email: this.newUserEmail,
      role: this.newUserRole,
      status: 'Active',
      department: this.newUserDepartment,
      joinDate: new Date().toISOString().split('T')[0],
    };

    this.users.update(users => [...users, newUser]);
    toast.success('User added successfully!');
    this.showAddUser.set(false);
    this.resetNewUserForm();
  }

  private resetNewUserForm() {
    this.newUserName = '';
    this.newUserEmail = '';
    this.newUserRole = 'Employee';
    this.newUserDepartment = 'Engineering';
  }
}
