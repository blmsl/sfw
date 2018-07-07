import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { IApplication } from '../../../../shared/interfaces/application.interface';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: ['static-pages.component.scss']
})
export class StaticPagesComponent implements OnInit {

  @Input() form: FormArray;
  @Input() application: IApplication;
  @Input() selectedStaticPage: number;

  @Output() removeStaticPage: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() addStaticPage: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() setSelectedStaticPage: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>(false);

  public categories$: Observable<ICategory[]>;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('static.types');
  }

  ngOnInit() {
  }
}
