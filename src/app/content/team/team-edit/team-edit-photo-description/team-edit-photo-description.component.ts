import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
}                               from '@angular/core';
import { ITeam }                from '../../../../shared/interfaces/team/team.interface';
import {
  FormBuilder,
  FormGroup
}                               from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged
}                               from 'rxjs/internal/operators';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

@Component({
  selector: 'team-edit-photo-description',
  templateUrl: './team-edit-photo-description.component.html',
  styleUrls: [ './team-edit-photo-description.component.scss' ]
})
export class TeamEditPhotoDescriptionComponent implements OnInit {

  @Input() team: ITeam;
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  @ViewChild('description') description: QuillEditorComponent;

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      photoDescription: this.team.photoDescription
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: ITeam) => {
      if (this.form.valid) {
        this.saveTeam.emit(changes);
      }
    });
  }

}
