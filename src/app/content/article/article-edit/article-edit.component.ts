import {
  Component,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ArticleService } from '../../../shared/services/article/article.service';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';

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
  public form: FormGroup;

  public publicationOptions: any[] = [
    {
      text: 'live.text',
      description: 'live.description',
      value: 0
    },
    {
      text: 'schedule.text',
      description: 'schedule.description',
      value: 1
    }
  ];

  private showPreview: boolean = false;

  constructor(private route: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private zone: NgZone,
    private articleService: ArticleService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { article: IArticle }) => {
      this.article = data.article;
    });

    this.breakpointObserver
      .observe(['(min-width: ' + SMALL_WIDTH_BREAKPOINT + 'px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sidePanelOpened = true;
        } else {
          this.sidePanelOpened = false;
        }
        this.isSmallDevice = !this.sidePanelOpened;
        console.log(this.isSmallDevice);
      });

    this.form = this.fb.group({
      title: [this.article.title, [Validators.required, Validators.minLength(10)]],
      subTitle: [this.article.subTitle],
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
      assignedSeason: [this.article.assignedSeason],
      assignedMatch: [this.article.assignedMatch],
      isFeaturedPost: [this.article.isFeaturedPost],
      isMatch: !!(this.article.assignedMatch)
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      console.log(changes);
      // changes.isMatch = null;
    });
  }

  togglePreview():void {
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
      date: this.article.publication ? this.article.publication.date : '',
      time: this.article.publication ? this.article.publication.time : '',
      status: this.article.publication ? this.article.publication.status : 0
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      by: this.article.creation.from,
      at: this.article.creation.at
    });
  }

  changeStatus(value: any) {
    console.log(value);
    return false;
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
