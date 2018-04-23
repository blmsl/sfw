import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NewsletterListComponent } from './newsletter-list/newsletter-list.component';

export const routes: Routes = [
  {
    path: '',
    component: NewsletterListComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const newsletterRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
