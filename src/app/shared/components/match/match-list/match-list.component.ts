import { Component, Input, OnInit } from '@angular/core';
import { IMatch } from '../../../interfaces/match.interface';
import { ICategory } from '../../../interfaces/category.interface';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['match-list.component.scss'],
})
export class MatchListComponent implements OnInit {

  @Input() matches: IMatch[];
  @Input() events: { id: number; title: string }[];
  @Input() categories: ICategory[];

  constructor() {
  }

  ngOnInit() {
  }

}
