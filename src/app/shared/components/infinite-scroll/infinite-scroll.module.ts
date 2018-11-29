import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { MatIconModule } from '@angular/material';
import { LinkModule } from '../links/link.module';

@NgModule({
  declarations: [
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    LinkModule,
    MatIconModule,
    NgPipesModule,
    RouterModule,
    ScrollingModule,
    TranslateModule
  ],
  exports: [
    InfiniteScrollComponent
  ]
})
export class InfiniteScrollModule {
}
