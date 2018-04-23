import { NgModule } from '@angular/core';
import { CategoryFilterPipe } from '../../pipes/category-filter.pipe';

@NgModule({
  imports: [],
  declarations: [
    CategoryFilterPipe
  ],
  exports: [
    CategoryFilterPipe
  ],
  providers: []
})
export class SharedCategoryModule {
}
