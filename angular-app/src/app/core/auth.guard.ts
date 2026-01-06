import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  const allowedRole = route.data['role'];
  if (allowedRole && !authService.hasRole(allowedRole)) {
    const currentRole = authService.userRole();
    router.navigate([currentRole === 'hr' ? '/hr' : '/employee']);
    return false;
  }

  return true;
};
