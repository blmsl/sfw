import { NgModule } from '@angular/core';
import { sfwCalendarRoutes } from './sfw-calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MemberService } from '../../shared/services/member/member.service';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { CalendarService } from '../../shared/services/calendar/calendar.service';
import { ApplicationService } from '../../shared/services/application/application.service';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { FullCalendarModule } from 'ng-fullcalendar';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MatDialogModule } from '@angular/material';
import { MediaGalleryListComponent } from '../../shared/components/media/media-gallery-list/media-gallery-list.component';
import { MediaItemInfoComponent } from '../../shared/components/media/media-center/media-item-info/media-item-info.component';
import { MediaItemsListModalComponent } from '../../shared/components/media/media-gallery-form/media-items-list-modal/media-items-list-modal.component';

@NgModule({
  imports: [
    AngularFireFunctionsModule,
    FlexLayoutModule,
    FullCalendarModule,
    MatDialogModule,
    RouterModule.forChild(sfwCalendarRoutes),
    SharedModule
  ],
  declarations: [
    CalendarDashboardComponent,
    EventDetailComponent
  ],
  entryComponents: [
    EventDetailComponent
  ],
  providers: [
    ApplicationService,
    CalendarService,
    MemberService,
    {
      provide: FunctionsRegionToken,
      useValue: 'europe-west1'
    }
  ]
})

export class SFWCalendarModule {
}
