import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProfile } from '../../../shared/interfaces/member/profile.interface';
import { IInterview } from '../../../shared/interfaces/member/interview.interface';
import { IOpinion } from '../../../shared/interfaces/member/opinion.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import * as firebase from 'firebase';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../shared/services/team/team.service';
import { ClubService } from '../../../shared/services/club/club.service';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ArticleService } from '../../../shared/services/article/article.service';
import { IArticle } from '../../../shared/interfaces/article.interface';

@Component({
  selector: 'member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }

  public member: IMember;
  public form: FormGroup;

  public members$: Observable<IMember[]>;
  public teams$: Observable<ITeam[]>;
  public clubs$: Observable<IClub[]>;
  public articles$: Observable<IArticle[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['members', 'profile'],
    itemId: '',
    queueLimit: 1
  };

  constructor(public route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private clubService: ClubService,
    private authService: AuthService,
    private alertService: AlertService,
    public memberService: MemberService,
    private teamService: TeamService,
    private articleService: ArticleService,
    private router: Router) {
    this.members$ = memberService.members$;
    this.clubs$ = clubService.clubs$;
    this.teams$ = teamService.teams$;
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { member: IMember }) => {
      this.member = data.member;
      this.uploaderOptions.itemId = this.member.id;
    });

    this.form = this.fb.group({
      address: this.initAddress(),
      ahData: this.initAHData(),
      clubData: this.initClubData(),
      comment: this.member.comment,
      contact: this.initContact(),
      creation: this.initCreation(),
      dfbData: this.initDFBData(),
      mainData: this.initMainData(),
      profile: this.initProfile(),
      opinions: this.initOpinions(),
      assignedInterviews: this.initInterviews()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMember) => {
      this.member = Object.assign({}, this.member, changes);
      if (!this.form.invalid) {
        this.saveMember();
      }
    });

    if (this.member.dfbImport) {
      this.form.get('dfbData').disable();
      this.form.get('mainData').disable();
    }

    if (this.member.driveImport) {
      this.form.get('address').disable();
      this.form.get('ahData').disable();
      this.form.get('clubData').disable();
      this.form.get('contact').disable();
      this.form.get('mainData').disable();
    }
  }

  initAddress(): FormGroup {
    return this.fb.group({
      city: this.member.address ? this.member.address.city : '',
      county: this.member.address ? this.member.address.county : '',
      houseNumber: this.member.address ? this.member.address.houseNumber : '',
      streetName: this.member.address ? this.member.address.streetName : '',
      zip: this.member.address ? this.member.address.zip : ''
    });
  }

  initAHData(): FormGroup {
    return this.fb.group({
      joined: this.member.ahData ? this.member.ahData.joined : '',
      left: this.member.ahData ? this.member.ahData.left : '',
      payment: this.member.ahData ? this.member.ahData.payment : '',
      status: this.member.ahData ? this.member.ahData.status : ''
    });
  }

  initClubData(): FormGroup {
    return this.fb.group({
      assignedClub: this.member.clubData ? this.member.clubData.assignedClub : '',
      joined: this.member.clubData ? this.member.clubData.joined : '',
      left: this.member.clubData ? this.member.clubData.left : '',
      payment: this.member.clubData ? this.member.clubData.payment : '',
      positionsInClub: this.member.clubData ? this.member.clubData.positionsInClub : '',
      status: this.member.clubData ? this.member.clubData.status : ''
    });
  }

  initContact(): FormGroup {
    return this.fb.group({
      email: this.member.contact ? this.member.contact.email : '',
      fax: this.member.contact ? this.member.contact.fax : '',
      phoneHome: this.member.contact ? this.member.contact.phoneHome : '',
      phoneMobile: this.member.contact ? this.member.contact.phoneMobile : '',
      phoneWork: this.member.contact ? this.member.contact.phoneWork : ''
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.member.creation.at.toDate(),
      from: this.member.creation.by
    });
  }

  initDFBData(): FormGroup {
    return this.fb.group({
      ageGroup: this.member.dfbData ? this.member.dfbData.ageGroup : '',
      allowedToPlay: this.member.dfbData ? this.member.dfbData.allowedToPlay : '',
      eligibleForFriendlyMatches: this.member.dfbData ? this.member.dfbData.eligibleForFriendlyMatches : '',
      eligibleForOfficialMatches: this.member.dfbData ? this.member.dfbData.eligibleForOfficialMatches : '',
      passNumber: this.member.dfbData ? this.member.dfbData.passNumber : '',
      passPrint: this.member.dfbData ? this.member.dfbData.passPrint : '',
      playerStatus: this.member.dfbData ? this.member.dfbData.playerStatus : '',
      signOut: this.member.dfbData ? this.member.dfbData.signOut : '',
      guestPlayer: this.initGuestPlayer()
    });
  }

  initGuestPlayer(): FormGroup {
    return this.fb.group({
      guestRight: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.guestRight : '',
      season: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.season : '',
      type: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.type : ''
    });
  }

  initMainData(): FormGroup {
    return this.fb.group({
      birthday: this.member.mainData.birthday,
      firstName: this.member.mainData.firstName,
      gender: this.member.mainData.gender,
      lastName: this.member.mainData.lastName,
      title: this.member.mainData.title
    });
  }

  // Interviews
  initInterviews(): FormArray {
    const formArray = [];
    if (this.member.assignedInterviews) {
      for (let i = 0; i < this.member.assignedInterviews.length; i++) {
        formArray.push(this.initInterview(this.member.assignedInterviews[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initInterview(interview: IInterview): FormGroup {
    return this.fb.group({
      assignedArticleId: [interview.assignedArticleId ? interview.assignedArticleId : '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  addInterview(): void {
    const control = <FormArray>this.form.controls['assignedInterviews'];
    const interview: IInterview = {
      assignedArticleId: ''
    };
    const addCtrl = this.initInterview(interview);
    control.push(addCtrl);
  }

  removeInterview($event: number): void {
    const control = <FormArray>this.form.controls['assignedInterviews'];
    control.removeAt($event);
  }

  /**
   * Opinions from others
   */
  initOpinions(): FormArray {
    const formArray = [];
    if (this.member.opinions) {
      for (let i = 0; i < this.member.opinions.length; i++) {
        formArray.push(this.initOpinion(this.member.opinions[i]));
        // this.setOpinionValidators(i, 'list');
      }
    }
    return this.fb.array(formArray);
  }

  initOpinion(opinion: IOpinion): FormGroup {
    return this.fb.group({
      type: opinion.type ? opinion.type : 'list',
      name: this.fb.group({
        firstName: [opinion.name.firstName],
        lastName: [opinion.name.lastName]
      }),
      assignedMember: [opinion.assignedMember, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      comment: [opinion ? opinion.comment : '', [Validators.required]]
    });
  }

  setOpinionValidators($event: { i: number, type: string }) {
    const control = <FormArray>this.form.controls['opinions']['controls'][$event.i];

    if (control.get('type').value === 'insert') {
      control.get('type').setValue('list');
      control.get('name').get('firstName').setValue('');
      control.get('name').get('lastName').setValue('');
      control.get('assignedMember').setValidators(Validators.required);
    }
    else {
      control.get('type').setValue('insert');
      control.get('assignedMember').setValidators([]);
      control.get('assignedMember').setValue('');

      control.get('name').get('firstName').setValidators([Validators.required, Validators.minLength(3)]);
      control.get('name').get('lastName').setValidators([Validators.required, Validators.minLength(5)]);
    }
    this.cdRef.detectChanges();
  }

  addOpinion(): void {
    const control = <FormArray>this.form.controls['opinions'];
    const opinion: IOpinion = {
      type: 'list',
      name: {
        firstName: '',
        lastName: ''
      },
      creation: {
        at: <any>firebase.firestore.FieldValue.serverTimestamp(),
        by: this.authService.userId
      },
      assignedMember: null,
      comment: ''
    };
    const addCtrl = this.initOpinion(opinion);
    control.push(addCtrl);
  }

  removeOpinion($event: number): void {
    const control = <FormArray>this.form.controls['opinions'];
    control.removeAt($event);
  }

  // Steckbrief
  initProfile(): FormArray {
    const formArray = [];
    if (this.member.profile) {
      for (let i = 0; i < this.member.profile.length; i++) {
        formArray.push(this.initProfileEntry(this.member.profile[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initProfileEntry(profile: IProfile): FormGroup {
    return this.fb.group({
      entry: [profile ? profile.entry : '', [Validators.required, Validators.maxLength(100)]],
      value: [profile ? profile.value : '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  addProfileEntry(): void {
    const control = <FormArray>this.form.controls['profile'];
    const profile: IProfile = {
      entry: '',
      value: ''
    };
    const addCtrl = this.initProfileEntry(profile);
    control.push(addCtrl);
  }

  removeProfileEntry($event: number): void {
    const control = <FormArray>this.form.controls['profile'];
    control.removeAt($event);
  }

  saveMember(redirect: boolean = false): void {
    let action;

    if (this.member.id) {
      action = this.memberService.updateMember(this.member.id, this.form.getRawValue());
    } else {
      action = this.memberService.createMember(this.member);
    }
    action.then(() => {
      if (redirect) {
        this.redirectToList();
      }
      this.alertService.showSnackBar('success', 'general.members.edit.saved');
    },
      (error: any) => {
        this.alertService.showSnackBar('error', error.message);
      }
    ).catch((error: any) => {
      this.alertService.showSnackBar('error', error.message);
    });
  }

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate(['/members']).then();
  }

  removeMember(member) {
    this.memberService.removeMember(member).then(

    );
  }

  deleteMemberFromTeam($event: { team: ITeam, member: IMember }) {
    let index = $event.team.assignedPlayers.indexOf($event.member.id);
    $event.team.assignedPlayers.splice(index, 1);
    this.teamService.updateTeam($event.team.id, $event.team).then(
      () => this.alertService.success('general.members.edit.removedMemberFromTeam'),
      (error: any) => this.alertService.error(error)
    );
  }

  deleteMemberFromTeamManagement($event: { team: ITeam, member: IMember }) {
    for (let i = 0; i < $event.team.assignedPositions.length; i++) {
      if ($event.team.assignedPositions[i].assignedMember === $event.member.id) {
        $event.team.assignedPositions.splice(i, 1);
      }
    }
    this.teamService.updateTeam($event.team.id, $event.team).then(
      () => this.alertService.success('general.members.edit.removedMemberFromTeamManagement'),
      (error: any) => this.alertService.error(error)
    );
  }
}
