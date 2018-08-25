import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormGroup,
  Validators
} from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-edit-other-opinions',
  templateUrl: './member-edit-other-opinions.component.html',
  styleUrls: ['./member-edit-other-opinions.component.scss']
})
export class MemberEditOtherOpinionsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() members: IMember[];

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);

  @Output() setOpinionValidators: EventEmitter<{ i: number, type: string }> = new EventEmitter<{ i: number, type: string }>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
