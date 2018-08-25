import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import { IMatch }              from '../../../shared/interfaces/match/match.interface';
import {
  ActivatedRoute,
  Router
}                              from '@angular/router';
import { MatchService }        from '../../../shared/services/match/match.service';
import { AlertService }        from '../../../shared/services/alert/alert.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                              from '@angular/forms';
import { IPublication }        from '../../../shared/interfaces/publication.interface';
import { LocationService }     from '../../../shared/services/location/location.service';
import { Observable, Subscription } from 'rxjs/index';
import { ILocation }           from '../../../shared/interfaces/location/location.interface';
import { ITeam }               from '../../../shared/interfaces/team/team.interface';
import { TeamService }         from '../../../shared/services/team/team.service';
import { CategoryService }     from '../../../shared/services/category/category.service';
import { ICategory }           from '../../../shared/interfaces/category.interface';
import { ISeason }             from '../../../shared/interfaces/season.interface';
import { SeasonService }       from '../../../shared/services/season/season.service';
import { IArticle }            from '../../../shared/interfaces/article.interface';
import { ArticleService }      from '../../../shared/services/article/article.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { IMatchEvent }         from '../../../shared/interfaces/match/match-event.interface';
import {
  debounceTime,
  distinctUntilChanged
}                              from 'rxjs/internal/operators';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: [ './match-edit.component.scss' ]
})
export class MatchEditComponent implements OnInit, AfterViewChecked, OnDestroy {

  public match: IMatch;
  public form: FormGroup;

  public assignedArticles$: Observable<IArticle[]>;

  public assignedTeam: ITeam;
  public assignedMembers: IMember[];

  public notAssignedArticles$: Observable<IArticle[]>;
  public locations$: Observable<ILocation[]>;
  public categories$: Observable<ICategory[]>;
  public seasons$: Observable<ISeason[]>;
  public teams$: Observable<ITeam[]>;

  public otherMatchEventList: {
    id: number;
    title: string;
  }[];
  public matchEventCategories:  {
    id: number;
    title: string;
  }[];

  private teamSubscription: Subscription;
  private memberSubscription: Subscription;


  constructor(private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private matchService: MatchService,
              private alertService: AlertService,
              private locationService: LocationService,
              private teamService: TeamService,
              private categoryService: CategoryService,
              private categoryTypeService: CategoryTypeService,
              private seasonService: SeasonService,
              private articleService: ArticleService,
              private memberService: MemberService,
              private router: Router) {
    this.categories$ = this.categoryService.getCategoriesByCategoryType('team.types');
    this.locations$ = locationService.locations$;
    this.teams$ = teamService.teams$;
    this.seasons$ = seasonService.seasons$;
    this.otherMatchEventList = matchService.getOtherEventList();
    this.matchEventCategories = matchService.getMatchEventCategories();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => {
      this.match = data.match;

      this.assignedArticles$ = this.articleService.getArticlesForMatch(this.match.id);
      this.notAssignedArticles$ = this.articleService.getArticlesNotAssignedToMatch(this.match);

      this.teamSubscription = this.teamService.getTeamById(this.match.assignedTeam).subscribe((team: ITeam) => {
        this.assignedTeam = team;
        this.memberSubscription = this.memberService.getMembersByIds(team.assignedPlayers).subscribe((members: IMember[]) => {
          this.assignedMembers = members;
        });
      });
    });

