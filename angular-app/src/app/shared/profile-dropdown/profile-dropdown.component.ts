import { Component, inject, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, User, ChevronDown, Settings, LogOut } from 'lucide-angular';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './profile-dropdown.component.html',
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.15s ease-out;
    }
  `]
})
export class ProfileDropdownComponent {
  isOpen = signal(false);
  
  // Icons
  readonly UserIcon = User;
  readonly ChevronDownIcon = ChevronDown;
  readonly SettingsIcon = Settings;
  readonly LogOutIcon = LogOut;

  public profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  handleSignOut() {
    this.authService.logout();
    this.isOpen.set(false);
  }

  handleProfileSettings() {
    this.router.navigate(['/settings']);
    this.isOpen.set(false);
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
