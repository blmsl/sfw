import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { NewsletterListComponent } from './newsletter-list/newsletter-list.component';
import { newsletterRoutingModule } from './newsletter-routing.module';
import {
  MatCardModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    newsletterRoutingModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    NewsletterListComponent
  ]
})
export class NewsletterModule { }
