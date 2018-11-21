import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngaFileSelect]'
})
export class FileSelectDirective {

  @Output() selectedFiles = new EventEmitter<FileList>();

  constructor() {
  }

  @HostListener('change', ['$event'])
  onChange($event) {
    this.selectedFiles.emit($event.target.files);
  }

}
