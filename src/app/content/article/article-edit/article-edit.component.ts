import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../shared/services/article/article.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ApplicationService } from '../../../shared/services/application/application.service';
import { IApplication } from '../../../shared/interfaces/application.interface';
import { ISocialNetwork } from '../../../shared/interfaces/social-network.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  @ViewChild('settings') settings;

  public sidePanelOpened = true;
  public isSmallDevice: boolean = false;

  public article: IArticle;
  public articleStatus: string = 'new';
  public form: FormGroup;
  public socialProviders: any[] = [];

  public publicationOptions: any[] = [
    {
      text: 'live.text',
      description: 'live.description',
      value: 1
    },
    {
      text: 'schedule.text',
      description: 'schedule.description',
      value: 2
    }
  ];

  private showPreview: boolean = false;

  constructor(private route: ActivatedRoute,
              public breakpointObserver: BreakpointObserver,
              public authService: AuthService,
              private router: Router,
              private zone: NgZone,
              private alertService: AlertService,
              private articleService: ArticleService,
              private applicationService: ApplicationService,
              private fb: FormBuilder) {
    this.applicationService.applications$.subscribe((applications: IApplication[]) => {
      applications.forEach((application: IApplication) => {
        application.social.forEach((socialProvider: ISocialNetwork) => {
          this.addSocialProvider(socialProvider);
        });
      });
    });
  }

  addSocialProvider(socialProvider: ISocialNetwork): void {
    const items = this.form.get('meta').get('socialProviders') as FormArray;
    items.controls ? items.controls.push(this.createItem(socialProvider)) : items.controls = [this.createItem(socialProvider)];
  }

  createItem(socialProvider: ISocialNetwork): FormGroup {
    return this.fb.group({
      title: this.article.meta && this.article.meta[socialProvider.title.toLowerCase()] ? this.article.meta[socialProvider.title.toLowerCase()].title : '',
      description: this.article.meta && this.article.meta[socialProvider.title.toLowerCase()] ? this.article.meta[socialProvider.title.toLowerCase()].description : ''
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: { article: IArticle }) => {
      this.article = data.article;
    });

    this.breakpointObserver
      .observe(['(min-width: ' + SMALL_WIDTH_BREAKPOINT + 'px)'])
      .subscribe((state: BreakpointState) => {
        this.sidePanelOpened = state.matches;
        this.isSmallDevice = !this.sidePanelOpened;
      });

    this.form = this.fb.group({
      title: [this.article.title, [Validators.required, Validators.minLength(10)]],
      subTitle: [this.article.subTitle],
      excerpt: [this.article.excerpt],
      text: [this.article.text, [Validators.required, Validators.minLength(10)]],
      publication: this.initPublication(),
      creation: this.initCreation(),
      meta: this.initMetaData(),
      articleDate: this.article.articleDate,
      // postImage: string;*/
      postURL: [this.article.postURL],
      assignedTags: [this.article.assignedTags],
      assignedCategories: [this.article.assignedCategories],
      assignedTeams: [this.article.assignedTeams],
      assignedLocation: [this.article.assignedLocation],
      // assignedSeason: [this.article.assignedSeason],
      assignedMatch: [this.article.assignedMatch],
      isFeaturedPost: [this.article.isFeaturedPost],
      isMatch: !!this.article.assignedMatch
    });
    console.log(this.form.get('meta'));

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      this.articleStatus = 'saving';
      // reset assignedMatch if checkbox is not active
      if(!changes.isMatch){
        changes.assignedMatch = null;
      }
      changes.isMatch = null;

      // set publication date to now if status is "publish now"
      if(changes.publication.status === 1){
        changes.publication.dateTime = <any> moment();
      }

      this.article = Object.assign({}, this.article, changes);

      if (!this.form.invalid) {
        this.articleService.createArticle(changes)
          .then(() => {
            this.articleStatus = 'success';
          })
          .catch((error: any) => {
            this.alertService.showSnackBar('error', error.message);
            this.articleStatus = 'error';
          });
      }
    });

  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  initMetaData(): FormGroup {
    return this.fb.group({
      main: this.fb.group({
        title: this.article.meta && this.article.meta.main ? this.article.meta.main.title : '',
        description: this.article.meta && this.article.meta.main ? this.article.meta.main.description : ''
      }),
      socialProviders: this.socialProviders
    });
  }

  initPublication(): FormGroup {
    return this.fb.group({
      by: this.article.publication ? this.article.publication.from : null,
      dateTime: [this.article.publication && this.article.publication.dateTime ? this.article.publication.dateTime : new Date(), Validators.compose([Validators.required, CustomValidators.date])],
      status: this.article.publication ? this.article.publication.status : 0
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      by: this.article.creation.from,
      at: this.article.creation.at
    });
  }

  resetPublication(): void {
    this.article.publication.status = 0;
    this.article.publication.dateTime = null;
  }

  removeArticle(): void {
    if (this.article.id) {
      console.log(this.article.id);
      // this.articleService.removeArticle(this.article).then(() => this.redirectToList());
    } else {
      console.log('unsaved article');
    }
    this.redirectToList();
  }

  redirectToList(): void {
    this.router.navigate(['/articles']).then();
  }

}
