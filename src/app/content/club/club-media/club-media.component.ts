import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClub } from '../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-media',
  templateUrl: './club-media.component.html',
  styleUrls: ['./club-media.component.scss']
})
export class ClubMediaComponent implements OnInit {

  public id: string;
  public itemType = 'club';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.id = data.club.id;
    });
  }

}
