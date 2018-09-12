import {
  Component,
  Input,
  OnInit
}                   from '@angular/core';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IUser }    from '../../../../shared/interfaces/user/user.interface';

@Component({
  selector: 'article-authors-stats',
  templateUrl: './article-authors-stats.component.html',
  styleUrls: [ './article-authors-stats.component.scss' ]
})
export class ArticleAuthorsStatsComponent implements OnInit {

  @Input() articles: IArticle[];
  @Input() users: IUser[];

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

  constructor() {
  }

  ngOnInit() {
    let data = [];

    if (this.articles) {
      for (let i = 0; i < this.articles.length; i++) {

        //this.doughnutChartData[] = this.articles[ i ].id;

        let author = this.users.find((user: IUser) => {
          return user.id === this.articles[i].creation.by;
        });
        const name = author.firstName + '' + author.lastName + ' ('+ author.email + ')';
        if(this.doughnutChartLabels.indexOf(name) === -1){
          this.doughnutChartLabels.push(author.firstName + '' + author.lastName + ' ('+ author.email + ')');
        }

        /*if (!(this.articles[ i ].creation.by in data)) {
          this.doughnutChartLabels.push(this.articles[ i ].creation.by);
        }

        /*let categoryCounter: number = 0;
         for (let j = 0; j < this.categories.length; j++) {
         if (this.categories[j].assignedCategoryType === this.categoryTypes[i].id) {
         categoryCounter++;
         }
         }*/
        /*this.translateService.get('general.menu.' + this.categoryTypes[i].link + '.main').subscribe(
         (translation: string) => this.doughnutChartLabels.push(translation)
         );*/
      }
      this.isDataAvailable = true;
    }
  }

}
