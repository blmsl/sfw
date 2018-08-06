import { Component, OnInit } from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'match-edit-events',
  templateUrl: './match-edit-events.component.html',
  styleUrls: ['./match-edit-events.component.scss']
})
export class MatchEditEventsComponent implements OnInit {

  public match: IMatch;
  public form: FormGroup;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => this.match = data.match);

    this.form = this.fb.group({

    });
  }

}
