import { Component, Input, ViewChild } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { PaginationService } from '../../../shared/services/pagination/pagination.service';
import { ScrollEvent } from '../../../shared/directives/scrollable/scrollable.directive';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['article-list.component.scss']
})

export class ArticleListComponent {

  @Input() articles: IArticle[];
  @Input() categories: ICategory[];
  @Input() users: IUser[];
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(public paginationService: PaginationService) {
  }

  ngOnInit() {
    this.paginationService.init('articles', 'articleDate', { reverse: true, prepend: false });
  }

  scrollHandler(event: ScrollEvent) {
    // console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      this.paginationService.more();
    }
    if (event.isReachingTop) {
      // console.log(`the user is reaching the bottom`);
    }
    if (event.isWindowEvent) {
      // console.log(`This event is fired on Window not on an element.`);
    }

  }

}
