import { NgModule } from '@angular/core';
import { sfwCalendarRoutes } from './sfw-calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MemberService } from '../../shared/services/member/member.service';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { CalendarService } from '../../shared/services/calendar/calendar.service';
import { ApplicationService } from '../../shared/services/application/application.service';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  imports: [
    AngularFireFunctionsModule,
    FlexLayoutModule,
    FullCalendarModule,
    RouterModule.forChild(sfwCalendarRoutes),
    SharedModule
  ],
  declarations: [
    CalendarDashboardComponent
  ],
  providers: [
    ApplicationService,
    CalendarService,
    MemberService
  ]
})

export class SFWCalendarModule {
}
