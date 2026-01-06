import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRole = signal<string | null>(sessionStorage.getItem('userRole'));
  userEmail = signal<string | null>(sessionStorage.getItem('userEmail'));

  constructor(private router: Router) {}

  login(role: string, email: string) {
    this.userRole.set(role);
    this.userEmail.set(email);
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userEmail', email);
  }

  logout() {
    this.userRole.set(null);
    this.userEmail.set(null);
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    this.router.navigate(['/']);
  }

  getUserName(): string {
    const email = this.userEmail();
    if (!email) return '';
    return email.split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  isLoggedIn(): boolean {
    return !!this.userRole();
  }

  hasRole(role: string): boolean {
    const currentRole = this.userRole();
    if (role === 'employee' && (currentRole === 'employee' || currentRole === 'user')) {
      return true;
    }
    return currentRole === role;
  }
}
