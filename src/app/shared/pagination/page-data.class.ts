import { Page } from './page.class';

export class PagedData<T> {
  data = new Array<T>();
  page = new Page();
}
