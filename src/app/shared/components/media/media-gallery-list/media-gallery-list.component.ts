import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
}                                    from '@angular/core';
import { IMediaGallery }             from '../../../interfaces/media/media-gallery.interface';
import { MatDialog }                 from '@angular/material';
import { MediaGalleryFormComponent } from '../media-gallery-form/media-gallery-form.component';

@Component({
  selector: 'media-gallery-list',
  templateUrl: './media-gallery-list.component.html',
  styleUrls: ['media-gallery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaGalleryListComponent implements OnInit {

  @Input() mediaGalleries: IMediaGallery[];

  ngOnInit() {
  }

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MediaGalleryFormComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
