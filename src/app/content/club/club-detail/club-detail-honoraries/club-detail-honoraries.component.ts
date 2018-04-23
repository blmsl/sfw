import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'club-detail-honoraries',
  templateUrl: './club-detail-honoraries.component.html',
  styleUrls: ['./club-detail-honoraries.component.scss']
})
export class ClubDetailHonorariesComponent implements OnInit {

  @Input() club: IClub;
  @Input() articles: IArticle[];
  @Input() members: IMember[];

  constructor() { }

  ngOnInit() {
  }

}
