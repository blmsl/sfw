import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailLinkComponent } from './detail-link/detail-link.component';
import { EditLinkComponent } from './edit-link/edit-link.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailLinkComponent,
    EditLinkComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    DetailLinkComponent,
    EditLinkComponent
  ]
})
export class LinkModule {
}
