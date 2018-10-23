import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { IUser } from '../../../../shared/interfaces/user/user.interface';
import { UserService } from '../../../../shared/services/user/user.service';
import { Observable } from 'rxjs/index';
import { ArticleService } from '../../../../shared/services/article/article.service';

@Component({
  selector: 'article-list-filter',
  templateUrl: './article-list-filter.component.html',
  styleUrls: ['./article-list-filter.component.scss']
})
export class ArticleListFilterComponent implements OnInit {

  public users$: Observable<IUser[]>;
  public form: FormGroup;

  public publicationStatuses: {
    value: number,
    title: string
  }[];

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private articleService: ArticleService) {
    this.users$ = userService.users$;
    this.publicationStatuses = articleService.publicationStatuses;
  }

  ngOnInit() {
    this.form = this.fb.group({
      publication: [''],
      by: [''],
      assignedTags: [''],
      sorting: ['desc']
    });
  }

}
