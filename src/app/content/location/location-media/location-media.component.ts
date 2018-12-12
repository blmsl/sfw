import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILocation } from '../../../shared/interfaces/location/location.interface';

@Component({
  selector: 'location-media',
  templateUrl: './location-media.component.html',
  styleUrls: ['./location-media.component.scss']
})
export class LocationMediaComponent implements OnInit {

  public id: string;
  public itemType = 'location';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { location: ILocation }) => {
      this.id = data.location.id;
    });
  }

}
