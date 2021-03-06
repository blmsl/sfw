import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { LocationService } from '../../../shared/services/location/location.service';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ILocationContact } from '../../../shared/interfaces/location/location-contact.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MatSnackBar } from '@angular/material';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { IUploaderOptions } from 'src/app/shared/interfaces/media/uploader-options.interface';
import { MediaItemService } from 'src/app/shared/services/media/media-item.service';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'location-edit',
  templateUrl: 'location-edit.component.html'
})

export class LocationEditComponent implements OnInit {

  public savedLocation: ILocation;
  public location: ILocation;
  public form: FormGroup;
  public categories$: Observable<ICategory[]>;
  public members$: Observable<IMember[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.locations.edit.photoTitle'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['locations', 'profile'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor(private router: Router,
    private alertService: AlertService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    public locationService: LocationService,
    private mediaItemService: MediaItemService,
    private memberService: MemberService) {
    this.categories$ = this.categoryService.getCategoriesByCategoryType('location.types');
    this.members$ = memberService.members$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { location: ILocation }) => {
      this.location = data.location;
      this.savedLocation = Object.freeze(Object.assign({}, this.location));
      this.uploaderOptions.itemId = this.location.id;
    });

    this.form = this.fb.group({
      title: [this.location.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      fupaLink: this.location.fupaLink,
      assignedCategory: [this.location.assignedCategory, [Validators.required]],
      prices: this.location.prices,
      opening: this.location.opening,
      text: this.location.text,
      address: this.initAddress(),
      creation: this.initCreation(),
      assignedContacts: this.initAssignedContacts()
    });

    if (this.location.isImported) {
      this.form.get('title').disable();
      this.form.get('assignedCategory').disable();
      this.form.get('address').disable();
      this.form.get('creation').disable();
    }

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: ILocation) => {
      this.location = Object.assign({}, this.location, changes);
      if (!this.form.invalid) {
        this.saveLocation();
      }
    });
  }

  initAssignedContacts(): FormArray {
    const formArray: FormArray = this.fb.array([]);
    if (this.location.assignedContacts) {
      for (let i = 0; i < this.location.assignedContacts.length; i++) {
        formArray.push(this.initLocationContact(this.location.assignedContacts[i]));
      }
    }
    return formArray;
  }

  initLocationContact(contact: ILocationContact): FormGroup {
    return this.fb.group({
      isMember: [contact ? contact.isMember : false],
      description: [contact ? contact.description : ''],
      assignedMember: [contact ? contact.assignedMember : ''],
      firstName: [contact ? contact.firstName : ''],
      lastName: [contact ? contact.lastName : ''],
      contact: this.initContactData(contact),
      address: contact ? contact.address : ''
    });
  }

  addLocationContact(): void {
    const contact: ILocationContact = {
      isMember: true,
      description: ''
    };
    const control = <FormArray>this.form.controls['assignedContacts'];
    const addCtrl = this.initLocationContact(contact);
    control.push(addCtrl);
  }

  removeLocationContact(i: number) {
    const control = <FormArray>this.form.controls['assignedContacts'];
    control.removeAt(i);
  }

  initContactData(contact: ILocationContact) {
    return this.fb.group({
      email: [contact.contact ? contact.contact.email : ''],
      phoneMobile: [contact.contact ? contact.contact.phoneMobile : '']
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.location.creationAt.toDate(),
      from: this.location.creationBy
    });
  }

  initAddress() {
    return this.fb.group({
      streetName: [this.location.address.streetName, [Validators.required, Validators.minLength(5)]],
      houseNumber: this.location.address.houseNumber === 0 ? '' : this.location.address.houseNumber,
      zip: [this.location.address.zip, [Validators.required]],
      city: [this.location.address.city, [Validators.required]],
      county: [this.location.address.county, [Validators.required]]
    });
  }

  saveLocation(redirect = false) {
    let action;
    if (this.location.id) {
      action = this.locationService.updateLocation(this.location.id, this.location);
    } else {
      action = this.locationService.createLocation(this.location);
    }
    action.then(
      () => {
        if (redirect) {
          this.redirectToList();
        }
        this.alertService.showSnackBar('success', 'general.applications.updateMessage');
      },
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

  removeLocation(location: ILocation) {
    this.locationService.removeLocation(location)
      .then(() => this.alertService.success('general.locations.edit.deleted', false))
      .then(() => this.redirectToList(),
        (error: any) => this.alertService.error(error.message));
  }

  redirectToList() {
    this.router.navigate(['/locations']).then();
  }

  uploadCompleted() {
    console.log('Upload completed');
  }
}
