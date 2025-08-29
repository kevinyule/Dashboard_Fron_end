import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { authenticatedGuard } from './core/guards/authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard'),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./business/profile/profile'),
        canActivate: [authGuard]
      },
      {
        path: 'tables',
        loadComponent: () => import('./business/tables/tables'),
        canActivate: [authGuard]
      },
      {
        path: 'charts',
        loadComponent: () => import('./shared/components/charts/charts'),
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
      {
        path: 'login',
        loadComponent: () => import('./business/authentication/login/login'),
        canActivate: [authenticatedGuard]
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
];
