import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'member-edit-interviews',
  templateUrl: './member-edit-interviews.component.html',
  styleUrls: ['./member-edit-interviews.component.scss']
})
export class MemberEditInterviewsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() articles: IArticle[];

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);

  public showForm: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  addEntry() {
    this.showForm = true;
    this.add.emit(true);
  }

}
