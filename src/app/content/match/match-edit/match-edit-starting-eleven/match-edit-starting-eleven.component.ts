import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { MatchService } from '../../../../shared/services/match/match.service';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Observable, Subscription } from 'rxjs/index';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'match-edit-starting-eleven',
  templateUrl: './match-edit-starting-eleven.component.html',
  styleUrls: ['./match-edit-starting-eleven.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchEditStartingElevenComponent implements OnInit, OnDestroy {

  @Input() team: ITeam;
  @Input() form: FormGroup;

  @Output() addPlayerToStartingEleven: EventEmitter<any> = new EventEmitter<any>(false);

  public tacticalFormations: IFormation[];
  public members$: Observable<IMember[]>;

  public subscription = new Subscription();
  public playerList: string = 'playerList';

  constructor(private fb: FormBuilder,
    private dragulaService: DragulaService,
    private matchService: MatchService,
    private memberService: MemberService) {
    this.members$ = memberService.members$;
    this.tacticalFormations = matchService.getFormations();
  }

  ngOnInit() {
    this.subscription.add(this.dragulaService.drag(this.playerList)
      .subscribe(({ el }) => {
        console.log('drag');
        // this.removeClass(el, 'ex-moved');
      })
    );
    this.subscription.add(this.dragulaService.drop(this.playerList)
      .subscribe(({ el, target, source, sibling }) => {
        console.log(el.id);
        console.log(target);
        console.log(source);
        if (sibling && sibling.className.indexOf('player') > -1) {
          console.log(sibling.className); // "ng-star inserted" "player"
          let newString = sibling.className.replace("ng-star-inserted", "");
          let className = newString.replace("player", "").trim();
          console.log(className);
          this.addPlayerToStartingEleven.emit({
            memberId: el.id,
            position: className
          });
        }
      })
    );
    this.subscription.add(this.dragulaService.removeModel(this.playerList)
      .subscribe(({ el, source, item, sourceModel }) => {
        console.log('removeModel:');
        console.log(el.id);
        console.log(source);
        console.log(sourceModel);
        console.log(item.className); // "ng-star inserted" "player"
      })
    );
    this.subscription.add(this.dragulaService.over(this.playerList)
      .subscribe(({ el, container }) => {
        console.log('over');
        // this.addClass(container, 'ex-over');
      })
    );
    this.subscription.add(this.dragulaService.out(this.playerList)
      .subscribe(({ el, container }) => {
        console.log('out');
        // this.removeClass(container, 'ex-over');
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSubstitutesList(maxSubstitutes: number, assignedSubstitutes: { memberId: string }[], members: IMember[]) {

    let substituteList = [];

    for (let i = 0; i < maxSubstitutes; i++) {
      substituteList[i] = assignedSubstitutes[i] ? members.filter((member: IMember) => {
        return member.id === assignedSubstitutes[i].memberId;
      })[0] : []
    }

    return substituteList;
  }

}
