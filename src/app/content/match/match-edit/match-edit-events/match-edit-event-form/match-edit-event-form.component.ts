import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IMatchEvent } from '../../../../../shared/interfaces/match/match-event.interface';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { ITeam } from '../../../../../shared/interfaces/team/team.interface';
import { Observable } from 'rxjs/index';
import { MemberService } from '../../../../../shared/services/member/member.service';
import { IMatchEventCategory } from '../../../../../shared/interfaces/match/match-event-category.interface';
import { IMatch } from '../../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-edit-event-form',
  templateUrl: './match-edit-event-form.component.html',
  styleUrls: ['./match-edit-event-form.component.scss']
})
export class MatchEditEventFormComponent implements OnInit {

  @Input() eventCategories: IMatchEventCategory[];
  @Input() assignedTeam: ITeam;
  @Input() match: IMatch;
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  public form: FormGroup;
  public assignedPlayers$: Observable<IMember[]>;

  constructor(private fb: FormBuilder,
    private memberService: MemberService) {
  }

  ngOnInit() {
    this.assignedPlayers$ = this.memberService.getMembersByIds(this.assignedTeam.assignedPlayers);

    this.form = this.fb.group({
      assignedCategory: null,
      description: ['', [Validators.required, Validators.minLength(5)]],
      playMinute: null,
      title: '',
      playerOne: '',
      playerTwo: ''
    });
  }

  saveEvent(matchEvent: IMatchEvent) {
    matchEvent.ordering = this.match.assignedMatchEvents ? this.match.assignedMatchEvents.length : 0;
    if (this.match.assignedMatchEvents) {
      this.match.assignedMatchEvents.push(matchEvent);
    } else {
      this.match.assignedMatchEvents = [matchEvent];
    }
    this.saveMatch.emit(this.match);
    this.form.reset();
  }

}
