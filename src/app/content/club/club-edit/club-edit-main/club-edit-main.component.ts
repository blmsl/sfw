import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                           from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
}                           from '@angular/forms';
import { ILocation }        from '../../../../shared/interfaces/location/location.interface';
import { IMember }          from '../../../../shared/interfaces/member/member.interface';
import { IUploaderConfig }  from '../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IClub }            from '../../../../shared/interfaces/club/club.interface';
import {
  debounceTime,
  distinctUntilChanged
}                           from 'rxjs/internal/operators';
import { ActivatedRoute }   from '@angular/router';

@Component({
  selector: 'club-edit-main',
  templateUrl: './club-edit-main.component.html'
})
export class ClubEditMainComponent implements OnInit {

  @Input() locations: ILocation[];
  @Input() members: IMember[];

  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

  public club: IClub;
  public form: FormGroup;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.clubs.edit.logoUrl'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [ 'clubs', 'profile' ],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: [ 'image/jpeg', 'image/gif', 'image/png' ]
  };

  public froalaOptions: Object = {
    placeholderText: 'Eine Kurzinfo zum Verein ...',
    charCounterCount: true,
    height: '30vh'
  };

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });

    this.form = this.fb.group({
      title: [ this.club.title, [ Validators.required, Validators.minLength(10) ] ],
      description: this.club.description,
      assignedLocation: this.club.assignedLocation,
      creation: this.initCreation(),
      info: this.initInfo(),
      fussballde: this.initFussballDe()
    });
    this.uploaderOptions.itemId = this.club.id;

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IClub) => {
      if (this.form.valid) {
        this.saveClub.emit(changes);
      }
    });
  }

  initInfo(): FormGroup {
    return this.fb.group({
      assignedContact: this.club.info && this.club.info.assignedContact ? this.club.info.assignedContact : '',
      founding: this.club.info && this.club.info.founding ? this.club.info.founding : '',
      clubColours: this.club.info && this.club.info.clubColours ? this.club.info.clubColours : '',
      website: this.club.info && this.club.info.website ? this.club.info.website : ''
    });
  }

  initCreation(): FormGroup {
    return this.fb.group({
      at: this.club.creationAt.toDate(),
      from: this.club.creationBy
    });
  }

  initFussballDe(): FormGroup {
    return this.fb.group({
      clubId: this.club.fussballde.clubId,
      clubUrl: this.club.fussballde.clubUrl
    });
  }

}
