import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
}                               from '@angular/core';
import { IMember }              from '../../../../shared/interfaces/member/member.interface';
import {
  FormBuilder,
  FormGroup
}                               from '@angular/forms';
import { IUploaderOptions }     from '../../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig }      from '../../../../shared/interfaces/media/uploader-config.interface';
import {
  debounceTime,
  distinctUntilChanged
}                               from 'rxjs/operators';
import * as moment              from 'moment';
import { AngularFirestore }     from '@angular/fire/firestore';

@Component({
  selector: 'member-edit-main',
  templateUrl: './member-edit-main.component.html',
  styleUrls: ['./member-edit-main.component.scss']
})
export class MemberEditMainComponent implements OnInit {

  @Input() member: IMember;

  public form: FormGroup;

  @Output() saveMember: EventEmitter<IMember> = new EventEmitter<IMember>(false);

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.members.edit.photo.title'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['members', 'profile'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore) { }

  ngOnInit() {
    this.form = this.fb.group({
      address: this.initAddress(),
      comment: this.member.comment,
      contact: this.initContact(),
      mainData: this.initMainData(),
      // creation: this.initCreation()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMember) => {
      if (this.form.valid) {
        if(changes.mainData.birthday){
          changes.mainData.birthday.day = moment(changes.mainData.birthday.full).format('DD');
          changes.mainData.birthday.month = moment(changes.mainData.birthday.full).format('MM');
          changes.mainData.birthday.monthDay = moment(changes.mainData.birthday.full).format('MM-DD');
          changes.mainData.birthday.year = moment(changes.mainData.birthday.full).format('YY');
        }
        this.saveMember.emit(changes);
      }
    });

    this.uploaderOptions.itemId = this.member.id;

    if (this.member.dfbImport) {
      this.form.get('mainData').disable();
    }

    if (this.member.driveImport) {
      this.form.get('address').disable();
      this.form.get('contact').disable();
      this.form.get('mainData').disable();
    }
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.member.creation.at.toDate(),
      from: this.member.creation.by
    });
  }

  initAddress(): FormGroup {
    return this.fb.group({
      city: this.member.address ? this.member.address.city : '',
      county: this.member.address ? this.member.address.county : '',
      houseNumber: this.member.address ? this.member.address.houseNumber : '',
      streetName: this.member.address ? this.member.address.streetName : '',
      zip: this.member.address ? this.member.address.zip : ''
    });
  }


  initContact(): FormGroup {
    return this.fb.group({
      email: this.member.contact ? this.member.contact.email : '',
      fax: this.member.contact ? this.member.contact.fax : '',
      phoneHome: this.member.contact ? this.member.contact.phoneHome : '',
      phoneMobile: this.member.contact ? this.member.contact.phoneMobile : '',
      phoneWork: this.member.contact ? this.member.contact.phoneWork : ''
    });
  }

  initMainData(): FormGroup {
    console.log(this.member.mainData.birthday.full);
    return this.fb.group({
      birthday: this.fb.group({
        full: new Date(this.member.mainData.birthday.full).toISOString(),
      }),
      firstName: this.member.mainData.firstName,
      gender: this.member.mainData.gender,
      lastName: this.member.mainData.lastName,
      title: this.member.mainData.title
    });
  }

}
