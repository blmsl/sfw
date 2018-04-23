import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { ArticleService } from '../../../services/article/article.service';
import { Observable } from 'rxjs';
import { IArticle } from '../../../interfaces/article.interface';

@Component({
  selector: 'time-line-form',
  templateUrl: './time-line-form.component.html'
})
export class TimeLineFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedTimeLineEvent: number;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @ViewChild('text') text: QuillEditorComponent;

  public articles$: Observable<IArticle[]>;
  public colors = ['primary', 'warning', 'danger', 'success', 'info', 'none'];

  constructor(public articleService: ArticleService) {
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
  }

}
