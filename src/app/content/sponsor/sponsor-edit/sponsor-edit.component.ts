import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'sponsor-edit',
  templateUrl: './sponsor-edit.component.html'
})
export class SponsorEditComponent implements OnInit {

  public sponsor: ISponsor;
  public form: FormGroup;
  public categories$: Observable<ICategory[]>;

  @ViewChild('description') description: QuillEditorComponent;

  public titleMaxLength: number = 50;

  constructor(private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private sponsorService: SponsorService,
    public categoryService: CategoryService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('sponsor.types');
  }

  ngOnInit() {
    this.route.data.subscribe((data: { sponsor: ISponsor }) => this.sponsor = data.sponsor);

    this.form = this.fb.group({
      title: [this.sponsor.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      externalLink: this.sponsor.externalLink,
      description: this.sponsor.description,
      assignedCategories: [this.sponsor.assignedCategories, [Validators.required]],
      startDate: this.sponsor.startDate,
      endDate: this.sponsor.endDate,
      internalInfo: this.sponsor.internalInfo,
      imageUrl: this.sponsor.imageUrl
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: ISponsor) => {
      this.sponsor = Object.assign({}, this.sponsor, changes);
      if (!this.form.invalid) {
        this.saveSponsor();
      }
    });
  }

  saveSponsor(redirect: boolean = false): void {
    let action;

    if (this.sponsor.id) {
      action = this.sponsorService.updateSponsor(this.sponsor.id, this.sponsor);
    } else {
      action = this.sponsorService.createSponsor(this.sponsor);
    }
    action.then(
      () => {
        if (redirect) {
          this.redirectToList();
        }
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.applications.updateMessage'
          },
          duration: 2500,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      (error: any) => console.log(error)
    );
  }

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate(['/sponsors']).then();
  }

  removeSponsor() {
    this.sponsorService.removeSponsor(this.sponsor).then(
      () => this.redirectToList()
    );
  }

}
