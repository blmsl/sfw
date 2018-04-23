import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'calendar-dialog',
  templateUrl: './calendar-dialog.component.html'
})

export class CalendarDialogComponent {

  constructor(public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
