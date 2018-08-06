import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'club-detail-management',
  templateUrl: './club-detail-management.component.html',
  styleUrls: ['./club-detail-management.component.scss']
})
export class ClubDetailManagementComponent implements OnInit {

  @Input() club: IClub;
  @Input() positions: ICategory[];
  @Input() members: IMember[];

  public step = -1;

  ngOnInit() {

  }

  setStep(index: number) {
    this.step = index;
  }
}
