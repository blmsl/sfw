import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IApplication } from '../../../shared/interfaces/application.interface';
import { ApplicationService } from '../../../shared/services/application/application.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public application: IApplication;
  public form: FormGroup;

  public categories$: Observable<ICategory[]>;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private title: Title,
    private translateService: TranslateService,
    private categoryService: CategoryService,
    private applicationService: ApplicationService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('static.types');
  }

  ngOnInit() {
    this.route.data.subscribe((data: { application: IApplication }) => {
      this.application = data.application;
    });
  }

  saveApplication(application: IApplication) {
    this.application = Object.assign({}, this.application, application);
    this.applicationService.updateApplication(application.id, application).then(() => {
      // set Page Title
      if (this.title.getTitle() !== application.page.title) {
        this.title.setTitle(application.page.title);
      }

      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          status: 'success',
          message: 'general.applications.updateMessage'
        },
        duration: 2500
      });
    },
      (error: any) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'error',
            message: error
          },
          duration: 2500
        });
      });
  }

}
