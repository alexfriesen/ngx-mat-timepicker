import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/demo/demo.component').then((m) => m.DemoComponent),
  },
];
