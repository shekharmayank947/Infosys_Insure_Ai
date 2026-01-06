import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  get role(): 'hr' | 'employee' {
    const role = this.authService.userRole();
    return (role === 'hr' ? 'hr' : 'employee');
  }
}
