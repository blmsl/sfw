import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../../shared/interfaces/location/location.interface';

@Component({
  selector: 'team-training-form',
  templateUrl: './team-training-form.component.html'
})
export class TeamTrainingFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() locations: ILocation[];
  @Input() weekdays: number[];

  @Output() removeTraining: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

}
