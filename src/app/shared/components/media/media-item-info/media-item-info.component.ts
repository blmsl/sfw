import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-media-item-info',
  templateUrl: './media-item-info.component.html',
  styleUrls: ['./media-item-info.component.scss']
})
export class MediaItemInfoComponent implements OnInit {

  public form: FormGroup;
  public moment: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<MediaItemInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.moment = moment;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.mediaItem.file.name, [Validators.required]],
      description: this.data.mediaItem.description || '',
      fileCredits: this.data.mediaItem.fileCredits || ''
    });

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(({ description, fileCredits, name }) => {
      if (this.form.valid) {
        this.data.mediaItem = Object.assign({}, this.data.mediaItem, { description }, { fileCredits }, { file: { ...this.data.mediaItem.file, name } });
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
