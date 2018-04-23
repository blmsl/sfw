import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * Directive to add validation when clicked on Submit Button
 * usage: <button (submitIfValid)="send()">Save</button>
 */

@Directive({
  selector: '[submitIfValid]'
})
export class SubmitIfValidDirective {

  @Output('submitIfValid') valid = new EventEmitter<void>();

  constructor(private formRef: NgForm) {

  }

  @HostListener('click')
  handleClick() {
    this.markFieldsAsDirty();
    this.emitIfValid();
  }

  private markFieldsAsDirty() {
    Object.keys(this.formRef.controls)
      .forEach((fieldName: string) => {
        this.formRef.controls[fieldName].markAsDirty()
      }
      );
  }

  private emitIfValid() {
    if (this.formRef.valid) {
      this.valid.emit();
    }
  }

}
