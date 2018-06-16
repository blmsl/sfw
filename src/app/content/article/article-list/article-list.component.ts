import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { ScrollEvent } from '../../../shared/directives/scrollable/scrollable.directive';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginationService } from '../../../shared/services/pagination/pagination.service';

@Component({
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['article-list.component.scss']
})

export class ArticleListComponent {

  // @Input() articles: IArticle[];
  @Input() categories: ICategory[];
  @Input() users: IUser[];
  @Output() remove: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);
  @Output() update: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};
  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder, public paginationService: PaginationService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 10,
      categoryTypeControl: ''
    });

    this.paginationService.init(
      'categories',
      'title',
      {
        limit: 4,
        reverse: true,
        prepend: false
      }
    );
  }

  removeArticle(article: IArticle) {
    this.remove.emit(article);
    this.form.controls['searchFor'].reset();
  }

  scrollHandler(event: ScrollEvent) {
    console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      this.paginationService.more();
    }
    if (event.isReachingTop) {
      console.log(`the user is reaching the top`);
    }
    if (event.isWindowEvent) {
      console.log(`This event is fired on Window not on an element.`);
    }

  }

}
