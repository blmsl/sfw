import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                               from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                               from '@angular/forms';
import { IApplication }         from '../../../../shared/interfaces/application.interface';
import { Observable }           from 'rxjs';
import { ICategory }            from '../../../../shared/interfaces/category.interface';
import { IStaticPage }          from '../../../../shared/interfaces/static-page.interface';
import { TranslateService }     from '@ngx-translate/core';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: [ 'static-pages.component.scss' ]
})
export class StaticPagesComponent implements OnInit {

  @Input() application: IApplication;
  @Input() categories: ICategory[];
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;
  public selectedStaticPage: number = -1;

  constructor(private translateService: TranslateService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      staticPages: this.initStaticPages()
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: IStaticPage[]) => {
      if (this.form.valid) {
        this.application = Object.assign({}, this.application, changes);
        this.saveApplication.emit(this.application);
      }
    });
  }

  initStaticPages(): FormArray {
    const formArray = [];
    if (this.application.staticPages) {
      for (let i = 0; i < this.application.staticPages.length; i++) {
        formArray.push(this.initStaticPage(this.application.staticPages[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initStaticPage(staticPage: IStaticPage): FormGroup {
    return this.fb.group({
      isEnabled: [ staticPage.isEnabled ],
      assignedCategories: [ staticPage.assignedCategories, [ Validators.required ] ],
      text: [ staticPage.text, [ Validators.required ] ],
      title: [ staticPage.title, [ Validators.required ] ]
    });
  }

  setSelectedStaticPage(i: number): void {
    this.selectedStaticPage = i;
  }

  getNewStaticPageTitle(): Observable<string> {
    return this.translateService.get('general.applications.static.noTitle');
  }

  addStaticPage(): void {
    this.getNewStaticPageTitle().subscribe((staticPageTitle: string) => {
      const control = this.form.get('staticPages') as FormArray;

      const staticPage: IStaticPage = {
        isEnabled: true,
        assignedCategories: [],
        text: '',
        title: control.length === 0 ? staticPageTitle : staticPageTitle + ' (' + control.length + ')'
      };
      control.push(this.initStaticPage(staticPage));
    });
  }

  removeStaticPage(i: number): void {
    const control = this.form.get('staticPages') as FormArray;
    control.removeAt(i);
  }

}
