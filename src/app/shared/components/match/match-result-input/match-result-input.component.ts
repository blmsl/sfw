import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMatch }                                         from '../../../interfaces/match.interface';
import { FormBuilder, FormGroup, Validators }             from '@angular/forms';
import { debounceTime, distinctUntilChanged }             from 'rxjs/operators';
import { MatchService }                                   from '../../../services/match/match.service';

@Component({
  selector: 'match-result-input',
  templateUrl: './match-result-input.component.html',
  styleUrls: ['./match-result-input.component.scss']
})
export class MatchResultInputComponent implements OnInit {

  @Input() match: IMatch;
  @Output() setCssClass: EventEmitter<string> = new EventEmitter<string>(false);

  public form: FormGroup;

  public cssClass: string = '';
  public isSaving: boolean = false;

  constructor(private fb: FormBuilder,
              private matchService: MatchService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      result: this.fb.group({
        guestTeamGoals: [this.match.result.guestTeamGoals, [Validators.required, Validators.min(0), Validators.max(50)]],
        homeTeamGoals: [this.match.result.homeTeamGoals, [Validators.required, Validators.min(0), Validators.max(50)]]
      })
    });

    this.form.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe((changes: {
      result: {
        guestTeamGoals: number,
        homeTeamGoals: number
      }
    }) => {

      if (this.form.valid) {
        this.isSaving = true;
        this.match.result = changes.result;
        this.matchService.updateMatch(this.match.id, this.match).then(
          () => this.setCssClass.emit('success'),
          (error: any) => console.log(error)
        );
      }
    });
  }

  changeCssClass() {
    if(this.form.get('result.guestTeamGoals').invalid &&
      (this.form.get('result.guestTeamGoals').touched || this.form.get('result.guestTeamGoals').dirty)
      || this.form.get('result.homeTeamGoals').invalid &&
      (this.form.get('result.homeTeamGoals').touched || this.form.get('result.homeTeamGoals').dirty)){
      this.cssClass = 'has-error';
      this.setCssClass.emit('danger');
    }
    if(this.form.valid && !this.isSaving){
      this.cssClass = '';
      this.setCssClass.emit('primary');
    }
    return this.cssClass;
  }

}
