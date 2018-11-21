import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IMatch } from '../../../interfaces/match/match.interface';
import { ICategory } from '../../../interfaces/category.interface';
import { MatchService } from '../../../services/match/match.service';
import { IMatchEvent } from '../../../interfaces/match/match-event.interface';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['match-list.component.scss'],
})
export class MatchListComponent implements OnInit, AfterViewChecked {

  @Input() matches: IMatch[];
  @Input() categories: ICategory[];
  @Input() showResultInputs = false;
  @Input() showResult = false;

  public otherEvents: { id: number, title: string }[];

  constructor(private cdRef: ChangeDetectorRef, private matchService: MatchService) {
  }

  ngOnInit() {
    this.otherEvents = this.matchService.getOtherEventList();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
