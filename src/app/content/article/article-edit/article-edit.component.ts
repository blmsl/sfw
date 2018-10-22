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
import * as moment from 'moment';
import * as firebase from 'firebase';

const SMALL_WIDTH_BREAKPOINT = 768;

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  @ViewChild('settings') settings;

  public sidePanelOpened: boolean = false;
  public isSmallDevice: boolean = false;

  public article: IArticle;
  public articleStatus: string = 'new';
  public form: FormGroup;
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

  public froalaOptions: Object = {
    placeholderText: 'Schreib Deine Geschichte ...',
    charCounterCount: true,
    height: '70vh'
  };

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
      if (data.article.id) {
        this.articleStatus = 'edit';
      }
    });

    this.breakpointObserver
      .observe(['(min-width: ' + SMALL_WIDTH_BREAKPOINT + 'px)'])
      .subscribe((state: BreakpointState) => {
        this.isSmallDevice = state.matches;
      });

    this.form = this.fb.group({
      title: [this.article.title, [Validators.required, Validators.minLength(10)]],
      text: [this.article.text, [Validators.required, Validators.minLength(10)]],
      publication: this.initPublication(),

      // Main-Data
      excerpt: this.article.excerpt,
      subTitle: this.article.subTitle,
      postURL: this.article.postURL,
      articleDate: this.article.articleDate ? this.article.articleDate : new Date(),
      isFeaturedPost: this.article.isFeaturedPost,
      creation: this.initCreation(),
      assignedTags: [this.article.assignedTags],

      // Links
      assignedLocation: this.article.assignedLocation,
      assignedTeams: [this.article.assignedTeams],
      assignedMatches: [this.article.assignedMatches],
      assignedCategories: [this.article.assignedCategories],
      isMatch: !!this.article.assignedMatches,
      soccerWatchLink: this.article.soccerWatchLink,

      // Meta
      meta: this.initMetaData()
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {

      this.articleStatus = 'saving';

      if (!changes.isMatch) {
        changes.assignedMatches = null;
      }
      changes.isMatch = null;

      // set publication date to now if status is "publish now"
      if (changes.publication.status === 1) {
        changes.publication.dateTime = <any>moment();
      }

      this.article = Object.assign({}, this.article, changes);

      if (this.form.valid) {
        this.saveArticle(this.article);
      } else {
        this.articleStatus = 'error';
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
        description: this.article.meta && this.article.meta.main ? this.article.meta.main.description : '',
      }),
      facebook: this.fb.group({
        title: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.title : '',
        description: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.description : '',
        scheduled: this.article.meta && this.article.meta.facebook ? this.article.meta.facebook.scheduled : false
      }),
      twitter: this.fb.group({
        title: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.title : '',
        description: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.description : '',
        scheduled: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.scheduled : false
      })
    });
  }

  initPublication(): FormGroup {
    return this.fb.group({
      by: this.article.publication && this.article.publication.from ? this.article.publication.from : this.authService.userId,
      dateTime: [this.article.publication && this.article.publication.dateTime ? new Date(this.article.publication.dateTime) : new Date(), Validators.compose([Validators.required])],
      status: this.article.publication ? this.article.publication.status : 0
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      by: this.article.creation.by,
      at: this.article.creation.at
    });
  }

  resetPublication(): void {
    this.article.publication.status = 0;
    this.article.publication.dateTime = null;
  }

  removeArticle(): void {
    if (this.article.id) {
      this.articleService.removeArticle(this.article).then(() => {
        this.alertService.showSnackBar('success', 'general.articles.edit.deleted');
        this.redirectToList();
      });
    } else {
      this.redirectToList();
    }
  }

  redirectToList(): void {
    this.router.navigate(['/articles']).then();
  }

  uploadCompleted(articleId: string): void {
    if (!this.article.id) {
      this.article.id = articleId;
    }
  }

  saveArticle(article: IArticle) {
    let action;
    if (this.article.id) {
      action = this.articleService.updateArticle(article.id, article);
    } else {
      action = this.articleService.createArticle(article);
    }
    action
      .then(() => {
        this.articleStatus = 'success';
      })
      .catch((error: any) => {
        this.alertService.showSnackBar('error', error.message);
        this.articleStatus = 'error';
      });
  }

}
