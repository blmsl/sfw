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

    let retItems: IArticle[] = [];

    if (!articles) {
      return;
    }

    if (!filters) {
      return articles;
    }

    for(let option in filters){
      if(filters[option]){

        console.log(typeof filters[option]);

        articles.filter((article: IArticle) => {
          console.log(article['creation']['by']);
          if(article['creation.by'] === filters[option]){
            console.log(option);
            retItems.push(article);
          }
        });
      }
    }

    return retItems;
  }

}
