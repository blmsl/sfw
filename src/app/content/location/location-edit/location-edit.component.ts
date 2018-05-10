import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../shared/services/location/location.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { ILocationContact } from '../../../shared/interfaces/location-contact.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IUploaderOptions } from 'src/app/shared/interfaces/media/uploader-options.interface';
import { AngularFireStorage } from 'angularfire2/storage';
import { MediaItemService } from 'src/app/shared/services/media/media-item.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';

@Component({
  selector: 'location-edit',
  templateUrl: 'location-edit.component.html'
})

export class LocationEditComponent implements OnInit {

  /*@HostListener('window:beforeunload')
   canDeactivate(): Observable<boolean> | boolean {
   return JSON.stringify(this.location).toLowerCase() === JSON.stringify(this.savedLocation).toLowerCase();
   }*/

  public savedLocation: ILocation;
  public location: ILocation;
  public form: FormGroup;
  public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;
  public members$: Observable<IMember[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    multiple: true,
    removeAfterUpload: true,
    showQueue: true
  };

  public uploaderOptions: IUploaderOptions = {
    itemID: '',
    path: 'locations',
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private storage: AngularFireStorage,
              private fireStore: AngularFirestore,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              public categoryService: CategoryService,
              public categoryTypeService: CategoryTypeService,
              public locationService: LocationService,
              private mediaItemService: MediaItemService,
              private memberService: MemberService) {
    this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
    this.members$ = memberService.members$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { location: ILocation }) => {
      this.location = data.location;
      this.savedLocation = Object.freeze(Object.assign({}, this.location));

      this.uploaderOptions = {
        path: this.uploaderOptions.path + '/' + this.location.title,
        itemID: this.location.id
      };
    });

    this.form = this.fb.group({
      title: [this.location.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      fupaLink: this.location.fupaLink,
      assignedCategory: [this.location.assignedCategory, [Validators.required]],
      prices: this.location.prices,
      imageUrl: this.location.imageUrl,
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
      isMember: [contact ? contact.isMember : false,],
      description: [contact ? contact.description : '',],
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
      at: this.location.creation.at,
      from: this.location.creation.from
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

  saveLocation(redirect: boolean = false) {
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

  redirectToList() {
    this.router.navigate(['/locations']).then();
  }

  uploadCompleted() {
    const collection: AngularFirestoreCollection<any> = this.fireStore.collection('files', ref => ref.where('itemID', '==', this.location.id));
    collection.valueChanges().subscribe((result) => {
      console.log(result);
    })
  }
}
