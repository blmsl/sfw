import {
  Component,
  OnInit
}                           from '@angular/core';
import {
  ActivatedRoute,
  Router
}                           from '@angular/router';
import { CategoryService }  from '../../../shared/services/category/category.service';
import { ILocation }        from '../../../shared/interfaces/location/location.interface';
import { IArticle }         from '../../../shared/interfaces/article.interface';
import { IMember }          from '../../../shared/interfaces/member/member.interface';
import { MemberService }    from '../../../shared/services/member/member.service';
import { LocationService }  from '../../../shared/services/location/location.service';
import { Observable }       from 'rxjs';
import { ICategory }        from '../../../shared/interfaces/category.interface';
import { ArticleService }   from '../../../shared/services/article/article.service';
import { MatchService }     from '../../../shared/services/match/match.service';
import { IMatch }           from '../../../shared/interfaces/match/match.interface';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { IMediaItem }       from '../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'location-detail',
  templateUrl: 'location-detail.component.html'
})

export class LocationDetailComponent implements OnInit {

  location: ILocation;
  category$: Observable<ICategory>;

  assignedArticles$: Observable<IArticle[]>;
  assignedMembers$: Observable<IMember[]>;
  assignedMatches$: Observable<IMatch[]>;
  locationImage: Observable<IMediaItem>;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private categoryService: CategoryService,
              private memberService: MemberService,
              private locationService: LocationService,
              private matchService: MatchService,
              private mediaItemService: MediaItemService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { location: ILocation }) => {
      this.location = data.location;
      this.assignedArticles$ = this.articleService.getArticlesForLocation(this.location);
      this.category$ = this.categoryService.getCategoryById(this.location.assignedCategory);
      this.assignedMembers$ = this.memberService.getMembersByLocationContacts(this.location.assignedContacts);
      this.assignedMatches$ = this.matchService.getMatchesForLocation(this.location);
    });

    if (!this.locationImage && this.location) {
      this.locationImage = this.mediaItemService.getCurrentImage([ 'locations', 'profile' ], this.location.id);
    }

  }

  removeLocation(location: ILocation) {
    this.locationService.removeLocation(location).then(() => this.router.navigate([ '/locations' ]).then());
  }

}
