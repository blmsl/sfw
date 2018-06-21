import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ArticleService } from '../../../shared/services/article/article.service';
import { MatchService } from '../../../shared/services/match/match.service';
import { IMatch } from '../../../shared/interfaces/match.interface';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'location-detail',
  templateUrl: 'location-detail.component.html'
})

export class LocationDetailComponent implements OnInit {

  location: ILocation;
  categories$: Observable<ICategory[]>;
  articles$: Observable<IArticle[]>;
  members$: Observable<IMember[]>;
  matches$: Observable<IMatch[]>;
  locationImage: Observable<IMediaItem>;

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService,
    public categoryService: CategoryService,
    public memberService: MemberService,
    private locationService: LocationService,
    private matchService: MatchService,
    private mediaItemService: MediaItemService,
    private router: Router) {
    this.articles$ = articleService.articles$;
    this.categories$ = categoryService.categories$;
    this.matches$ = matchService.matches$;
    this.members$ = memberService.members$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { location: ILocation }) => this.location = data.location);

    if (!this.locationImage && this.location) {
      this.locationImage = this.mediaItemService.getCurrentImage(['locations', 'profile'], this.location.id);
    }

  }

  removeLocation(location: ILocation) {
    this.locationService.removeLocation(location).then(() => this.router.navigate(['/locations']).then());
  }

}
