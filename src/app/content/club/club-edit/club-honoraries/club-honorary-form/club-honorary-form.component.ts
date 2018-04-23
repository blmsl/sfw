import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { FormGroup } from '@angular/forms';
import { IArticle } from '../../../../../shared/interfaces/article.interface';

@Component({
  selector: 'club-honorary-form',
  templateUrl: './club-honorary-form.component.html',
  styleUrls: ['./club-honorary-form.component.scss']
})
export class ClubHonoraryFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedHonorary: number;
  @Input() members: IMember[];
  @Input() articles: IArticle[];

  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

}
