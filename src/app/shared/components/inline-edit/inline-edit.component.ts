import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: '[inline-edit]',
  templateUrl: './inline-edit.component.html',
  providers: [ INLINE_EDIT_CONTROL_VALUE_ACCESSOR ],
  styleUrls: [ './inline-edit.component.scss' ]
})

export class InlineEditComponent implements ControlValueAccessor, OnInit {

  @ViewChild('inlineEditControl') inlineEditControl: ElementRef;

  @Input() title: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  private _value: string = '';
  private preValue: string = '';
  public editing: boolean = false;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;


  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      console.log(v);
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(element: ElementRef, private _renderer: Renderer2) {
  }

  writeValue(value: any) {
    console.log(value);
    this._value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }


  onBlur() {
    this.editing = false;
  }

  edit(value) {
    if (this.disabled) {
      return;
    }

    this.preValue = value;
    this.editing = true;
    setTimeout(() => this._renderer.selectRootElement(this.inlineEditControl));
  }

  ngOnInit() {
  }
}