    this.form = this.fb.group({
      assignedCategories: [ this.match.assignedCategories, [ Validators.required ] ],
      assignedLocation: [ this.match.assignedLocation, [ Validators.required ] ],
      assignedTeam: [ this.match.assignedTeam, [ Validators.required ] ],
      creation: this.initCreation(),
      guestTeam: this.initTeam(this.match.guestTeam),
      homeTeam: this.initTeam(this.match.homeTeam),
      isHomeTeam: this.match.isHomeTeam,
      isImported: this.match.isImported,
      isOfficialMatch: this.match.isOfficialMatch,
      matchEndDate: this.match.matchEndDate.toDate(),
      matchLink: this.match.matchLink,
      matchStartDate: this.match.matchStartDate.toDate(),
      matchType: [ this.match.matchType, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
      publication: this.initPublication(this.match.publication),
      result: this.initResult(this.match.result),
      title: [ this.match.title, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
      assignedFormation: this.match.assignedFormation,
      assignedPlayers: this.initAssignedPlayers(this.match.assignedPlayers),
      assignedSubstitutes: this.initAssignedSubstitutes(this.match.assignedSubstitutes),
      assignedMatchEvents: this.initMatchEvents(this.match.assignedMatchEvents)
    });

    if (this.match.isImported) {
      this.form.get('assignedCategories').disable();
      this.form.get('assignedLocation').disable();
      this.form.get('assignedTeam').disable();
      this.form.get('guestTeam').disable();
      this.form.get('homeTeam').disable();
      this.form.get('isHomeTeam').disable();
      this.form.get('isImported').disable();
      this.form.get('isOfficialMatch').disable();
      this.form.get('matchEndDate').disable();
      this.form.get('matchLink').disable();
      this.form.get('matchStartDate').disable();
      this.form.get('matchType').disable();
      this.form.get('title').disable();
    }

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMatch) => {
      this.match = Object.assign({}, this.match, changes);
      if (!this.form.invalid) {
        this.saveMatch();
      }
    });
  }

  ngOnDestroy(){
    this.memberSubscription.unsubscribe();
    this.teamSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    // this.cdRef.detectChanges();
  }

  initMatchEvents(assignedEvents: IMatchEvent[]): FormArray {
    const formArray = this.fb.array([]);
    if (assignedEvents) {
      for (let i = 0; i < assignedEvents.length; i++) {
        formArray.push(this.createMatchEvent(assignedEvents[ i ]));
      }
    }
    return formArray;
  }

  saveMatchEvent($event: IMatchEvent) {
    console.log($event);
    this.addMatchEvent($event);
  }

  addMatchEvent(event: IMatchEvent) {
    const control = <FormArray>this.form.controls[ 'assignedMatchEvents' ];
    control.push(this.createMatchEvent(event));
  }

  createMatchEvent(event: IMatchEvent) {
    return this.fb.group({
      ordering: event ? event.ordering: 0,
      assignedCategory: event ? event.assignedCategory : null,
      description: [ event ? event.description : '', [ Validators.required, Validators.minLength(5) ] ],
      playMinute: event ? event.playMinute : null,
      title: event ? event.title : ''
    });
  }

  deleteMatchEvent(event: IMatchEvent) {
    this.match.assignedMatchEvents.splice(this.match.assignedMatchEvents.indexOf(event), 1);
  }

  initAssignedSubstitutes(assignedSubstitutes: {
    memberId: string;
    position: string
  }[]): FormArray {
    const formArray = this.fb.array([]);
    if (assignedSubstitutes) {
      for (let i = 0; i < assignedSubstitutes.length; i++) {
        let formControl = this.fb.group({
          memberId: assignedSubstitutes[ i ]
        });
        formArray.push(formControl);
      }
    }
    return formArray;
  }

  createAssignedPlayer(assignedPosition: {
    memberId: string;
    position: string;
  }) {
    return this.fb.group({
      memberId: assignedPosition[ 'memberId' ],
      position: assignedPosition[ 'position' ]
    });
  }

  initAssignedPlayers(assignedPositions: {
    memberId: string;
    position: string;
  }[]): FormArray {
    const formArray = this.fb.array([]);
    if (assignedPositions) {
      for (let i = 0; i < assignedPositions.length; i++) {
        let formControl = this.createAssignedPlayer(assignedPositions[ i ]);
        formArray.push(formControl);
      }
    }
    return formArray;
  }

  addPlayerToStartingEleven($event: { memberId: string, position: string }): void {
    const control = <FormArray>this.form.get('assignedPlayers');
    control.push(this.createAssignedPlayer($event));
  }

  initTeam(data: {
    externalTeamLink?: string,
    logoURL?: string,
    title: string
  }): FormGroup {
    return this.fb.group({
      externalTeamLink: data.externalTeamLink ? data.externalTeamLink : '',
      logoURL: data.logoURL ? data.logoURL : '',
      title: data.title
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.match.creation.at.toDate(),
      from: this.match.creation.by
    });
  }

  initPublication(publication: IPublication): FormGroup {
    return this.fb.group({
      dateTime: publication.dateTime,
      from: publication.from,
      status: publication.status
    });
  }

  initResult(result: {
    guestTeamGoals?: number | string,
    homeTeamGoals?: number | string,
    otherEvent?: number | string
  }): FormGroup {
    return this.fb.group({
      guestTeamGoals: result ? result.guestTeamGoals : null,
      homeTeamGoals: result ? result.homeTeamGoals : null,
      otherEvent: result ? result.otherEvent : null
    });
  }

  removeMatch(match: IMatch): void {
    this.matchService.removeMatch(match).then(
      () => this.router.navigate([ '/matches' ]).then(),
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

  saveMatch(redirect: boolean = false): void {
    let action;
    if (this.match.id) {
      action = this.matchService.updateMatch(this.match.id, this.match);
    } else {
      action = this.matchService.createMatch(this.match);
    }
    action.then(
      () => {
        if (redirect) {
          this.redirectToList();
        }
        this.alertService.showSnackBar('success', 'general.applications.updateMessage');
      },
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

  redirectToList(): void {
    this.router.navigate([ '/matches' ]).then();
  }

}
