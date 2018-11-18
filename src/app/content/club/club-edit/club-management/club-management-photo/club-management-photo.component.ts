import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';
import { IUploaderConfig } from '../../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../../shared/interfaces/media/uploader-options.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'club-management-photo',
  templateUrl: './club-management-photo.component.html',
  styleUrls: ['./club-management-photo.component.scss']
})
export class ClubManagementPhotoComponent implements OnInit {

  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

  public form: FormGroup;
  public club: IClub;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.clubs.edit.management.current.title',
    placeHolderImage: '/assets/sfw/placeholder/team-placeholder.jpg'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['clubs', 'management'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public froalaOptions: Object = {
    placeholderText: 'Wer ist auf dem Bild zu sehen?',
    charCounterCount: true,
    height: '25vh'
  };

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });

    this.form = this.fb.group({
      photoDescription: this.club.photoDescription
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

}
