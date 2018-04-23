import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterListComponent } from './newsletter-list/newsletter-list.component';
import { newsletterRoutingModule } from './newsletter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    newsletterRoutingModule
  ],
  declarations: [
    NewsletterListComponent
  ]
})
export class NewsletterModule { }
