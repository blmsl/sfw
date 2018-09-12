import { Component, Input, OnChanges } from '@angular/core';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'categories-by-category-type',
  templateUrl: 'categories-by-category-type.component.html'
})
export class CategoriesByCategoryTypeComponent implements OnChanges {

  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];

  public isDataAvailable: boolean = false;

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

  constructor(private translateService: TranslateService) {
  }

  ngOnChanges() {
    if (this.categories && this.categoryTypes) {
      for (let i = 0; i < this.categoryTypes.length; i++) {
        let categoryCounter: number = 0;
        for (let j = 0; j < this.categories.length; j++) {
          if (this.categories[j].assignedCategoryType === this.categoryTypes[i].id) {
            categoryCounter++;
          }
        }
        this.translateService.get('general.menu.' + this.categoryTypes[i].link + '.main').subscribe(
          (translation: string) => this.doughnutChartLabels.push(translation)
        );
        this.doughnutChartData.push(categoryCounter);
      }
      this.isDataAvailable = true;
    }
  }

}
