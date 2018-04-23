import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-markdown-help',
  templateUrl: './markdown-help.component.html',
  styleUrls: ['./markdown-help.component.scss']
})
export class MarkdownHelpComponent {

  constructor(public dialogRef: MatDialogRef<MarkdownHelpComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
