import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';

@Component({
  selector: 'team-edit-description',
  templateUrl: './team-edit-description.component.html',
  styleUrls: ['./team-edit-description.component.scss']
})
export class TeamEditDescriptionComponent implements OnInit {

  @Input() team: ITeam;
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  @ViewChild('info') info: QuillEditorComponent;

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      info: this.team.info
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
