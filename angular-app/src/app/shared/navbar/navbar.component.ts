import { Component, inject, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Bell } from 'lucide-angular';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProfileDropdownComponent],
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  showNotifications = signal(false);
  
  // Icons
  readonly SearchIcon = Search;
  readonly BellIcon = Bell;

  notifications = [
    { id: 1, title: 'New policy uploaded', time: '5 min ago', unread: true },
    { id: 2, title: 'Compliance check completed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Policy renewal reminder', time: '2 hours ago', unread: false },
  ];

  private elementRef = inject(ElementRef);

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.elementRef.nativeElement.querySelector('.notifications-dropdown')?.contains(event.target)) {
      this.showNotifications.set(false);
    }
  }

  toggleNotifications() {
    this.showNotifications.update(v => !v);
  }
}
