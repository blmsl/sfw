import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IArticle } from '../../../../../shared/interfaces/article.interface';

@Component({
  selector: 'match-edit-article-form',
  templateUrl: './match-edit-article-form.component.html',
  styleUrls: ['./match-edit-article-form.component.scss']
})
export class MatchEditArticleFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() articles: IArticle[];

  constructor() { }

  ngOnInit() {
  }

}
