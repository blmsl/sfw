import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { UserService } from '../../../shared/services/user/user.service';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { MatSnackBar } from '@angular/material';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'category-edit',
  templateUrl: 'category-edit.component.html'
})

export class CategoryEditComponent implements OnInit {

  public category: ICategory;
  public categoryTypes$: Observable<ICategoryType[]>;
  public users$: Observable<IUser[]>;
  public form: FormGroup;
  public titleMaxLength: number = 50;

  constructor(private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private alertService: AlertService,
    private categoryTypeService: CategoryTypeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
    this.users$ = userService.users$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { category: ICategory }) => this.category = data.category);

    this.form = this.fb.group({
      title: [this.category.title, [Validators.required, Validators.minLength(3), Validators.maxLength(this.titleMaxLength)]],
      assignedCategoryType: [this.category.assignedCategoryType, [Validators.required]],
      description: this.category.description,
      creation: this.initCreation()
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: ICategory) => {
      this.category = Object.assign({}, this.category, changes);
      if (!this.form.invalid) {
        this.saveCategory();
      }
    });

    if (this.category.isImported) {
      this.form.get('title').disable();
      this.form.get('assignedCategoryType').disable();
      this.form.get('creation').disable();
    }
  }

  initCreation() {
    return this.fb.group({
      at: this.category.creationAt,
      from: this.category.creationBy
    });
  }

  saveCategory(redirect: boolean = false) {
    let action;
    if (this.category.id) {
      action = this.categoryService.updateCategory(this.category.id, this.category);
    } else {
      action = this.categoryService.createCategory(this.category);
    }
    action.then(() => {
      this.alertService.showSnackBar('success', 'general.applications.updateMessage');
      if (redirect) this.redirectToList();
    },
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }

  redirectToList() {
    this.router.navigate(['/categories']).then();
  }

  removeCategory(category: ICategory) {
    this.categoryService.removeCategory(category).then(
      () => this.redirectToList(),
      (error: any) => this.alertService.showSnackBar('error', error.message)
    );
  }

}
