import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(items: any[], searchField: string, values: string[]): any[] {
    if (!items) {
      return;
    }

    if (!values || values.length === 0) {
      return items;
    }

    let retItems = items.filter((item: any) => {
      return values.some((cat) => {
        return item[searchField].indexOf(cat) > -1;
      });
    });

    return retItems;
  }

}
