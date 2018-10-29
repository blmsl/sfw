import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { uploaderRoutes } from './uploader-routing.module';
import { RouterModule } from '@angular/router';
import { MediaModule } from '../../shared/components/media/media.module';
import { SharedModule } from '../../shared/shared.module';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { MediaGalleryService } from '../../shared/services/media/media-gallery.service';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    RouterModule.forChild(uploaderRoutes),
    SharedModule
  ],
  declarations: [
    UploaderComponent,
    GalleryListComponent,
    GalleryEditComponent
  ],
  providers: [
    MediaGalleryService
  ]
})
export class UploaderModule {
}
