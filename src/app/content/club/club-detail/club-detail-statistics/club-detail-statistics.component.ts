import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MemberStateService } from '../../../../shared/services/member/member-state.service';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'club-detail-statistics',
  templateUrl: './club-detail-statistics.component.html',
  styleUrls: ['./club-detail-statistics.component.scss']
})
export class ClubDetailStatisticsComponent implements OnInit {

  @Input() club: IClub;
  @Input() members: IMember[];
  @Input() seasons: ISeason[];
  @Input() teams: ITeam[];

  public savedSeason: ISeason;

  constructor(public memberStateService: MemberStateService) { }

  ngOnInit() {
  }

  isCurrentSeason(season: ISeason) {
    if (season !== this.savedSeason) {
      this.savedSeason = season;
      return false;
    }
  }

}
