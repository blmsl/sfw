import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                 from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
}                 from '@angular/forms';
import { IMatch } from '../../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-edit-link-form',
  templateUrl: './match-edit-link-form.component.html',
  styleUrls: ['./match-edit-link-form.component.scss']
})
export class MatchEditLinkFormComponent implements OnInit {

  @Input() match: IMatch;
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      link: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  saveLink(matchLink: {title: string, link: string}) {
    if(this.match.assignedLinks){
      this.match.assignedLinks.push(matchLink);
    } else {
      this.match.assignedLinks = [matchLink];
    }
    this.saveMatch.emit(this.match);
    this.form.reset();
  }

}
