import {
  ChangeDetectorRef,
  Component,
  OnInit
}                          from '@angular/core';
import { FormBuilder }     from '@angular/forms';
import {
  ActivatedRoute,
  Router
}                          from '@angular/router';
import { Observable }      from 'rxjs';
import { IClub }           from '../../../shared/interfaces/club/club.interface';
import { ILocation }       from '../../../shared/interfaces/location/location.interface';
import { IMember }         from '../../../shared/interfaces/member/member.interface';
import { ClubService }     from '../../../shared/services/club/club.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { MemberService }   from '../../../shared/services/member/member.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory }       from '../../../shared/interfaces/category.interface';
import { ArticleService }  from '../../../shared/services/article/article.service';
import { IArticle }        from '../../../shared/interfaces/article.interface';
import { AlertService }    from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'club-edit',
  templateUrl: 'club-edit.component.html'
})
export class ClubEditComponent implements OnInit {

  public club: IClub;
  public articles$: Observable<IArticle[]>;
  public locations$: Observable<ILocation[]>;
  public members$: Observable<IMember[]>;
  public positions$: Observable<ICategory[]>;

  /*public showForm: boolean;

   public selectedClubManagementPosition: number = -1;
   public selectedHonorary: number = -1;
   */

  constructor(public clubService: ClubService,
              private alertService: AlertService,
              private articleService: ArticleService,
              private locationService: LocationService,
              private memberService: MemberService,
              private categoryService: CategoryService,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router) {
    this.locations$ = locationService.locations$;
    this.members$ = memberService.members$;
    this.articles$ = articleService.articles$;
    this.positions$ = categoryService.getCategoriesByCategoryType('club.position.types');
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });

    /*this.form = this.fb.group({
     honoraries: this.initHonoraries()
     }); */
  }

  /*
   // honoraries
   initHonoraries(): FormArray {
   const formArray = [];
   if (this.club.honoraries) {
   for (let i = 0; i < this.club.honoraries.length; i++) {
   formArray.push(this.initHonorary(this.club.honoraries[i]));
   }
   }
   return this.fb.array(formArray);
   }

   initHonorary(honorary: IClubHonorary): FormGroup {
   return this.fb.group({
   assignedMember: [honorary ? honorary.assignedMember : null, [Validators.required]],
   assignedArticle: [honorary ? honorary.assignedArticle : null, [Validators.required]],
   startDate: [honorary.startDate ? new Date(honorary.startDate.seconds * 1000) : new Date(), [Validators.required]]
   });
   }

   addHonorary(): void {
   const control = <FormArray>this.form.controls['honoraries'];
   const honorary: IClubHonorary = {
   startDate: {
   nanoseconds: 0,
   seconds: moment().unix()
   }
   };
   const addCtrl = this.initHonorary(honorary);
   control.push(addCtrl);
   this.selectedHonorary = this.form.controls['honoraries']['controls'].length - 1;
   }

   editHonorary($event: number): void {
   this.selectedHonorary = $event;
   }

   saveHonorary(): void {
   this.selectedHonorary = -1;
   }

   removeHonorary($event: number): void {
   const control = <FormArray>this.form.controls['honoraries'];
   control.removeAt($event);
   this.selectedHonorary = -1;
   }
   */

  removeClub(club: IClub) {
    this.clubService.removeClub(club)
      .then(() => this.alertService.showSnackBar('success', 'general.clubs.edit.removedClub'))
      .then(() => this.redirectToList(),
        (error: any) => this.alertService.showSnackBar('error', error.message));
  }

  saveClub($event: IClub): void {
    let action;
    this.club = Object.assign({}, this.club, $event);

    if (this.club.id) {
      action = this.clubService.updateClub(this.club.id, this.club);
    } else {
      action = this.clubService.createClub(this.club);
    }
    action.then(() => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
      (error: any) => this.alertService.showSnackBar('error', error.message)
    ).catch((error: any) => {
      this.alertService.showSnackBar('error', error.message);
    });
  }

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate([ '/clubs' ]).then();
  }

}
