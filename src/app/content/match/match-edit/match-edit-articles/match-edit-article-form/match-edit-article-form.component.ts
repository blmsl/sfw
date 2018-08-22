import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
}                                   from '@angular/forms';
import { IArticle }                 from '../../../../../shared/interfaces/article.interface';
import { IMatch }                   from '../../../../../shared/interfaces/match/match.interface';
import { ActivatedRoute }           from '@angular/router';

@Component({
  selector: 'match-edit-article-form',
  templateUrl: './match-edit-article-form.component.html',
  styleUrls: ['./match-edit-article-form.component.scss']
})
export class MatchEditArticleFormComponent implements OnInit {

  @Input() articles: IArticle[];

  public form: FormGroup;
  @Input() match: IMatch;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      assignedArticles: ''
    });
  }

  compareFn(article: IArticle){
    console.log(article.assignedMatches);
    console.log(this.match.id);
  }
  //[selected]="article.assignedMatches.indexOf(article.id) > 0"

  /*save($event) {
    console.log($event);
  }*/
}
