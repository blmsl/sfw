import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MediaCenterComponent } from './media-center/media-center.component';
import { MediaUploaderService } from '../../services/media/media-uploader.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MediaItemService } from '../../services/media/media-item.service';
import { MediaUploaderComponent } from './media-uploader/media-uploader.component';
import { DropZoneDirective } from '../../directives/media/drop-zone.directive';
import { FileSelectDirective } from '../../directives/media/file-select.directive';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { MediaGalleryListComponent } from './media-gallery-list/media-gallery-list.component';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';
import { InlineEditModule } from '../inline-edit/inline-edit.module';
import { MediaItemInfoComponent } from './media-item-info/media-item-info.component';
import { MediaGalleriesComponent } from './media-galleries/media-galleries.component';
import {
  NgPipesModule,
  OrderByPipe
} from 'ngx-pipes';
import { MediaGalleryService } from '../../services/media/media-gallery.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaAvatarComponent } from './media-avatar/media-avatar.component';
import { MediaGalleryFormComponent } from './media-gallery-form/media-gallery-form.component';
import { MediaGalleryFormAssignedObjectsComponent } from './media-gallery-form/media-gallery-form-assigned-objects/media-gallery-form-assigned-objects.component';
import { ArticleService } from '../../services/article/article.service';
import { ClubService } from '../../services/club/club.service';
import { LocationService } from '../../services/location/location.service';
import { MatchService } from '../../services/match/match.service';
import { MemberService } from '../../services/member/member.service';
import { SponsorService } from '../../services/sponsor/sponsor.service';
import { TeamService } from '../../services/team/team.service';
import { SeasonService } from '../../services/season/season.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MediaGalleryItemComponent } from './media-gallery-item/media-gallery-item.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MediaItemsListModalComponent } from './media-gallery-form/media-items-list-modal/media-items-list-modal.component';
import { RouterModule } from '@angular/router';
import { StopPropagationDirective } from '../../directives/stop-propagation/stop-propagation.directive';

@NgModule({
  imports: [
    DragDropModule,
    MatExpansionModule,
    MatProgressBarModule,
    AngularFireStorageModule,
    CommonModule,
    InlineEditModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    LoadingIndicatorModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
    MediaAvatarComponent,
    MediaCenterComponent,
    MediaGalleryFormComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent,
    DropZoneDirective,
    FileSelectDirective,
    FileSizePipe,
    MediaItemInfoComponent,
    MediaGalleriesComponent,
    MediaGalleryFormAssignedObjectsComponent,
    MediaGalleryItemComponent,
    MediaItemsListModalComponent,
    StopPropagationDirective
  ],
  exports: [
    MediaAvatarComponent,
    MediaCenterComponent,
    MediaGalleryFormComponent,
    MediaGalleryListComponent,
    MediaUploaderComponent
  ],
  entryComponents: [
    MediaGalleryListComponent,
    MediaItemInfoComponent,
    MediaItemsListModalComponent
  ],
  providers: [
    OrderByPipe,
    ArticleService,
    ClubService,
    LocationService,
    MatchService,
    MemberService,
    SponsorService,
    SeasonService,
    TeamService,
    MediaGalleryService,
    MediaUploaderService,
    MediaItemService
  ]
})

export class MediaModule {
}
