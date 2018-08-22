import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                        from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                        from '@angular/forms';
import { ICategory }     from '../../../../../shared/interfaces/category.interface';
import { IMatchEvent }   from '../../../../../shared/interfaces/match/match-event.interface';
import { ICategoryType } from '../../../../../shared/interfaces/category-type.interface';
import { IMember }       from '../../../../../shared/interfaces/member/member.interface';
import { ITeam }         from '../../../../../shared/interfaces/team/team.interface';
import { Observable }    from 'rxjs/index';
import { MemberService } from '../../../../../shared/services/member/member.service';

@Component({
  selector: 'match-edit-event-form',
  templateUrl: './match-edit-event-form.component.html',
  styleUrls: ['./match-edit-event-form.component.scss']
})
export class MatchEditEventFormComponent implements OnInit {

  @Input() eventCategories: ICategory[];
  @Input() assignedTeam: ITeam;
  @Output() saveMatchEvent: EventEmitter<IMatchEvent> = new EventEmitter<IMatchEvent>(false);

  public form: FormGroup;
  public assignedPlayers: Observable<IMember[]>;

  constructor(private fb: FormBuilder,
              private memberService: MemberService) {
    this.assignedPlayers = this.memberService.getMembersByIds(this.assignedTeam.assignedPlayers);
  }

  ngOnInit() {

    this.form = this.fb.group({
      assignedCategory: null,
      description: ['', [Validators.required, Validators.minLength(5)]],
      playMinute: null,
      title: '',
      playerOne: '',
      playerTwo: ''
    });
  }


  save($event) {
    this.saveMatchEvent.emit($event);
    this.form.reset();
  }

  cancel() {
    this.form.reset();
  }

}
