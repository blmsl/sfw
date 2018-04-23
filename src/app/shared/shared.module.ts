import { NgModule } from '@angular/core';
import { MenuItemsService } from './services/menu/menu-items.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { LinkModule } from './components/links/link.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { UserService } from './services/user/user.service';
import { RouterModule } from '@angular/router';
import { SubmitIfValidDirective } from './directives/submit/submit-if-valid.directive';

@NgModule({
  declarations: [
    LoadingIndicatorComponent,
    SanitizeHtmlPipe,
    SnackbarComponent,
    SubmitIfValidDirective
  ],
  entryComponents: [
    SnackbarComponent
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    FlexLayoutModule,
    LinkModule,
    LoadingIndicatorComponent,
    NgPipesModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SanitizeHtmlPipe,
    // SubmitIfValidDirective,
    TranslateModule
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    /* NgPipesModule,
    RouterModule,
    TranslateModule*/
  ],
  providers: [
    /* MenuItemsService,
    UserService */
  ]
})
export class SharedModule {
}
