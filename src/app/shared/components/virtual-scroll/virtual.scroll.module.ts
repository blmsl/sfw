import { NgModule } from '@angular/core';
//import { ScrollingModule } from '@angular/cdk-experimental';
import { VirtualScrollComponent } from './virtual-scroll.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    // ScrollingModule
  ],
  declarations: [
    VirtualScrollComponent
  ],
  exports: [
    VirtualScrollComponent
  ]
})

export class VirtualScrollModule { }
