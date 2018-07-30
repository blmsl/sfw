import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IInterview } from '../../../../shared/interfaces/member/interview.interface';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { Observable } from 'rxjs';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'member-edit-interviews',
  templateUrl: './member-edit-interviews.component.html',
  styleUrls: ['./member-edit-interviews.component.scss']
})
export class MemberEditInterviewsComponent implements OnInit {

  @Input() form: FormGroup;

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);

  public articles$: Observable<IArticle[]>;
  public showForm: boolean = false;

  constructor(private articleService: ArticleService) {
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
  }

  addEntry() {
    this.showForm = true;
    this.add.emit(true);
  }

}
