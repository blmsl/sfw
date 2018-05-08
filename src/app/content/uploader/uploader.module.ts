import { NgModule }          from '@angular/core';
import { CommonModule }      from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { uploaderRoutes }    from './uploader-routing.module';
import { RouterModule }      from '@angular/router';
import { MediaModule }       from '../../shared/components/media/media.module';
import { SharedModule }      from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    RouterModule.forChild(uploaderRoutes),
    SharedModule
  ],
  declarations: [
    UploaderComponent
  ]
})
export class UploaderModule {
}
