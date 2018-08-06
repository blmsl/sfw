import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { Observable } from 'rxjs/index';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'club-timeline',
  templateUrl: './club-timeline.component.html',
  styleUrls: ['./club-timeline.component.scss']
})
export class ClubTimelineComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedTimeLineEvent: number;

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() edit: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  public articles$: Observable<IArticle[]>;

  constructor(private articleService: ArticleService) {
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
  }

}
