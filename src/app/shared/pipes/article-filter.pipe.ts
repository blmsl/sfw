import { Pipe, PipeTransform } from '@angular/core';
import { IArticle } from '../interfaces/article.interface';

@Pipe({
  name: 'articleFilter'
})
export class ArticleFilterPipe implements PipeTransform {

  transform(articles: IArticle[], filters: {
    author: string,
    sorting: string,
    status: number,
    tags: string[]
  }): IArticle[] {

    let retItems: IArticle[];

    if (!articles) {
      return;
    }

    if (!filters) {
      return articles;
    }
    retItems = articles.filter(item => {
      let notMatchingField = Object.keys(filters).find(key => {

        let value = "";
        if (key == "creation" && filters[key].from) {
          value = item[key].from;
          return value !== filters[key].by
        }
        if (key == "publication" && filters[key].status) {
          value = item[key].status;
          return value !== filters[key].status
        }
      });

      return !notMatchingField; // true if matches all fields
    });

    return retItems;
  }

}
