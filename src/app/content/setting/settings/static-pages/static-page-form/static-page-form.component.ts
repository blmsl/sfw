import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from '../../../../../shared/interfaces/category.interface';

@Component({
  selector: 'static-page-form',
  templateUrl: './static-page-form.component.html',
  styleUrls: ['./static-page-form.component.scss']
})
export class StaticPageFormComponent implements OnInit, OnChanges {

  @Input() form: FormGroup;
  @Input() selectedStaticPage: number;
  @Input() categories: ICategory[];

  public titleMaxLength: number = 100;

  constructor(private cdRef:ChangeDetectorRef) {
  }

  ngOnInit(){
    console.log(this.form);
  }

  ngOnChanges(changes: SimpleChanges){
    this.cdRef.detectChanges();
  }

}
