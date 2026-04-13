import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(user => {

      if (!user) {
        return router.createUrlTree(
          ['/account/login'],
          { queryParams: { returnUrl: state.url } }
        );
      }

      const allowedRoles = route.data?.['roles'] as string[];

      if (!allowedRoles || allowedRoles.length === 0) {
        return true;
      }

      const hasRole = user.roles.some(
        (r: string) => allowedRoles.includes(r)
      );

      return hasRole
        ? true
        : router.createUrlTree(['/account/login']);
    }),
    catchError(() => of(false)) 
  );
};