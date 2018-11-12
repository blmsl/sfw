import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ClubService } from '../../../../services/club/club.service';
import { Observable } from 'rxjs';
import { ArticleService } from '../../../../services/article/article.service';
import { LocationService } from '../../../../services/location/location.service';
import { MatchService } from '../../../../services/match/match.service';
import { MemberService } from '../../../../services/member/member.service';
import { SponsorService } from '../../../../services/sponsor/sponsor.service';
import { TeamService } from '../../../../services/team/team.service';
import { FormGroup } from '@angular/forms';
import { SeasonService } from '../../../../services/season/season.service';
import { ISeason } from '../../../../interfaces/season.interface';
import * as moment from 'moment';

@Component({
  selector: 'media-gallery-form-assigned-objects',
  templateUrl: './media-gallery-form-assigned-objects.component.html',
  styleUrls: ['./media-gallery-form-assigned-objects.component.scss']
})
export class MediaGalleryFormAssignedObjectsComponent implements OnInit, OnChanges {

  @Input() assignedItemType: string;
  @Input() form: FormGroup;
  @Input() seasons: ISeason[];

  public assignedItems$: Observable<any[]>;
  public isLoading: boolean = false;
  public moment: any;

  constructor(private articleService: ArticleService,
    private clubService: ClubService,
    private locationService: LocationService,
    private matchService: MatchService,
    private memberService: MemberService,
    private sponsorService: SponsorService,
    private teamService: TeamService,
    private seasonService: SeasonService) {
    this.moment = moment;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getAssignedItems(changes.assignedItemType.currentValue);
  }

  ngOnInit() {
    this.getAssignedItems(this.assignedItemType);
  }

  getAssignedItems(assignedItemType: string): void {
    this.isLoading = true;
    switch (assignedItemType) {
      case 'article':
        this.assignedItems$ = this.articleService.articles$;
        break;
      case 'club':
        this.assignedItems$ = this.clubService.clubs$;
        break;
      case 'location':
        this.assignedItems$ = this.locationService.locations$;
        break;
      case 'match':
        this.assignedItems$ = this.matchService.matches$;
        break;
      case 'member':
        this.assignedItems$ = this.memberService.members$;
        break;
      case 'sponsor':
        this.assignedItems$ = this.sponsorService.sponsors$;
        break;
      case 'team':
        this.assignedItems$ = this.teamService.teams$;
        break;
    }
    this.isLoading = false;
  }

}
