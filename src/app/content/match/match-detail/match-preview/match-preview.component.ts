import { Component, Input, OnInit } from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';
import { LocationService } from '../../../../shared/services/location/location.service';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'match-preview',
  templateUrl: './match-preview.component.html',
  styleUrls: ['./match-preview.component.scss']
})
export class MatchPreviewComponent implements OnInit {

  @Input() match: IMatch;
  @Input() title: string;
  @Input() categories: ICategory[];
  public locations$: Observable<ILocation[]>;

  constructor(private locationService: LocationService) {
    this.locations$ = locationService.locations$;
  }

  ngOnInit() {
  }

}
