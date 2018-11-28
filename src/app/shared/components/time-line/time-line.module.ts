import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeLineFormComponent } from './time-line-form/time-line-form.component';
import { TimeLineListComponent } from './time-line-list/time-line-list.component';
import { TimeLineGraphHorizontalComponent } from './time-line-graph-horizontal/time-line-graph-horizontal.component';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatNativeDateModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { ArticleService } from '../../services/article/article.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    TimeLineFormComponent,
    TimeLineGraphHorizontalComponent,
    TimeLineListComponent
  ],
  exports: [
    TimeLineFormComponent,
    TimeLineGraphHorizontalComponent,
    TimeLineListComponent
  ],
  providers: [
    ArticleService
  ]
})
export class TimeLineModule {
}
