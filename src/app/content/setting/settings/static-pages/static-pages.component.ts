import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormGroup } from '@angular/forms';
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

  @Input() form: FormGroup;
  @Input() application: IApplication;
  @Input() selectedStaticPage: number;

  @Output() removeStaticPage: EventEmitter<number> = new EventEmitter(false);
  @Output() addStaticPage: EventEmitter<boolean> = new EventEmitter(false);
  @Output() setSelectedStaticPage: EventEmitter<number> = new EventEmitter(false);

  public config: PerfectScrollbarConfigInterface = {};
  public categories$: Observable<ICategory[]>;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('static.types');
  }

  ngOnInit() {
  }

  setSelectedStaticPageData(i: number) {
    this.setSelectedStaticPage.emit(i);
  }
}
