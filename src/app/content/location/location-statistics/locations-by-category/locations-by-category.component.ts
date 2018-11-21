import {
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';

@Component({
  selector: 'locations-by-category',
  templateUrl: './locations-by-category.component.html',
  styleUrls: ['./locations-by-category.component.scss']
})
export class LocationsByCategoryComponent implements OnChanges {

  @Input() categories: ICategory[];
  @Input() locations: ILocation[];

  public isDataAvailable = false;

  globalChartOptions: any = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom'
    }
  };

  doughnutChartLabels: string[] = [];
  doughnutChartData: number[] = [];
  doughnutChartType = 'doughnut';
  doughnutOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.globalChartOptions);

  constructor() {
  }

  ngOnChanges() {
    if (this.categories && this.locations) {
      for (let i = 0; i < this.categories.length; i++) {

        let locationCounter = 0;
        for (let j = 0; j < this.locations.length; j++) {
          if (this.locations[j].assignedCategory === this.categories[i].id) {
            locationCounter++;
          }
        }
        this.doughnutChartLabels.push(this.categories[i].title);
        this.doughnutChartData.push(locationCounter);
      }
      this.isDataAvailable = true;
    }
  }

}
