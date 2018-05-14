import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';

@Component({
  selector: 'app-media-item-info',
  templateUrl: './media-item-info.component.html',
  styleUrls: ['./media-item-info.component.scss']
})
export class MediaItemInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MediaItemInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
