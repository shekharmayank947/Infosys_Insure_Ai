import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  LucideAngularModule, 
  Bot, 
  Shield, 
  Lock, 
  User, 
  Mail, 
  Eye, 
  EyeOff 
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  isLogin = signal(true);
  selectedRole = signal('employee');
  email = signal('');
  fullName = signal('');
  showPassword = signal(false);

  // Icons
  readonly BotIcon = Bot;
  readonly ShieldIcon = Shield;
  readonly LockIcon = Lock;
  readonly UserIcon = User;
  readonly MailIcon = Mail;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;

  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  handleSubmit(e: Event) {
    e.preventDefault();
    const role = this.selectedRole();
    const email = this.email();
    const name = this.fullName();

    this.authService.login(role, email);
    this.profileService.updateProfile({
      fullName: name,
      email,
      role
    });

    switch (role) {
      case 'hr':
        this.router.navigate(['/hr']);
        break;
      case 'employee':
      case 'user':
        this.router.navigate(['/employee']);
        break;
    }
  }

  toggleLogin() {
    this.isLogin.update(v => !v);
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }
}
