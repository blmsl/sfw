import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { IArticle } from '../../../../../shared/interfaces/article.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'club-honorary-list',
  templateUrl: './club-honorary-list.component.html',
  styleUrls: ['./club-honorary-list.component.scss']
})
export class ClubHonoraryListComponent implements OnInit {

  @Input() members: IMember[];
  @Input() form: FormGroup;
  @Input() articles: IArticle[];

  @Output() edit: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
