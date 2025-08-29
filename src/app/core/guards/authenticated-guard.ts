import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  // return true;
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.navigate(['/dashboard']);
  } else {
    return true;
  }

};
