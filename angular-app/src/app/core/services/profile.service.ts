import { Injectable, signal } from '@angular/core';

export interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  profilePicture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile = signal<UserProfile | null>(null);

  constructor() {
    const storedRole = sessionStorage.getItem('userRole');
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedRole && storedEmail) {
      this.profile.set({
        fullName: this.extractName(storedEmail),
        email: storedEmail,
        role: storedRole
      });
    }
  }

  private extractName(email: string): string {
    return email.split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  updateProfile(profile: UserProfile) {
    this.profile.set(profile);
  }
}
