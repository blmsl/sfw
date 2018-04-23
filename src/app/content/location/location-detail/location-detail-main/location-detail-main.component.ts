import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'location-detail-main',
  templateUrl: './location-detail-main.component.html',
  styleUrls: ['location-detail-main.component.scss']
})
export class LocationDetailMainComponent implements OnInit {

  @Input() location: ILocation;
  @Input() categories: ICategory[];

  constructor() {
  }

  ngOnInit() {
  }

}
