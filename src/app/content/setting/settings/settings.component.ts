import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IApplication } from '../../../shared/interfaces/application.interface';
import { ApplicationService } from '../../../shared/services/application/application.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { IStaticPage } from '../../../shared/interfaces/static-page.interface';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { urlShortener } from '../../../shared/config/url-shortener.config';
import { ISocialNetwork } from '../../../shared/interfaces/social-network.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  /* @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return JSON.stringify(this.application).toLowerCase() === JSON.stringify(this.savedApplication).toLowerCase();
  } */

  public application: IApplication;
  public form: FormGroup;
  public selectedStaticPage: number = -1;
  public shorteningProviders: {
    title: string,
    key: string
  }[] = [];
  public link: string = 'http://www.google.de';
  public savedApplication: IApplication;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private title: Title,
    private translateService: TranslateService,
    private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { application: IApplication }) => {
      this.application = data.application;
      this.savedApplication = Object.freeze(Object.assign({}, this.application));
    });

    if (this.application) {
      this.form = this.fb.group({
        page: this.initPage(),
        urlShortening: this.application.urlShortening,
        registration: this.application.registration,
        downtime: this.initDowntime(),
        staticPages: this.initStaticPages(),
        social: this.initSocialProviders()
      });

      this.form.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe((changes: IApplication) => {
        this.application = Object.assign({}, this.application, changes);
        if (!this.form.invalid) {
          this.saveSettings();
        }
      });

      /*
      this.form.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe((changes: IApplication) => {
        this.application.page = changes.page;
        this.application.urlShortening = changes.urlShortening;
        this.application.registration = changes.registration;
        this.application.downtime = changes.downtime;
        this.application.social = changes.social;
        this.application.staticPages = changes.staticPages;

        if (!this.form.invalid) {
          this.application = Object.assign({}, this.application, changes);
          this.saveSettings();
        }
      }); */
    }

    for (let i = 0; i < urlShortener.length; i++) {
      this.shorteningProviders.push({
        title: urlShortener[i]['title'],
        key: urlShortener[i]['key']
      });
    }
  }

  initPage(): FormGroup {
    return this.fb.group({
      name: [this.application.page.name, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: this.application.page.description,
      email: this.application.page.email,
      title: this.application.page.title
    });
  }

  initDowntime(): FormGroup {
    return this.fb.group({
      isEnabled: this.application.downtime.isEnabled,
      message: this.application.downtime.message
    });
  }

  initStaticPages(): FormArray {
    const formArray = [];
    if (this.application.staticPages) {
      for (let i = 0; i < this.application.staticPages.length; i++) {
        formArray.push(this.initStaticPage(this.application.staticPages[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initStaticPage(staticPage: IStaticPage): FormGroup {
    return this.fb.group({
      isEnabled: [staticPage ? staticPage.isEnabled : false],
      assignedCategories: [staticPage ? staticPage.assignedCategories : '', [Validators.required]],
      text: [staticPage ? staticPage.text : '', [Validators.required]],
      title: [staticPage ? staticPage.title : '', [Validators.required]]
    });
  }

  addStaticPage(): void {
    this.getNewStaticPageTitle().subscribe((staticPageTitle: string) => {
      const control = <FormArray>this.form.controls['staticPages'];

      const pageTitle = this.form.controls['staticPages']['controls'].length === 0
        ? staticPageTitle
        : staticPageTitle + ' (' + this.form.controls['staticPages']['controls'].length + ')';

      const staticPage: IStaticPage = {
        isEnabled: true,
        assignedCategories: [],
        text: '',
        title: pageTitle
      };
      const addCtrl = this.initStaticPage(staticPage);
      control.push(addCtrl);
      this.setSelectedStaticPage(this.form.controls['staticPages']['controls'].length - 1);
    });
  }

  removeStaticPage(i: number): void {
    const control = <FormArray>this.form.controls['staticPages'];
    control.removeAt(i);
    this.setSelectedStaticPage(-1);
  }

  setSelectedStaticPage(staticPage: number): void {
    this.selectedStaticPage = staticPage;
  }

  getNewStaticPageTitle(): Observable<string> {
    return this.translateService.get('general.applications.static.noTitle');
  }

  initSocialProviders(): FormArray {
    const formArray = [];
    if (this.application.social) {
      for (let i = 0; i < this.application.social.length; i++) {
        formArray.push(this.initSocialProvider(this.application.social[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initSocialProvider(provider: ISocialNetwork): FormGroup {
    return this.fb.group({
      link: [provider ? provider.link : '', [Validators.required]],
      title: [provider ? provider.title : '', [Validators.required]]
    });
  }

  addSocialProvider(): void {
    const control = <FormArray>this.form.controls['social'];
    const provider: ISocialNetwork = {
      link: '',
      title: ''
    };
    const addCtrl = this.initSocialProvider(provider);
    control.push(addCtrl);
  }

  removeSocialProvider(i: number): void {
    const control = <FormArray>this.form.controls['social'];
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
    this.selectedStaticPage = -1;
    // this.form.controls['staticPages']['controls'] = this.initStaticPages();
    // this.application.staticPages = this.savedApplication.staticPages;
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
