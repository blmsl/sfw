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
  FormBuilder,
  FormGroup
}                           from '@angular/forms';
import { Observable }       from 'rxjs';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig }  from '../../../shared/interfaces/media/uploader-config.interface';
import { AlertService }     from '../../../shared/services/alert/alert.service';
import { AuthService }      from '../../../shared/services/auth/auth.service';
import { ITeam }            from '../../../shared/interfaces/team/team.interface';
import { TeamService }      from '../../../shared/services/team/team.service';
import { ClubService }      from '../../../shared/services/club/club.service';
import { IClub }            from '../../../shared/interfaces/club/club.interface';
import { ArticleService }   from '../../../shared/services/article/article.service';
import { IArticle }         from '../../../shared/interfaces/article.interface';

@Component({
  selector: 'member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: [ './member-edit.component.scss' ]
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
    assignedObjects: [ 'members', 'profile' ],
    itemId: '',
    queueLimit: 1
  };

  constructor(public route: ActivatedRoute,
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
  }


  saveMember(member: IMember): void {
    this.member = Object.assign({}, this.member, member);
    let action;

    if (this.member.id) {
      action = this.memberService.updateMember(this.member.id, this.member);
    } else {
      action = this.memberService.createMember(this.member);
    }
    action.then(() => this.alertService.showSnackBar('success', 'general.members.edit.saved'),
      (error: any) => this.alertService.showSnackBar('error', error.message)
    ).catch((error: any) => {
      this.alertService.showSnackBar('error', error.message);
    });
  }

  redirectToList() {
    this.router.navigate([ '/members' ]).then();
  }

  removeMember(member) {
    this.memberService.removeMember(member)
      .then(() => this.alertService.showSnackBar('success', 'general.members.edit.deleted'))
      .then(() => this.redirectToList(),
        (error: any) => this.alertService.showSnackBar('error', error.message));
  }

}
