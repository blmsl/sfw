import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMatch } from '../../../interfaces/match.interface';
import { ICategory } from '../../../interfaces/category.interface';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatchService } from '../../../services/match/match.service';
import { changeSuccessBackgroundColorAnimation } from '../../../animations/animations';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['match-list.component.scss'],
  animations: [changeSuccessBackgroundColorAnimation]
})
export class MatchListComponent implements OnInit {

  @Input() matches: IMatch[];
  @Input() events: { id: number; title: string }[];
  @Input() categories: ICategory[];
  @Input() showResultInputs: boolean = false;

  public form: FormGroup;

  constructor(private fb: FormBuilder,
    public matchService: MatchService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      matches: this.initMatches()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      let matchList: IMatch[] = changes.matches;
      matchList.forEach((match: IMatch, i: number) => {
        if ((match.result.homeTeamGoals !== '' && match.result.guestTeamGoals !== '') || match.result.otherEvent !== '-') {
          this.matchService.updateMatch(match.id, match).then(() => {
            console.log(match);
            console.log('Match animation needed');
            this.matches[i].fadeOutAnimation = true;
          });
        }
      });
    });
  }

  initMatches(): FormArray {
    const formArray = [];
    this.matches.forEach((match: IMatch) => {
      formArray.push(
        this.fb.group({
          id: match.id,
          result: this.fb.group({
            homeTeamGoals: [match.result.homeTeamGoals, [Validators.required, Validators.minLength(1)]],
            guestTeamGoals: [match.result.guestTeamGoals, [Validators.required, Validators.minLength(1)]],
            otherEvent: [match.result.otherEvent, [Validators.required, Validators.minLength(1)]]
          }),
          fadeOutAnimation: false
        })
      );
    });
    return this.fb.array(formArray);
  }

}
