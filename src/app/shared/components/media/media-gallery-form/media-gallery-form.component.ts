import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';

@Component({
  selector: 'media-gallery-form',
  templateUrl: './media-gallery-form.component.html'
})
export class MediaGalleryFormComponent {

  // @Input() uploaderOptions: IUploaderOptions;
  public form: FormGroup;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private mediaGalleryService: MediaGalleryService,
              public dialogRef: MatDialogRef<MediaGalleryFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      description: '',
      creation: this.fb.group({
        by: ''
      })
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveMediaGallery() {
    this.isLoading = true;
    this.mediaGalleryService.createMediaGallery(this.form.getRawValue())
      .then(() => {
          this.form.reset();
          this.closeDialog();
          this.showStatusMessage('success', '');
          this.isLoading = false;
        }
      )
      .catch((error: any) => {
          this.closeDialog();
          this.showStatusMessage('error', error.message);
          this.isLoading = false;
        }
      )
  }

  showStatusMessage(status: string, message: string) {
    console.log(status);
    console.log(message);
  }

}
