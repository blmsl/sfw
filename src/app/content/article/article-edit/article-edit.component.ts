import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../shared/services/article/article.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  @ViewChild('settings') settings;

  public sidePanelOpened = true;
  public article: IArticle;
  /* public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;
  public locations$: Observable<ILocation[]>;
  public matches$: Observable<IMatch[]>;
  public users$: Observable<IUser[]>;
  public seasons$: Observable<ISeason[]>;
  public teams$: Observable<ITeam[]>;

  public words: number = 0;
  public characters: number = 0; */

  public form: FormGroup;

  public options: any = {
    dir: 'right',
    maxLines: 90000,
    printMargin: false
  };

  public publicationOptions: any[] = [
    {
      text: 'Set it live now',
      description: 'Publish this post immediately',
      value: 0
    },
    {
      text: 'Schedule it for later',
      description: 'Set automatic future publish date',
      value: 1
    }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private articleService: ArticleService,
    /* private categoryService: CategoryService,
    private categoryTypeService: CategoryTypeService,
    private locationService: LocationService,
    private userService: UserService,
    private seasonService: SeasonService,
    private teamService: TeamService, */
    private fb: FormBuilder) {
    /* this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
    this.locations$ = locationService.locations$;
    this.users$ = userService.users$;
    this.seasons$ = seasonService.seasons$;
    this.teams$ = teamService.teams$; */
  }

  ngOnInit() {
    this.route.data.subscribe((data: { article: IArticle }) => {
      this.article = data.article;
    });

    this.form = this.fb.group({
      title: [this.article.title, [Validators.required, Validators.minLength(10)]],
      subTitle: [this.article.subTitle],
      text: [this.article.text, [Validators.required, Validators.minLength(10)]],
      publication: this.initPublication(),
      creation: this.initCreation(),
      /* meta: this.initMetaData(),
      articleDate: this.article.articleDate,
      // postImage: string;
      postURL: [this.article.postURL],
      assignedTags: [this.article.assignedTags],
      assignedCategories: [this.article.assignedCategories],
      assignedTeams: [this.article.assignedTeams],
      assignedLocation: [this.article.assignedLocation],
      assignedSeason: [this.article.assignedSeason],
      assignedMatch: [this.article.assignedMatch],
      isFeaturedPost: [this.article.isFeaturedPost],
      isMatch: !!(this.article.assignedMatch) */
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      console.log(changes);
      // changes.isMatch = null;
    });
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
      }),
      twitter: this.fb.group({
        title: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter : '',
        description: this.article.meta && this.article.meta.twitter ? this.article.meta.twitter.description : '',
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

  remove(): void {
    if (this.article.id) {
      this.articleService.removeArticle(this.article).then(() => this.redirectToList());
    } else {
      this.redirectToList();
    }
  }

  redirectToList(): void {
    this.router.navigate(['/articles']).then();
  }

}
