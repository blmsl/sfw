import { NgModule } from '@angular/core';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationsComponent } from './locations/locations.component';
import { locationRoutingModule } from './location-routing.module';
import { LocationResolver } from './location.resolver';
import { SharedModule } from '../../shared/shared.module';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { LocationService } from '../../shared/services/location/location.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { MemberService } from '../../shared/services/member/member.service';
import { LocationDetailMainComponent } from './location-detail/location-detail-main/location-detail-main.component';
import { LocationDetailMapComponent } from './location-detail/location-detail-map/location-detail-map.component';
import { AgmCoreModule } from '@agm/core';
import { MapsService } from '../../shared/services/maps/maps.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationDetailContactComponent } from './location-detail/location-detail-contact/location-detail-contact.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationEditAddressComponent } from './location-edit/location-edit-address/location-edit-address.component';
import { LocationEditContactComponent } from './location-edit/location-edit-contact/location-edit-contact.component';
import { LocationContactFormComponent } from './location-edit/location-contact-form/location-contact-form.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { LocationsByCategoryComponent } from './location-statistics/locations-by-category/locations-by-category.component';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PublicationModule } from '../../shared/components/publication/publication.module';
import { CreationModule } from '../../shared/components/creation/creation.module';
import { SharedCategoryModule } from '../../shared/components/category/shared-category.module';
import { LocationStatisticsComponent } from './location-statistics/location-statistics.component';
import { MatchService } from '../../shared/services/match/match.service';
import { LocationMapFilterComponent } from './location-map/location-map-filter/location-map-filter.component';
import { LocationDetailArticleComponent } from './location-detail/location-detail-article/location-detail-article.component';
import { LocationDetailMatchesComponent } from './location-detail/location-detail-matches/location-detail-matches.component';
import { LocationMediaComponent } from './location-media/location-media.component';

@NgModule({
  imports: [
    AgmCoreModule,
    ChartsModule,
    CreationModule,
    HttpClientModule,
    locationRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    PerfectScrollbarModule,
    PublicationModule,
    SharedCategoryModule,
    SharedModule
  ],
  declarations: [
    LocationContactFormComponent,
    LocationDetailComponent,
    LocationDetailContactComponent,
    LocationDetailMapComponent,
    LocationEditAddressComponent,
    LocationEditComponent,
    LocationEditContactComponent,
    LocationListComponent,
    LocationMapComponent,
    LocationsComponent,
    LocationDetailMainComponent,
    LocationsByCategoryComponent,
    LocationStatisticsComponent,
    LocationMapFilterComponent,
    LocationDetailArticleComponent,
    LocationDetailMatchesComponent,
    LocationMediaComponent
  ],
  providers: [
    ArticleService,
    CategoryService,
    CategoryTypeService,
    LocationResolver,
    LocationService,
    MapsService,
    MatchService,
    MemberService,
    PendingChangesGuard
  ]
})
export class LocationModule {
}
