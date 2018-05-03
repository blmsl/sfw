import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from '../../../shared/interfaces/match.interface';

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  match: IMatch;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => this.match = data.match);
  }

}
