import { NgModule }                 from '@angular/core';
import { TranslateModule }          from '@ngx-translate/core';
import { CommonModule }             from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MediaCenterComponent }     from './media-center/media-center.component';
import { MediaUploaderService }     from '../../services/media/media-uploader.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FlexLayoutModule }         from '@angular/flex-layout';
import { MediaItemService }         from '../../services/media/media-item.service';
import { MediaUploaderComponent }   from './media-uploader/media-uploader.component';
import { DropZoneDirective }        from '../../directives/media/drop-zone.directive';
import { FileSelectDirective }       from '../../directives/media/file-select.directive';
import { FileSizePipe }              from '../../pipes/file-size.pipe';
import { MediaGalleryComponent }     from './media-gallery/media-gallery.component';
import { MediaGalleryFormComponent } from './media-gallery-form/media-gallery-form.component';
import { MediaGalleryListComponent } from './media-gallery-list/media-gallery-list.component';
import { LoadingIndicatorModule }    from '../loading-indicator/loading-indicator.module';
import { InlineEditModule }          from '../inline-edit/inline-edit.module';
import { MediaItemInfoComponent } from './media-item-info/media-item-info.component';

@NgModule({
  imports: [
    MatProgressBarModule,
    AngularFireStorageModule,
    CommonModule,
    InlineEditModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    LoadingIndicatorModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTabsModule,
    TranslateModule
  ],
  declarations: [
    MediaCenterComponent,
    MediaGalleryFormComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent,
    MediaGalleryComponent,
    DropZoneDirective,
    FileSelectDirective,
    FileSizePipe,
    MediaItemInfoComponent
  ],
  exports: [
    MediaCenterComponent,
    MediaGalleryComponent,
    MediaGalleryFormComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent
  ],
  entryComponents: [
    MediaItemInfoComponent
  ],
  providers: [
    MediaUploaderService,
    MediaItemService
  ]
})

export class MediaModule {
}
