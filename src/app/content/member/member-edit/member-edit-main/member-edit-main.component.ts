import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'member-edit-main',
  templateUrl: './member-edit-main.component.html',
  styleUrls: ['./member-edit-main.component.scss']
})
export class MemberEditMainComponent implements OnInit {

  @Input() member: IMember;

  public form: FormGroup;

  @Output() saveMember: EventEmitter<IMember> = new EventEmitter<IMember>(false);

  @ViewChild('comment') comment: QuillEditorComponent;

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

  constructor(private fb: FormBuilder) { }

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
      // this.member = Object.assign({}, this.member, changes);
      if (this.form.valid) {
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
    return this.fb.group({
      birthday: this.member.mainData.birthday,
      firstName: this.member.mainData.firstName,
      gender: this.member.mainData.gender,
      lastName: this.member.mainData.lastName,
      title: this.member.mainData.title
    });
  }

}
