import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticle } from '../../../../../shared/interfaces/article.interface';
import { IMatch } from '../../../../../shared/interfaces/match/match.interface';
import { ArticleService } from '../../../../../shared/services/article/article.service';

@Component({
  selector: 'match-edit-article-form',
  templateUrl: './match-edit-article-form.component.html',
  styleUrls: ['./match-edit-article-form.component.scss']
})
export class MatchEditArticleFormComponent implements OnInit {

  @Input() match: IMatch;
  @Input() articles: IArticle[];

  public form: FormGroup;

  constructor(private fb: FormBuilder,
    private articleService: ArticleService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignArticles: ['', [Validators.required]]
    });
  }

  assignArticlesToMatch() {
    const assignedArticles = this.form.get('assignArticles').value;
    this.articleService.assignMatchToArticles(this.match.id, assignedArticles);

  }

}
