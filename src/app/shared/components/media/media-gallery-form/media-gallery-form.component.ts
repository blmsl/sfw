import {
  Component,
  Input
}                           from '@angular/core';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';

@Component({
  selector: 'media-gallery-form',
  templateUrl: './media-gallery-form.component.html'
})
export class MediaGalleryFormComponent {

  @Input() uploaderOptions: IUploaderOptions;
  /* @Input() assignedItem: string;
  @Input() assignedItemType: string;

  @Output() toggleGalleryForm = new EventEmitter(false);

  public form: FormGroup;

  // public gallery: IMediaGallery;

  constructor(// private mediaGalleryService: MediaGalleryService,
    private authService: AuthService) {
  }

  ngOnInit() {
    /*this.gallery = {
     title: '',
     assignedItem: this.assignedItem,
     assignedItemType: this.assignedItemType,
     creation: this.authService.getCreation()
     };

    this.form = new FormGroup({
      title: new FormControl('')
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      console.log(changes);
    });
  }

  saveMediaGallery() {
    /* this.mediaGalleryService.createMediaGallery(this.gallery).then(
     () => {
     this.form.reset();
     this.toggleGalleryForm.emit(true);
     },
     (error: any) => console.log(error)
     );
  } */

}
