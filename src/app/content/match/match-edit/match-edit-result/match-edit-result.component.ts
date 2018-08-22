import {
  Component,
  Input,
  OnInit
}                    from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'match-edit-result',
  templateUrl: './match-edit-result.component.html',
  styleUrls: ['./match-edit-result.component.scss']
})
export class MatchEditResultComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() otherMatchEventList: {
    id: number;
    title: string;
  }[];

  constructor() { }

  ngOnInit() {
  }

}
