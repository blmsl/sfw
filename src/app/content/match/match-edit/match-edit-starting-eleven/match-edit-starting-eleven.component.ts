import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { MatchService } from '../../../../shared/services/match/match.service';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Subscription } from 'rxjs/index';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { DragulaService } from 'ng2-dragula';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'match-edit-starting-eleven',
  templateUrl: './match-edit-starting-eleven.component.html',
  styleUrls: ['./match-edit-starting-eleven.component.scss']
})
export class MatchEditStartingElevenComponent implements OnInit, OnDestroy {


  // @Input() team: ITeam;
  @Input() assignedTeamPlayers: IMember[];
  @Input() substitutes: any;
  @Input() startingElven: any;

  public tacticalFormations: IFormation[];
  public assignedFormation: IFormation;
  public numbers: number[] = [];

  public subscription = new Subscription();
  public playerList: string = 'playerList';

  public savedInnerHTML: any;

  constructor(private dragulaService: DragulaService,
              private memberService: MemberService,
              private matchService: MatchService) {
    this.tacticalFormations = matchService.getFormations();
  }

  ngOnInit() {

    this.subscription.add(this.dragulaService.drag(this.playerList)
      .subscribe(({ el }) => {
      })
    );

    this.subscription.add(this.dragulaService.drop(this.playerList)
      .subscribe(({ el, target }) => {
        if (target.className.indexOf('substitute') > -1) {
          this.removeClass(target, 'ex-over');
        }
      })
    );


    this.subscription.add(this.dragulaService.over(this.playerList)
      .subscribe(({ el, container }) => {

        if (container.className.indexOf('substitute') > -1) {
          this.addClass(container, 'ex-over');

          this.savedInnerHTML = container.cloneNode(true);
          console.log(this.savedInnerHTML);
          // container.innerHTML = '';
        }
      })
    );

    this.subscription.add(this.dragulaService.out(this.playerList)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
        console.log(container);
        // container.appendChild(this.savedInnerHTML);
      })
    );
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
    // this.subscription.unsubscribe();
  }

  setFormation($event: MatSelectChange) {
    this.assignedFormation = $event.value;
    for (let i = 0; i < this.assignedFormation.maxSubstitutes; i++) {
      this.numbers.push(i);
    }
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
