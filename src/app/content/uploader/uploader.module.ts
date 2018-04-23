import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { uploaderRoutes } from './uploader-routing.module';
import { RouterModule } from '@angular/router';
import { MediaModule } from '../../shared/components/media/media.module';
import { MatCardModule, MatIconModule, MatTabsModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    RouterModule.forChild(uploaderRoutes)
  ],
  declarations: [
    UploaderComponent
  ]
})
export class UploaderModule { }
