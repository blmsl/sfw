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

        let value: any;
        if (key == "creation" && filters[key].by) {
          value = item[key].by;
          return value !== filters[key].by
        }
        if (key == "publication" && filters[key].status) {
          value = item[key].status;
          return value !== filters[key].status
        }
      });

      return !notMatchingField; // true if matches all fields
    });


    if (filters["sorting"]) {
      const sorting = filters["sorting"];
      if (sorting == "asc") {
        retItems = retItems.sort((a, b) => {
          return b.creation.at.seconds - a.creation.at.seconds;
        });
      } else if (sorting == "desc") {
        retItems = retItems.sort((a, b) => {
          return a.creation.at.seconds - b.creation.at.seconds;
        });
      }
    }
    return retItems;
  }

}
