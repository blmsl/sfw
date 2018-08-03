import {
  Component,
  Input,
  OnInit
}                        from '@angular/core';
import {
  FormBuilder,
  FormGroup
}                        from '@angular/forms';
import { IFormation }    from '../../../../shared/interfaces/match/formation.interface';
import { MatchService }  from '../../../../shared/services/match/match.service';
import { ITeam }         from '../../../../shared/interfaces/team/team.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Observable }    from 'rxjs/Rx';
import { IMember }       from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-edit-starting-eleven',
  templateUrl: './match-edit-starting-eleven.component.html',
  styleUrls: ['./match-edit-starting-eleven.component.scss']
})
export class MatchEditStartingElevenComponent implements OnInit {

  @Input() team: ITeam;
  @Input() form: FormGroup;

  public tacticalFormations: IFormation[];
  public members$ : Observable<IMember[]>;

  constructor(private fb: FormBuilder,
              private matchService: MatchService,
              private memberService: MemberService) {
    this.members$ = memberService.members$;
    this.tacticalFormations = matchService.getFormations();
  }

  ngOnInit() {
  }

}
