import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../../../../shared/interfaces/user/user.interface';
import { ArticleService } from '../../../../shared/services/article/article.service';

@Component({
  selector: 'article-list-filter',
  templateUrl: './article-list-filter.component.html',
  styleUrls: ['./article-list-filter.component.scss']
})
export class ArticleListFilterComponent implements OnInit {

  public form: FormGroup;

  @Input() users: IUser[];

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      author: '',
      status: '',
      tags: '',
      sorting: '-'
    });
  }

}
