import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IMatch } from '../../../interfaces/match/match.interface';
import { ICategory } from '../../../interfaces/category.interface';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['match-list.component.scss'],
})
export class MatchListComponent implements OnInit, AfterViewChecked {

  @Input() matches: IMatch[];
  @Input() events: { id: number; title: string }[];
  @Input() categories: ICategory[];
  @Input() showResultInputs: boolean = false;
  @Input() showResult: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
