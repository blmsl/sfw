import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { LocationService } from '../../../shared/services/location/location.service';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ISeason } from '../../../shared/interfaces/season.interface';

@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationListComponent implements OnInit {

  @Input() categories: ILocation[];
  @Input() categoryTypes: ICategoryType[];
  @Input() locations: ILocation[];
  @Input() clubs: IClub[];
  @Input() seasons: ISeason[];

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder, private locationService: LocationService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 10,
      assignedCategory: ''
    });
  }

  removeLocation(location: ILocation) {
    this.locationService.removeLocation(location).then(() => {
      // this.form.controls['searchFor'].reset()
    }
    );
  }

}
