import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClub } from '../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-list',
  templateUrl: 'club-list.component.html',
  styleUrls: ['club-list.component.scss']
})

export class ClubListComponent {

  @Input() clubs$: IClub[];

  @Output() remove: EventEmitter<IClub> = new EventEmitter(false);
  @Output() update: EventEmitter<IClub> = new EventEmitter(false);

  constructor() {
  }

}
