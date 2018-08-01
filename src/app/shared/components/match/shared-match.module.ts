import { NgModule } from '@angular/core';
import { MatchFilterPipe } from '../../pipes/match-filter.pipe';
import { MatchNoResultFilterPipe } from '../../pipes/match-no-result-filter.pipe';
import { MatchListComponent } from './match-list/match-list.component';
import { SharedModule } from '../../shared.module';
import { MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatchResultInputComponent } from './match-result-input/match-result-input.component';

@NgModule({
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    SharedModule
  ],
  declarations: [
    MatchFilterPipe,
    MatchNoResultFilterPipe,
    MatchListComponent,
    MatchResultInputComponent
  ],
  exports: [
    MatchFilterPipe,
    MatchNoResultFilterPipe,
    MatchListComponent
  ],
  providers: []
})
export class SharedMatchModule {
}
