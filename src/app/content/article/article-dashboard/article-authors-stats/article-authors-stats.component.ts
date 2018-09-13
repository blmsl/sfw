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

        let author = this.users.find((user: IUser) => {
          return user.id === this.articles[i].creation.by;
        });
        const name = author.firstName && author.lastName ? author.firstName +' ' + author.lastName : author.email;
        if(this.doughnutChartLabels.indexOf(name) === -1){
          this.doughnutChartLabels.push(name);
        }

        if(data.indexOf(name) === -1){
          data[name] = 1;
        } else {
          console.log(data[name]);
          data[name] = data[name]+ 1;
        }
        console.log(data);


      }
      this.isDataAvailable = true;
    }
  }

}
