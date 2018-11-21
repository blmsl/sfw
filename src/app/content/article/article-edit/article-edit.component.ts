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

const SMALL_WIDTH_BREAKPOINT = 768;

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  @ViewChild('settings') settings;

  public isSmallDevice = false;

  public article: IArticle;
  public articleStatus = 'new';
  public form: FormGroup;
  public showPreview = false;

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
    height: '60vh'
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
      publication: this.initPublication()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      this.articleStatus = 'saving';

      if (changes.publicationStatus === 1) {
        changes.publicationAt = new Date();
      }

      this.article = Object.assign({}, this.article, changes);

      if (this.form.valid) {
        this.saveArticle();
      } else {
        this.articleStatus = 'error';
      }
    });
  }

  changeArticle(changes: any) {
    this.article = Object.assign({}, this.article, changes);
    this.saveArticle();
  }

  changePublicationStatus($event: any) {
    $event.stopPropagation();

    if (this.article.publicationStatus === 2) {
      this.article.publicationAt = new Date();
    }
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  initPublication(): FormGroup {
    return this.fb.group({
      by: this.article.publicationBy ? this.article.publicationBy : this.authService.userId,
      at: [this.article.publicationAt ? new Date(this.article.publicationAt.seconds * 1000) : new Date(), [Validators.compose([Validators.required])]],
      status: this.article.publicationStatus ? this.article.publicationStatus : 0
    });
  }

  resetPublication(): void {
    this.article.publicationStatus = 0;
    this.article.publicationAt = null;
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

  saveArticle() {
    let action;
    if (this.article.id) {
      action = this.articleService.updateArticle(this.article.id, this.article);
    } else {
      action = this.articleService.createArticle(this.article);
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
