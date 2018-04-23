import { NgModule } from '@angular/core';
import { MediaUploaderComponent } from './media-uploader/media-uploader.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatProgressBarModule,
  MatSnackBarModule, MatTabsModule
} from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';
import { MediaCenterComponent } from './media-center/media-center.component';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { MediaGalleryFormComponent } from './media-gallery-form/media-gallery-form.component';
import { MediaGalleryItemComponent } from './media-gallery-item/media-gallery-item.component';
import { MediaGalleryListComponent } from './media-gallery-list/media-gallery-list.component';
import { MediaUploaderService } from '../../services/media/media-uploader.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MediaUploadFormComponent } from './media-uploader/media-upload-form/media-upload-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgPipesModule } from 'ngx-pipes';
import { MediaItemService } from '../../services/media/media-item.service';
import { DropZoneDirective } from '../../directives/media/drop-zone.directive';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { FileSelectDirective } from '../../directives/media/file-select.directive';

@NgModule({
  imports: [
    AngularFireStorageModule,
    CommonModule,
    FileUploadModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    DropZoneDirective,
    FileSelectDirective,
    FileSizePipe,
    MediaCenterComponent,
    MediaGalleryComponent,
    MediaGalleryFormComponent,
    MediaGalleryItemComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent,
    MediaUploadFormComponent
  ],
  exports: [
    MediaCenterComponent,
    MediaUploaderComponent
  ],
  providers: [
    MediaItemService,
    MediaUploaderService
  ]
})

export class MediaModule {
}
