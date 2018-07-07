import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from '../../../../../shared/interfaces/category.interface';

@Component({
  selector: 'static-page-form',
  templateUrl: './static-page-form.component.html',
  styleUrls: ['./static-page-form.component.scss']
})
export class StaticPageFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedStaticPage: number;
  @Input() categories: ICategory[];

  public titleMaxLength: number = 100;

  constructor() {
  }

  ngOnInit(){
  }

}
