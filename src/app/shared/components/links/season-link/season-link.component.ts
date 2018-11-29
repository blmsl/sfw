import { Component, Input, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season/season.service';
import { ISeason } from '../../../interfaces/season.interface';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'season-link',
  templateUrl: './season-link.component.html',
  styleUrls: ['./season-link.component.scss']
})
export class SeasonLinkComponent implements OnInit {

  @Input() seasonId: string;

  public season$: Observable<ISeason>;

  constructor(private seasonService: SeasonService) {
  }

  ngOnInit() {
    this.season$ = this.seasonService.getSeasonById(this.seasonId);
  }

}
