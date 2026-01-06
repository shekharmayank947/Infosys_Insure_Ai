import { Component, inject, signal, effect, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  User, Mail, Phone, MapPin, Calendar, Upload, Edit, Save, X, 
  Bell, Moon, Sun, Globe, Check, Shield, Lock, Activity, 
  FileText, Users, BarChart3, Settings as SettingsIcon, Key,
  LucideAngularModule 
} from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { ProfileService } from '../../core/services/profile.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-hr-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './hr-profile.component.html',
  styles: []
})
export class HRProfileComponent {
  private profileService = inject(ProfileService);
  private themeService = inject(ThemeService);

  // Icons
  readonly UserIcon = User;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly UploadIcon = Upload;
  readonly EditIcon = Edit;
  readonly SaveIcon = Save;
  readonly XIcon = X;
  readonly BellIcon = Bell;
  readonly MoonIcon = Moon;
  readonly SunIcon = Sun;
  readonly GlobeIcon = Globe;
  readonly CheckIcon = Check;
  readonly ShieldIcon = Shield;
  readonly LockIcon = Lock;
  readonly ActivityIcon = Activity;
  readonly FileTextIcon = FileText;
  readonly UsersIcon = Users;
  readonly BarChartIcon = BarChart3;
  readonly SettingsIcon = SettingsIcon;
  readonly KeyIcon = Key;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  profile = signal({
    fullName: '',
    email: '',
    phone: '+1 (555) 123-4567',
    hrId: 'HR-2024-001',
    department: 'Human Resources',
    designation: 'HR Manager',
    joinDate: '2023-01-15',
    reportingTo: 'Chief People Officer',
    location: 'New York, NY',
    systemRole: 'HR Administrator'
  });

  preferences = signal({
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    theme: 'light' as 'light' | 'dark',
    language: 'en-US',
    twoFactorAuth: true
  });

  passwordData = signal({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  isEditing = signal(false);
  isEditingPreferences = signal(false);
  showPasswordChange = signal(false);
  profilePicture = signal<string | null>(null);
  errors = signal<{ [key: string]: string }>({});

  activitySummary = {
    policiesUploaded: 42,
    employeesManaged: 84,
    complianceReviewed: 156,
    reportsGenerated: 28,
    lastLogin: new Date().toLocaleDateString(),
    accountCreated: '2023-01-15'
  };

  systemPermissions = [
    { name: 'Upload Policies', granted: true },
    { name: 'View Employee Records', granted: true },
    { name: 'Manage Compliance Issues', granted: true },
    { name: 'Generate Reports', granted: true },
    { name: 'User Management', granted: true },
    { name: 'System Configuration', granted: true },
    { name: 'Audit Logs Access', granted: true },
    { name: 'Data Export', granted: true }
  ];

  constructor() {
    effect(() => {
      const p = this.profileService.profile();
      if (p) {
        this.profile.update(prev => ({
          ...prev,
          fullName: p.fullName,
          email: p.email,
        }));
        this.profilePicture.set(p.profilePicture || null);
      }
    }, { allowSignalWrites: true });

    effect(() => {
      this.preferences.update(prev => ({
        ...prev,
        theme: this.themeService.theme()
      }));
    }, { allowSignalWrites: true });
  }

  handleProfilePictureChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture.set(reader.result as string);
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfileField(field: string, value: any) {
    this.profile.update(p => ({ ...p, [field]: value }));
  }

  updatePasswordData(field: string, value: string) {
    this.passwordData.update(d => ({ ...d, [field]: value }));
  }

  handleSaveProfile() {
    if (!this.profile().fullName.trim()) {
      this.errors.set({ fullName: 'Full name is required' });
      return;
    }

    const current = this.profileService.profile();
    if (current) {
      this.profileService.updateProfile({
        fullName: this.profile().fullName,
        email: this.profile().email,
        role: current.role,
        profilePicture: this.profilePicture() || undefined
      });
    }

    this.isEditing.set(false);
    this.errors.set({});
    toast.success('Profile updated successfully!');
  }

  handleCancelEdit() {
    const p = this.profileService.profile();
    if (p) {
      this.profile.update(prev => ({
        ...prev,
        fullName: p.fullName,
        email: p.email,
      }));
    }
    this.isEditing.set(false);
    this.errors.set({});
  }

  handleSavePreferences() {
    if (this.preferences().theme !== this.themeService.theme()) {
      this.themeService.setTheme(this.preferences().theme);
    }
    this.isEditingPreferences.set(false);
    toast.success('Preferences saved!');
  }

  handlePasswordChange() {
    const data = this.passwordData();
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    this.showPasswordChange.set(false);
    this.passwordData.set({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password changed successfully!');
  }
}
