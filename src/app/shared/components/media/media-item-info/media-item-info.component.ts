import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-media-item-info',
  templateUrl: './media-item-info.component.html',
  styleUrls: ['./media-item-info.component.scss']
})
export class MediaItemInfoComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<MediaItemInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.mediaItem.file.name, [Validators.required]],
      description: this.data.mediaItem.description || '',
    });

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(({ description, name }) => {
      if (this.form.valid) {
        this.data.mediaItem = Object.assign({}, this.data.mediaItem, { description }, { file: { ...this.data.mediaItem.file, name } });
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
