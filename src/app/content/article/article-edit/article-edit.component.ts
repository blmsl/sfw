import {
  Component,
  OnInit
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
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { LocationService } from '../../../shared/services/location/location.service';
import { TeamService } from '../../../shared/services/team/team.service';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { SeasonService } from '../../../shared/services/season/season.service';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { IMatch } from '../../../shared/interfaces/match.interface';
import { MatchService } from '../../../shared/services/match/match.service';
import { ArticleService } from '../../../shared/services/article/article.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  public article: IArticle;
  public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;
  public locations$: Observable<ILocation[]>;
  public matches$: Observable<IMatch[]>;
  public members$: Observable<IMember[]>;
  public seasons$: Observable<ISeason[]>;
  public teams$: Observable<ITeam[]>;

  // public enableWordsCount: boolean = true;
  // public enableCharactersCount: boolean = true;
  public viewSrcMode: boolean = false;

  public words: number = 0;
  public characters: number = 0;

  public form: FormGroup;

  public options: any = {
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
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private categoryTypeService: CategoryTypeService,
    private locationService: LocationService,
    private matchService: MatchService,
    private memberService: MemberService,
    private seasonService: SeasonService,
    private teamService: TeamService,
    private fb: FormBuilder) {
    // this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
    /* this.locations$ = locationService.locations$;
     this.matches$ = matchService.matches$;
     this.members$ = memberService.members$;
     this.seasons$ = seasonService.seasons$;
     this.teams$ = teamService.teams$; */
  }

  ngOnInit() {
    this.route.data.subscribe((data: { article: IArticle }) => {
      this.article = data.article;
    });

    this.form = this.fb.group({
      title: [this.article.title, [Validators.required, Validators.minLength(10)]],
      // subTitle: [this.article.subTitle],
      text: [this.article.text, [Validators.required, Validators.minLength(10)]],
      publication: this.initPublication()
      /* creation: this.initCreation(),
       meta: this.initMetaData(),
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
        title: this.article.meta.main.title,
        description: this.article.meta.main.description
      }),
      facebook: this.fb.group({
        title: this.article.meta.facebook.title,
        description: this.article.meta.facebook.description
      }),
      twitter: this.fb.group({
        title: this.article.meta.twitter.title,
        description: this.article.meta.twitter.description
      })
    });
  }

  initPublication(): FormGroup {
    return this.fb.group({
      by: this.article.publication.from,
      date: this.article.publication.date,
      time: this.article.publication.time,
      status: this.article.publication.status
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

  toggleView(): void {
    this.viewSrcMode = !this.viewSrcMode;
  }

  remove(): void {
    if (this.article.id) {
      this.articleService.removeArticle(this.article).then(() => this.redirectToList());
    } else {
      this.redirectToList();
    }
  }

  redirectToList(): void {
    this.router.navigate(['/categories']).then();
  }

}
