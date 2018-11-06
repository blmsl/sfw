import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    TranslateModule
  ],
  exports: [
    InfiniteScrollComponent
  ]
})
export class InfiniteScrollModule {
}
