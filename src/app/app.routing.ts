import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './layouts/main/main.module#MainModule'
  }
];
