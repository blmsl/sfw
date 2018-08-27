import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { MatchService } from '../../../../shared/services/match/match.service';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Subscription } from 'rxjs/index';
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
  @Input() members: IMember[];
  @Input() form: FormGroup;

  @Output() addPlayerToStartingEleven: EventEmitter<any> = new EventEmitter<any>(false);

  public tacticalFormations: IFormation[];

  public subscription = new Subscription();
  public playerList: string = 'playerList';

  private savedInnerHTML: string;

  constructor(private fb: FormBuilder,
    private dragulaService: DragulaService,
    private memberService: MemberService,
    private matchService: MatchService) {
    this.tacticalFormations = matchService.getFormations();

    dragulaService.createGroup(this.playerList, {
      revertOnSpill: true
    });
  }

  ngOnInit() {

    /*this.subscription.add(this.dragulaService.drag(this.playerList)
      .subscribe(({ el }) => {
        console.log('drag');
        console.log(el);
        // this.removeClass(el, 'ex-moved');
      })
    ); */

    this.subscription.add(this.dragulaService.drop(this.playerList)
      .subscribe(({ el, target }) => {
        console.log(el);
        if (target.className.indexOf('player') > -1) {
          let newString = target.className.replace('ng-star-inserted', '');
          let className = newString.replace('player', '').trim();
          console.log(className);
          this.addPlayerToStartingEleven.emit({
            memberId: el.id,
            position: className
          });
        }
      })
    );

    /*
        this.subscription.add(this.dragulaService.over(this.playerList)
          .subscribe(({ el, container }) => {
            console.log('over');

            if(container.className.indexOf('player') > -1){
              let newString = container.className.replace("ng-star-inserted", "");
              let className = newString.replace("player", "").trim();
              console.log(className);
              this.savedInnerHTML = container.innerHTML;
              console.log(this.savedInnerHTML);
              // container.innerHTML = '';
              this.addClass(container, 'ex-over');
            }
          })
        );

        /* this.subscription.add(this.dragulaService.out(this.playerList)
          .subscribe(({ el, container }) => {
            container.innerHTML = this.savedInnerHTML;
            this.removeClass(container, 'ex-over');
          })
        ); */
  }

  private hasClass(el: Element, name: string): any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: Element, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: Element, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /* getSubstitutesList(maxSubstitutes: number, assignedSubstitutes: { memberId: string }[], members: IMember[]) {

    let substituteList = [];

    for (let i = 0; i < maxSubstitutes; i++) {
      substituteList[i] = assignedSubstitutes[i] ? members.filter((member: IMember) => {
        return member.id === assignedSubstitutes[i].memberId;
      })[0] : []
    }

    return substituteList;
  } */

}
