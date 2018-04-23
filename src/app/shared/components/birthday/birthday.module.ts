import { NgModule } from '@angular/core';
import { BirthdayFilterPipe } from '../../pipes/birthday-filter.pipe';
import { BirthdayRangeFilterPipe } from '../../pipes/birthday-range-filter.pipe';

@NgModule({
  imports: [],
  declarations: [
    BirthdayFilterPipe,
    BirthdayRangeFilterPipe
  ],
  exports: [
    BirthdayFilterPipe,
    BirthdayRangeFilterPipe
  ],
  providers: []
})
export class BirthdayModule {
}
