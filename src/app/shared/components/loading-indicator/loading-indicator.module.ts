import { NgModule } from '@angular/core';
import { MediaUploaderService } from '../../services/media/media-uploader.service';
import { MediaItemService } from '../../services/media/media-item.service';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    MatProgressSpinnerModule
  ],
  declarations: [
    LoadingIndicatorComponent
  ],
  exports: [
    LoadingIndicatorComponent
  ],
  providers: [
    MediaUploaderService,
    MediaItemService
  ]
})

export class LoadingIndicatorModule {
}
