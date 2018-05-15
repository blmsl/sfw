import {
  Component,
  HostListener,
  OnInit
}                           from '@angular/core';
import { MemberService }    from '../../../shared/services/member/member.service';
import { IMember }          from '../../../shared/interfaces/member/member.interface';
import {
  ActivatedRoute,
  Router
}                           from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
}                           from '@angular/forms';
import { Observable }       from 'rxjs';
import { IProfile }         from '../../../shared/interfaces/member/profile.interface';
import { IInterview }       from '../../../shared/interfaces/member/interview.interface';
import { IOpinion }         from '../../../shared/interfaces/member/opinion.interface';
import {
  debounceTime,
  distinctUntilChanged
}                           from 'rxjs/operators';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig }  from '../../../shared/interfaces/media/uploader-config.interface';
import { AlertService }     from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: [ './member-edit.component.scss' ]
})
export class MemberEditComponent implements OnInit {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true; // JSON.stringify(this.club).toLowerCase() === JSON.stringify(this.savedClub).toLowerCase();
  }

  public member: IMember;
  private savedMember: IMember;
  public form: FormGroup;
  public members$: Observable<IMember[]>;
  //public clubs$: Observable<IClub[]>;
  //public teams$: Observable<ITeam[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false
  };

  public uploaderOptions: IUploaderOptions = {
    itemID: '',
    path: 'members/profile-images',
    queueLimit: 1
  };

  constructor(public route: ActivatedRoute,
              //private clubService: ClubService,
              //private teamService: TeamService,
              private fb: FormBuilder,
              private alertService: AlertService,
              public memberService: MemberService,
              private router: Router) {
    //this.clubs$ = clubService.clubs$;
    this.members$ = memberService.members$;
    //this.teams$ = this.teamService.teams$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { member: IMember }) => {
      this.member = data.member;
      this.savedMember = Object.freeze(Object.assign({}, this.member));
      this.uploaderOptions.itemID = this.uploaderOptions.id = this.member.id;
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
      interviews: this.initInterviews()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMember) => {
      this.member = Object.assign({}, this.member, changes);
      if (!this.form.invalid) {
        console.log('save');
        console.log(this.member);
        this.saveMember();
      }
    });

    if (this.member.isImported) {
      this.form.get('address').disable();
      this.form.get('ahData').disable();
      this.form.get('clubData').disable();
      this.form.get('dfbData').disable();
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
      positionsInClub: this.member.contact ? this.member.clubData.positionsInClub : '',
      status: this.member.contact ? this.member.clubData.status : ''
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
      at: this.member.creation.at,
      from: this.member.creation.from
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
        formArray.push(this.initInterview(this.member.assignedInterviews[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initInterview(interview: IInterview): FormGroup {
    return this.fb.group({
      assignedArticleId: [ interview.assignedArticleId ? interview.assignedArticleId : '', [ Validators.required, Validators.maxLength(100) ] ]
    });
  }

  addInterview(): void {
    const control = <FormArray>this.form.controls[ 'interviews' ];
    const interview: IInterview = {
      assignedArticleId: ''
    };
    const addCtrl = this.initInterview(interview);
    control.push(addCtrl);
  }

  removeInterview($event: number): void {
    const control = <FormArray>this.form.controls[ 'interviews' ];
    control.removeAt($event);
  }

  /**
   * Opinions from others
   */
  initOpinions(): FormArray {
    const formArray = [];
    if (this.member.opinions) {
      for (let i = 0; i < this.member.opinions.length; i++) {
        formArray.push(this.initOpinion(this.member.opinions[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initOpinion(opinion: IOpinion): FormGroup {
    return this.fb.group({
      type: [ opinion ? opinion.type : 'select' ],
      name: this.initNameModel(opinion),
      assignedMember: this.initAssignedMemberModel(opinion),
      comment: [ opinion ? opinion.comment : '', [ Validators.required ] ]
    });
  }

  // Das sagen die anderen
  toggleMemberLookup($event: { id: number, type: string }) {
    const ctrl: FormControl = (<any>this.form).controls[ 'opinions' ][ 'controls' ][ $event.id ].controls[ 'type' ];
    ctrl.setValue($event.type);
  }

  initNameModel(opinion: IOpinion) {
    return this.fb.group({
      firstName: [ opinion.name.firstName ],
      lastName: [ opinion.name.lastName ]
      // , [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
    });
  }

  initAssignedMemberModel(opinion: IOpinion): FormGroup {
    return this.fb.group({
      assignedMember: [ opinion.assignedMember ]
      // , [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ]
    });
  }

  addOpinion(): void {
    const control = <FormArray>this.form.controls[ 'opinions' ];
    const opinion: IOpinion = {
      type: 'select',
      name: {
        firstName: '',
        lastName: ''
      },
      assignedMember: null,
      comment: ''
    };
    const addCtrl = this.initOpinion(opinion);
    control.push(addCtrl);
  }

  removeOpinion($event: number): void {
    const control = <FormArray>this.form.controls[ 'opinions' ];
    control.removeAt($event);
  }

  // Steckbrief
  initProfile(): FormArray {
    const formArray = [];
    if (this.member.profile) {
      for (let i = 0; i < this.member.profile.length; i++) {
        formArray.push(this.initProfileEntry(this.member.profile[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initProfileEntry(profile: IProfile): FormGroup {
    return this.fb.group({
      entry: [ profile ? profile.entry : '', [ Validators.required, Validators.maxLength(100) ] ],
      value: [ profile ? profile.value : '', [ Validators.required, Validators.maxLength(100) ] ]
    });
  }

  addProfileEntry(): void {
    const control = <FormArray>this.form.controls[ 'profile' ];
    const profile: IProfile = {
      entry: '',
      value: ''
    };
    const addCtrl = this.initProfileEntry(profile);
    control.push(addCtrl);
  }

  removeProfileEntry($event: number): void {
    const control = <FormArray>this.form.controls[ 'profile' ];
    control.removeAt($event);
  }

  saveMember(redirect: boolean = false): void {
    let action;

    if (this.member.id) {
      action = this.memberService.updateMember(this.member.id, this.form.getRawValue());
    } else {
      action = this.memberService.createMember(this.member);
    }
    /*action.then(() => {
        console.log(1);
        if (redirect) {
          this.redirectToList();
        }
        this.alertService.showSnackBar('success', 'general.members.edit.saved');
      },
      (error: any) => {
        console.log(2);
        this.alertService.showSnackBar('error', error.message);
      }
    ).catch((error: any) => {
      console.log(3);
      this.alertService.showSnackBar('error', error.message);
    }); */
  }

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate([ '/members' ]).then();
  }
}
