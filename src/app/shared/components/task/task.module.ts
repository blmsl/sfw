import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { NgPipesModule } from 'ngx-pipes';
import { TaskService } from '../../services/task/task.service';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  exports: [
    TasksComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  providers: [
    TaskService
  ]
})
export class TaskModule { }
