import { Component, inject, signal, effect, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Upload, 
  Edit, 
  Save, 
  X, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Check,
  LucideAngularModule 
} from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { ProfileService } from '../../core/services/profile.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './employee-profile.component.html',
  styles: []
})
export class EmployeeProfileComponent {
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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Profile data
  profile = signal({
    fullName: '',
    email: '',
    phone: '+1 (555) 123-4567',
    employeeId: 'EMP-2024-001',
    department: 'Engineering',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: '123 Tech Lane, Silicon Valley, CA 94025',
    profilePicture: null as string | null
  });

  // UI State
  isEditing = signal(false);
  isEditingPreferences = signal(false);
  errors = signal<{ [key: string]: string }>({});

  // Preferences
  preferences = signal({
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    theme: 'light' as 'light' | 'dark',
    language: 'en-US'
  });

  constructor() {
    // Initial sync from services
    const currentProfile = this.profileService.profile();
    if (currentProfile) {
      this.profile.update(p => ({
        ...p,
        fullName: currentProfile.fullName,
        email: currentProfile.email,
        department: currentProfile.role === 'hr' ? 'HR' : 'Engineering'
      }));
    }

    this.preferences.update(pref => ({
      ...pref,
      theme: this.themeService.theme()
    }));

    // Effect to sync theme service when preference changes
    effect(() => {
      const currentTheme = this.preferences().theme;
      if (currentTheme !== this.themeService.theme()) {
        this.themeService.setTheme(currentTheme);
      }
    }, { allowSignalWrites: true });
  }

  handleImageUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      toast.error('Please upload a PNG or JPG image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.profile.update(p => ({ ...p, profilePicture: reader.result as string }));
      toast.success('Profile picture updated!');
    };
    reader.readAsDataURL(file);
  }

  handleSaveProfile() {
    if (!this.validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    const p = this.profile();
    this.profileService.updateProfile({
      fullName: p.fullName,
      email: p.email,
      role: p.department === 'HR' ? 'hr' : 'employee'
    });

    this.isEditing.set(false);
    toast.success('Profile updated successfully!');
  }

  handleCancelEdit() {
    // In a real app, we'd reset to the original data from a service
    this.isEditing.set(false);
    this.errors.set({});
    toast.info('Changes cancelled');
  }

  handleSavePreferences() {
    this.isEditingPreferences.set(false);
    toast.success('Preferences updated successfully!');
  }

  handleCancelEditPreferences() {
    this.isEditingPreferences.set(false);
    toast.info('Changes cancelled');
  }

  private validateForm(): boolean {
    const p = this.profile();
    const newErrors: { [key: string]: string } = {};

    if (!p.fullName.trim()) newErrors['fullName'] = 'Full name is required';
    if (!p.email.trim()) newErrors['email'] = 'Email is required';
    if (!p.phone.trim()) newErrors['phone'] = 'Phone number is required';
    
    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  removeProfilePicture() {
    this.profile.update(p => ({ ...p, profilePicture: null }));
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  toggleTheme() {
    const nextTheme = this.preferences().theme === 'light' ? 'dark' : 'light';
    this.preferences.update(p => ({ ...p, theme: nextTheme }));
  }
}
