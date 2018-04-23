import { Component } from '@angular/core';
import { ClubService } from '../../../shared/services/club/club.service';
import { Observable } from 'rxjs';
import { IClub } from '../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'clubs',
  templateUrl: 'clubs.component.html'
})

export class ClubsComponent {

  public clubs$: Observable<IClub[]>;

  constructor(public clubService: ClubService) {
    this.clubs$ = clubService.clubs$;
  }

  removeClub(club: IClub) {

  }

  updateClub(club: IClub) {

  }

}
