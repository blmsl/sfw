import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../shared/services/article/article.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ApplicationService } from '../../../shared/services/application/application.service';
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
  public showPreview: boolean = false;

  public items: any = [];

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

  constructor(private route: ActivatedRoute,
              public breakpointObserver: BreakpointObserver,
              public authService: AuthService,
              private router: Router,
              private zone: NgZone,
              private alertService: AlertService,
              private articleService: ArticleService,
              private applicationService: ApplicationService,
              private fb: FormBuilder) {
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
      title: this.article.title,
      subTitle: this.article.subTitle,
      excerpt: this.article.excerpt,
      text: this.article.text,
      publication: this.initPublication(),
      creation: this.initCreation(),
      meta: this.initMetaData(),
      articleDate: this.article.articleDate,
      // postImage: string;*/
      postURL: this.article.postURL,
      assignedTags: this.article.assignedTags,
      assignedCategories: this.article.assignedCategories,
      assignedTeams: this.article.assignedTeams,
      assignedLocation: this.article.assignedLocation,
      // assignedSeason: this.article.assignedSeason,
      assignedMatch: this.article.assignedMatch,
      isFeaturedPost: this.article.isFeaturedPost,
      isMatch: !!this.article.assignedMatch
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      this.articleStatus = 'saving';
      // reset assignedMatch if checkbox is not active
      if (!changes.isMatch) {
        changes.assignedMatch = null;
      }
      changes.isMatch = null;

      // set publication date to now if status is "publish now"
      if (changes.publication.status === 1) {
        changes.publication.dateTime = <any> moment();
      }

      this.article = Object.assign({}, this.article, changes);

      // if (!this.form.invalid) {
        this.articleService.createArticle(changes)
          .then(() => {
            this.articleStatus = 'success';
          })
          .catch((error: any) => {
            this.alertService.showSnackBar('error', error.message);
            this.articleStatus = 'error';
          });
      // }
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
      facebook: this.fb.group({
        title: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.title : '',
        description: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.description : ''
      }),
      twitter: this.fb.group({
        title: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter : '',
        description: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.description : ''
      })
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
