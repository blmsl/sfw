import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ICategory } from '../../../../../shared/interfaces/category.interface';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';
import { IClubManagement } from '../../../../../shared/interfaces/club/club-management.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'club-management-list',
  templateUrl: './club-management-list.component.html',
  styleUrls: ['./club-management-list.component.scss']
})
export class ClubManagementListComponent implements OnInit {

  @Input() members: IMember[];
  @Input() positions: ICategory[];
  @Input() showLinks: boolean;

  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);
  @Output() editManagementPosition: EventEmitter<IClubManagement> = new EventEmitter<IClubManagement>(false);

  public step = -1;
  public club: IClub;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });
  }

  setStep(i: number) {
    this.step = i;
  }

  removeManagementPosition(position: IClubManagement) {
    this.club.positions.splice(this.club.positions.indexOf(position), 1);
    this.saveClub.emit(this.club);
  }

}
