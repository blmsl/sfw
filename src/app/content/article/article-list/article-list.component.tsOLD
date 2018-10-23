import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FormGroup } from '@angular/forms';
import { PaginationService } from '../../../shared/services/pagination/pagination.service';

@Component({
  selector: 'article-list',
  templateUrl: 'article-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['article-list.component.scss']
})

export class ArticleListComponent implements OnInit {

  @Input() categories: ICategory[];
  @Input() users: IUser[];
  @Input() filters: {
    author: string,
    sorting: string,
    status: number,
    tags: string[]
  };
  @Output() remove: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);
  @Output() update: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};
  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];
  public isLoading: boolean = false;

  constructor(public paginationService: PaginationService) {
  }

  ngOnInit() {
    this.paginationService.init(
      'articles',
      'creation.at',
      {
        limit: 10,
        reverse: true,
        prepend: false
      }
    );

    this.paginationService.loading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  onScroll() {
    this.paginationService.more();
  }
}
