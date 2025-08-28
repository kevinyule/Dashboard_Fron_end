import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard'),
      },
      {
        path: 'profile',
        loadComponent: () => import('./business/profile/profile'),
      },
      {
        path: 'tables',
        loadComponent: () => import('./business/tables/tables'),
      },
      {
        path: 'charts',
        loadComponent: () => import('./shared/components/charts/charts'),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];
