import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailLinkComponent } from './detail-link/detail-link.component';
import { EditLinkComponent } from './edit-link/edit-link.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SeasonLinkComponent } from './season-link/season-link.component';
import { NgPipesModule } from 'ngx-pipes';
import { CategoryLinkComponent } from './category-link/category-link.component';

@NgModule({
  declarations: [
    DetailLinkComponent,
    EditLinkComponent,
    SeasonLinkComponent,
    CategoryLinkComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NgPipesModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    CategoryLinkComponent,
    DetailLinkComponent,
    EditLinkComponent,
    SeasonLinkComponent
  ]
})
export class LinkModule {
}
