import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { IArticle }                 from '../../../../../shared/interfaces/article.interface';
import { IMatch }                   from '../../../../../shared/interfaces/match/match.interface';
import { ActivatedRoute }           from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { ArticleService } from '../../../../../shared/services/article/article.service';

@Component({
  selector: 'match-edit-article-form',
  templateUrl: './match-edit-article-form.component.html',
  styleUrls: ['./match-edit-article-form.component.scss']
})
export class MatchEditArticleFormComponent implements OnInit {

  @Input() match: IMatch;
  @Input() notAssignedArticles: IArticle[];

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.form = this.fb.group({
      assignArticles: ''
    });
  }

  assignArticlesToMatch(){
    const assignedArticles: IArticle[] = this.form.get('assignArticles').value;
    this.articleService.assignMatchToArticles(this.match.id, assignedArticles);
    this.form.reset();
  }

}
