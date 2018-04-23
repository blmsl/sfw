import { Routes } from '@angular/router';
import { UploaderComponent } from './uploader.component';

export const uploaderRoutes: Routes = [
  {
    path: '',
    component: UploaderComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
