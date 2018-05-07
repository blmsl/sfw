import { NgModule } from "@angular/core";
import { FileSizePipe } from "src/app/shared/pipes/file-size.pipe";
import { FileSelectDirective } from "src/app/shared/directives/media/file-select.directive";
import { DropZoneDirective } from "src/app/shared/directives/media/drop-zone.directive";
import { MediaUploaderComponent } from "src/app/shared/components/media/media-uploader/media-uploader.component";
import { MediaUploaderService } from "src/app/shared/services/media/media-uploader.service";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { AngularFireStorageModule } from "angularfire2/storage";
import { MediaItemService } from "src/app/shared/services/media/media-item.service";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    AngularFireStorageModule
  ],
  exports: [
    MediaUploaderComponent
  ],
  declarations: [
    DropZoneDirective,
    FileSelectDirective,
    FileSizePipe,
    MediaUploaderComponent
  ],
  providers: [
    MediaUploaderService,
    MediaItemService
  ]
})

export class MediaUploaderModule {

}
