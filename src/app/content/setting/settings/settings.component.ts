import {
  Component,
  OnInit
}                             from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                             from '@angular/forms';
import { Title }              from '@angular/platform-browser';
import { IApplication }       from '../../../shared/interfaces/application.interface';
import { ApplicationService } from '../../../shared/services/application/application.service';
import { MatSnackBar }        from '@angular/material';
import { SnackbarComponent }  from '../../../shared/components/snackbar/snackbar.component';
import { IStaticPage }        from '../../../shared/interfaces/static-page.interface';
import { TranslateService }   from '@ngx-translate/core';
import { Observable }         from 'rxjs';
import { ISocialNetwork }     from '../../../shared/interfaces/social-network.interface';
import {
  debounceTime,
  distinctUntilChanged
}                             from 'rxjs/operators';
import { UserService }        from '../../../shared/services/user/user.service';

@Component({
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public application: IApplication;
  public form: FormGroup;
  public selectedStaticPage: AbstractControl = null;

  public link: string = 'http://www.google.de';
  public savedApplication: IApplication;
  public roles: string[];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar,
              private title: Title,
              private translateService: TranslateService,
              private userService: UserService,
              private applicationService: ApplicationService) {
    this.roles = userService.getUserRoles();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { application: IApplication }) => {
      this.application = data.application;
      this.savedApplication = Object.freeze(Object.assign({}, this.application));
    });

    this.form = this.fb.group({
      page: this.fb.group({
        name: [ this.application.page.name, [ Validators.required, Validators.minLength(10), Validators.maxLength(100) ] ],
        description: this.application.page.description,
        email: this.application.page.email,
        title: this.application.page.title,
        assignedKeywords: this.application.assignedKeywords
      }),
      registration: this.application.registration,
      downtime: this.fb.group({
        isEnabled: this.application.downtime.isEnabled,
        message: this.application.downtime.message
      }),
      staticPages: this.initStaticPages(),
      social: this.initSocialProviders(),
      mailing: this.fb.group({
        birthdayRecipients: this.application.mailing ? this.application.mailing.birthdayRecipients : null,
        teamOfTheMonth: this.application.mailing ? this.application.mailing.teamOfTheMonth : null,
        memberOfTheWeek: this.application.mailing ? this.application.mailing.memberOfTheWeek : null,
        newPublishedArticle: this.application.mailing ? this.application.mailing.newPublishedArticle : null,
        newCreatedMatch: this.application.mailing ? this.application.mailing.newCreatedMatch : null
      }),
      assignedCalendars: this.initCalendars()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IApplication) => {
      this.application = Object.assign({}, this.application, changes);
      console.log(this.form);
      if (!this.form.invalid) {
        this.saveSettings();
      }
    });
  }


  initCalendars(): FormArray {
    const formArray = [];
    if (this.application.assignedCalendars) {
      for (let i = 0; i < this.application.assignedCalendars.length; i++) {
        formArray.push(this.initCalendar(this.application.assignedCalendars[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initCalendar(calendar: { title: string, link: string }): FormGroup {
    return this.fb.group({
      link: [ calendar ? calendar.link : '', [ Validators.required ] ],
      title: [ calendar ? calendar.title : '', [ Validators.required ] ]
    });
  }

  addCalendar() {
    const control = <FormArray>this.form.controls[ 'assignedCalendars' ];
    control.push(this.initCalendar({ title: '', link: '' }));
  }

  deleteCalendar(i: number) {
    const control = <FormArray>this.form.controls[ 'assignedCalendars' ];
    control.removeAt(i);
  }

  initStaticPages(): FormArray {
    const formArray = [];
    if (this.application.staticPages) {
      for (let i = 0; i < this.application.staticPages.length; i++) {
        formArray.push(this.initStaticPage(this.application.staticPages[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initStaticPage(staticPage: IStaticPage): FormGroup {
    return this.fb.group({
      isEnabled: [ staticPage ? staticPage.isEnabled : false ],
      assignedCategories: [ staticPage ? staticPage.assignedCategories : '', [ Validators.required ] ],
      text: [ staticPage ? staticPage.text : '', [ Validators.required ] ],
      title: [ staticPage ? staticPage.title : '', [ Validators.required ] ]
    });
  }

  addStaticPage(): void {
    this.getNewStaticPageTitle().subscribe((staticPageTitle: string) => {
      const control = <FormArray>this.form.get('staticPages');

      const pageTitle = control.length === 0
        ? staticPageTitle
        : staticPageTitle + ' (' + control.length + ')';

      const staticPage: IStaticPage = {
        isEnabled: true,
        assignedCategories: [],
        text: '',
        title: pageTitle
      };
      const addCtrl = this.initStaticPage(staticPage);
      control.push(addCtrl);
      this.setSelectedStaticPage(control.controls[ control.length - 1 ]);
    });
  }

  removeStaticPage(i: number): void {
    const control = <FormArray>this.form.get('staticPages');
    control.removeAt(i);
  }

  setSelectedStaticPage(staticPage: AbstractControl): void {
    this.selectedStaticPage = staticPage;
  }

  getNewStaticPageTitle(): Observable<string> {
    return this.translateService.get('general.applications.static.noTitle');
  }

  initSocialProviders(): FormArray {
    const formArray = [];
    if (this.application.social) {
      for (let i = 0; i < this.application.social.length; i++) {
        formArray.push(this.initSocialProvider(this.application.social[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initSocialProvider(provider: ISocialNetwork): FormGroup {
    return this.fb.group({
      link: [ provider ? provider.link : '', [ Validators.required ] ],
      title: [ provider ? provider.title : '', [ Validators.required ] ]
    });
  }

  addSocialProvider(): void {
    const control = <FormArray>this.form.controls[ 'social' ];
    const provider: ISocialNetwork = {
      link: '',
      title: ''
    };
    const addCtrl = this.initSocialProvider(provider);
    control.push(addCtrl);
  }

  removeSocialProvider(i: number): void {
    const control = <FormArray>this.form.controls[ 'social' ];
    control.removeAt(i);
  }

  saveSettings() {
    this.applicationService.updateApplication(this.application.id, this.application).then(() => {
        // set Page Title
        if (this.title.getTitle() !== this.application.page.title) {
          this.title.setTitle(this.application.page.title);
        }

        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.applications.updateMessage'
          },
          duration: 2500
        });
      },
      (error: any) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'error',
            message: error
          },
          duration: 2500
        });
      });
  }

  resetApplicationData() {
    this.selectedStaticPage = null;
  }

  cancel() {
    this.resetApplicationData();

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        status: 'success',
        message: 'general.applications.resetForm'
      },
      duration: 2500
    });
  }
}
