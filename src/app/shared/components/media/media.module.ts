import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MediaCenterComponent } from './media-center/media-center.component';
import { MediaUploaderService } from '../../services/media/media-uploader.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MediaItemService } from '../../services/media/media-item.service';
import { MediaUploaderComponent } from './media-uploader/media-uploader.component';
import { DropZoneDirective } from '../../directives/media/drop-zone.directive';
import { FileSelectDirective } from '../../directives/media/file-select.directive';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { MediaGalleryListComponent } from './media-gallery-list/media-gallery-list.component';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';
import { InlineEditModule } from '../inline-edit/inline-edit.module';
import { MediaItemInfoComponent } from './media-item-info/media-item-info.component';
import { MediaGalleriesComponent } from './media-galleries/media-galleries.component';
import { NgPipesModule } from 'ngx-pipes';
import { MediaGalleryService } from '../../services/media/media-gallery.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaAvatarComponent } from './media-avatar/media-avatar.component';

@NgModule({
  imports: [
    MatProgressBarModule,
    AngularFireStorageModule,
    CommonModule,
    InlineEditModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    LoadingIndicatorModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    MediaAvatarComponent,
    MediaCenterComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent,
    MediaGalleryComponent,
    DropZoneDirective,
    FileSelectDirective,
    FileSizePipe,
    MediaItemInfoComponent,
    MediaGalleriesComponent
  ],
  exports: [
    MediaAvatarComponent,
    MediaCenterComponent,
    MediaGalleryComponent,
    // MediaGalleryFormComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent
  ],
  entryComponents: [
    MediaGalleryListComponent,
    MediaItemInfoComponent,
    // MediaGalleryFormComponent
  ],
  providers: [
    MediaGalleryService,
    MediaUploaderService,
    MediaItemService
  ]
})

export class MediaModule {
}
