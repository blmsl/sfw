import { NgModule } from '@angular/core';
import { MatchFilterPipe } from '../../pipes/match-filter.pipe';
import { MatchNoResultFilterPipe } from '../../pipes/match-no-result-filter.pipe';
import { MatchListComponent } from './match-list/match-list.component';
import { SharedModule } from '../../shared.module';
import { MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    SharedModule
  ],
  declarations: [
    MatchFilterPipe,
    MatchNoResultFilterPipe,
    MatchListComponent
  ],
  exports: [
    MatchFilterPipe,
    MatchNoResultFilterPipe,
    MatchListComponent
  ],
  providers: []
})
export class MatchModule {
}
