import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IMatch } from '../../../shared/interfaces/match/match.interface';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { MatchService } from '../../../shared/services/match/match.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { LocationService } from '../../../shared/services/location/location.service';
import {
  Observable,
  Subscription
} from 'rxjs/index';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../shared/services/team/team.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { SeasonService } from '../../../shared/services/season/season.service';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ArticleService } from '../../../shared/services/article/article.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { IUsePropertyDecoratorConfig } from 'codelyzer/propertyDecoratorBase';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { MediaGalleryService } from '../../../shared/services/media/media-gallery.service';
import { IMediaGallery } from '../../../shared/interfaces/media/media-gallery.interface';

@Component({
  selector: 'match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.scss']
})
export class MatchEditComponent implements OnInit, OnDestroy, OnChanges {

  public match: IMatch;
  public form: FormGroup;

  public assignedMembers$: Observable<IMember[]>;
  public articles$: Observable<IArticle[]>;
  public locations$: Observable<ILocation[]>;
  public categories$: Observable<ICategory[]>;
  public seasons$: Observable<ISeason[]>;
  public teams$: Observable<ITeam[]>;

  public otherMatchEventList: {
    id: number;
    title: string;
  }[];
  public matchEventCategories: {
    id: number;
    title: string;
  }[];

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [],
    itemId: '',
    queueLimit: 5,
  };

  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;

  private teamSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private matchService: MatchService,
    private alertService: AlertService,
    private locationService: LocationService,
    private teamService: TeamService,
    private categoryService: CategoryService,
    private categoryTypeService: CategoryTypeService,
    private seasonService: SeasonService,
    private articleService: ArticleService,
    private memberService: MemberService,
    private mediaItemService: MediaItemService,
    private mediaGalleryService: MediaGalleryService,
    private router: Router) {
    this.categories$ = this.categoryService.getCategoriesByCategoryType('team.types');
    this.locations$ = locationService.locations$;
    this.teams$ = teamService.teams$;
    this.seasons$ = seasonService.seasons$;
    this.otherMatchEventList = matchService.getOtherEventList();
    this.matchEventCategories = matchService.getMatchEventCategories();
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => {
      this.match = data.match;
      this.getAssignedPlayers();
      this.uploaderOptions.itemId = this.match.id;
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.match.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.match.id);
    });
  }

  ngOnChanges() {
    this.getAssignedPlayers();
  }

  getAssignedPlayers() {
    if (this.match.id && !this.assignedMembers$) {
      this.teamSubscription = this.teamService.getTeamById(this.match.assignedTeam).subscribe((team: ITeam) => {
        this.assignedMembers$ = this.memberService.getMembersByIds(team.assignedPlayers);
      });
    }
  }

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  /*
   initCreation(): FormGroup {
   return this.fb.group({
   at: this.match.creationAt.toDate(),
   from: this.match.creationBy
   });
   }

   initPublication(publication: IPublication): FormGroup {
   return this.fb.group({
   dateTime: publication.dateTime,
   from: publication.from,
   status: publication.status
   });
   } */

  removeMatch(match: IMatch): void {
    this.matchService.removeMatch(match).then(
      () => this.router.navigate(['matches']).then(),
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

  saveMatch(match: IMatch): void {
    let action;
    this.match = Object.assign({}, this.match, match);
    if (this.match.id) {
      action = this.matchService.updateMatch(this.match.id, this.match);
    } else {
      action = this.matchService.createMatch(this.match);
    }
    action.then(
      () => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

}
