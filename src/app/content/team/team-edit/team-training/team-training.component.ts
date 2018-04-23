import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { ApplicationService } from '../../../../shared/services/application/application.service';

@Component({
  selector: 'team-training',
  templateUrl: './team-training.component.html'
})
export class TeamTrainingComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() locations: ILocation[];

  public weekdays: number[];

  @Output() addTraining: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() removeTraining: EventEmitter<number> = new EventEmitter<number>(false);

  constructor(private applicationService: ApplicationService) {
    this.weekdays = applicationService.getWeekdays();
  }

  ngOnInit() {
  }

}
