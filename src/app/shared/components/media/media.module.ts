import { NgModule }                 from '@angular/core';
import { TranslateModule }          from '@ngx-translate/core';
import { CommonModule }             from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatProgressBarModule,
  MatTabsModule
}                                   from '@angular/material';
import { MediaCenterComponent }     from './media-center/media-center.component';
import { MediaUploaderService }     from '../../services/media/media-uploader.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FlexLayoutModule }         from '@angular/flex-layout';
import { MediaItemService }         from '../../services/media/media-item.service';
import { MediaUploaderComponent }   from './media-uploader/media-uploader.component';
import { DropZoneDirective }        from '../../directives/media/drop-zone.directive';
import { FileSelectDirective }      from '../../directives/media/file-select.directive';
import { FileSizePipe }             from '../../pipes/file-size.pipe';
import { MediaGalleryComponent }    from './media-gallery/media-gallery.component';
import { MediaGalleryItemComponent } from './media-gallery/media-gallery-item/media-gallery-item.component';
import { MediaGalleryFormComponent } from './media-gallery-form/media-gallery-form.component';
import { MediaGalleryListComponent } from './media-gallery-list/media-gallery-list.component';

@NgModule({
  imports: [
    MatProgressBarModule,
    AngularFireStorageModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    // MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    // MatSnackBarModule,
    MatTabsModule,
    // NgPipesModule,
    TranslateModule
  ],
  declarations: [
    MediaCenterComponent,
    MediaGalleryFormComponent,
    MediaGalleryItemComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent,
    MediaGalleryComponent,
    DropZoneDirective,
    FileSelectDirective,
    FileSizePipe
  ],
  exports: [
    MediaCenterComponent,
    MediaGalleryComponent,
    MediaGalleryFormComponent,
    MediaGalleryItemComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent
  ],
  providers: [
    MediaUploaderService,
    MediaItemService
  ]
})

export class MediaModule {
}
