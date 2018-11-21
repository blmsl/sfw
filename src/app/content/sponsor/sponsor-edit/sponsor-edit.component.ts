import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { AlertService } from '../../../shared/services/alert/alert.service';


@Component({
  selector: 'sponsor-edit',
  templateUrl: './sponsor-edit.component.html'
})
export class SponsorEditComponent implements OnInit {

  public sponsor: ISponsor;
  public form: FormGroup;
  public categories$: Observable<ICategory[]>;
  public titleMaxLength = 50;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.sponsors.edit.imageUrl'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['sponsors', 'profile'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    allowedFileType: ['image']
  };

  constructor(private route: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private mediaItemService: MediaItemService,
    private sponsorService: SponsorService,
    public categoryService: CategoryService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('sponsor.types');
  }

  ngOnInit() {
    this.route.data.subscribe((data: { sponsor: ISponsor }) => {
      this.sponsor = data.sponsor;
      // this.savedSponsor = Object.freeze(Object.assign({}, this.sponsor));
      this.uploaderOptions.itemId = this.sponsor.id ? this.sponsor.id : '';
    });

    this.form = this.fb.group({
      title: [this.sponsor.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      externalLink: this.sponsor.externalLink,
      description: this.sponsor.description,
      assignedCategories: [this.sponsor.assignedCategories, [Validators.required]],
      startDate: this.sponsor.startDate ? this.sponsor.startDate.toDate() : '',
      endDate: this.sponsor.endDate,
      internalInfo: this.sponsor.internalInfo
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: ISponsor) => {
      console.log(this.form);
      if (this.form.valid) {
        this.sponsor = Object.assign({}, this.sponsor, changes);
        this.saveSponsor();
      }
    });
  }

  saveSponsor(redirect = false): void {
    let action;
    if (this.sponsor.id) {
      action = this.sponsorService.updateSponsor(this.sponsor.id, this.sponsor);
    } else {
      action = this.sponsorService.createSponsor(this.sponsor);
    }
    action.then(() => {
      this.alertService.showSnackBar('success', 'general.applications.updateMessage');
      if (redirect) {
        this.redirectToList();
      }
    },
      (error: any) => this.alertService.showSnackBar('error', error.message)
    );
  }

  cancel() {
    this.redirectToList();
  }

  redirectToList() {
    this.router.navigate(['/sponsors']).then();
  }

  uploadCompleted(mediaItemId: string) {
    this.uploaderOptions.itemId = this.sponsor.id = mediaItemId;
  }

  removeSponsor(sponsor: ISponsor) {
    this.sponsorService.removeSponsor(sponsor)
      .then(() => this.alertService.showSnackBar('success', 'general.sponsors.list.deleted'))
      .then(() => this.redirectToList())
      .catch((error: any) => this.alertService.showSnackBar('error', error.message));
  }

}
