import { NgModule } from '@angular/core';
import { ArticleCardComponent } from './article-card/article-card.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import {
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ArticleCardComponent
  ],
  exports: [
    ArticleCardComponent
  ],
  providers: []
})
export class SharedArticleModule {
}
