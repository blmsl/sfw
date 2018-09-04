import { NgModule } from '@angular/core';
import { MatchFilterPipe } from '../../pipes/match-filter.pipe';
import { MatchNoResultFilterPipe } from '../../pipes/match-no-result-filter.pipe';
import { MatchListComponent } from './match-list/match-list.component';
import { SharedModule } from '../../shared.module';
import { MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatchResultInputComponent } from './match-result-input/match-result-input.component';
import { MatchListItemComponent } from './match-list/match-list-item/match-list-item.component';
import { MatchPlayerComponent } from './match-player/match-player.component';
import { SkyhookDndModule } from 'angular-skyhook';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterModule,
    SkyhookDndModule,
    SharedModule
  ],
  declarations: [
    MatchFilterPipe,
    MatchNoResultFilterPipe,
    MatchListComponent,
    MatchPlayerComponent,
    MatchResultInputComponent,
    MatchListItemComponent
  ],
  exports: [
    MatchFilterPipe,
    MatchPlayerComponent,
    MatchNoResultFilterPipe,
    MatchListComponent
  ],
  providers: []
})
export class SharedMatchModule {
}
