import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { Observable } from 'rxjs/index';
import { ICategory } from '../../../interfaces/category.interface';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'category-link',
  templateUrl: './category-link.component.html',
  styleUrls: ['./category-link.component.scss']
})
export class CategoryLinkComponent implements OnInit {

  @Input() categoryIds: string[];

  public categories$: Observable<ICategory>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategoriesByIds(this.categoryIds)
  }

}
