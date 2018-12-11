import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { LinkModule } from '../links/link.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LinkModule,
    MatButtonModule,
    MatCardModule,
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
