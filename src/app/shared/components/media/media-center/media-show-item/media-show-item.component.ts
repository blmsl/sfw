import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MediaItemInfoComponent } from '../media-item-info/media-item-info.component';

@Component({
  selector: 'media-show-item',
  templateUrl: './media-show-item.component.html',
  styleUrls: ['./media-show-item.component.scss']
})
export class MediaShowItemComponent implements OnInit {

  @HostListener('keydown.esc')
  public onEsc() {
    this.onCloseClick();
  }

  constructor(public dialogRef: MatDialogRef<MediaItemInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseClick() {
    this.dialogRef.close();
  }

}
