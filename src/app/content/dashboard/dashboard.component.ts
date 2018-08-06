import { Component, VERSION, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../shared/services/member/member.service';
import { Observable } from 'rxjs';
import { IMember } from '../../shared/interfaces/member/member.interface';
import * as moment from 'moment';
import { IMatch } from '../../shared/interfaces/match/match.interface';
import { MatchService } from '../../shared/services/match/match.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { CategoryService } from '../../shared/services/category/category.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { ArticleService } from '../../shared/services/article/article.service';
import { IArticle } from '../../shared/interfaces/article.interface';
import { IClub } from '../../shared/interfaces/club/club.interface';
import { IMediaItem } from '../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../shared/services/media/media-item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent /* implements OnInit */ {

  public angularVersion: string;
  public env: any;
  public mindForm: FormGroup;

  public articles$: Observable<IArticle[]>;
  public members$: Observable<IMember[]>;
  public matches$: Observable<IMatch[]>;
  public categories$: Observable<ICategory[]>;

  public today = moment();
  public inTwoWeeks = moment().add(2, 'weeks');
  public inLastTwoWeeks = moment().subtract(2, 'weeks');
  public tomorrow = moment().add(1, 'days');
  public yesterday = moment().subtract(1, 'days');

  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  constructor(private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    public memberService: MemberService,
    public matchService: MatchService) {

    this.angularVersion = VERSION.full;
    this.env = environment;

    this.articles$ = articleService.articles$;
    this.categories$ = categoryService.categories$;
    this.members$ = memberService.members$;
    this.matches$ = matchService.matches$;
  }

  ngOnInit() {
    this.mindForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  /*
  public clubLogo: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService) {
  }

  getClubLogo(club: IClub): Observable<IMediaItem> {
    if (!this.clubLogo) {
      this.clubLogo = this.mediaItemService.getCurrentImage(['clubs', 'profile'], club.id);
    }
    return this.clubLogo;
  } */

}
