import { Component, Input, OnInit } from '@angular/core';
import { IFormation } from '../../../../../shared/interfaces/match/formation.interface';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-edit-substitutions',
  templateUrl: './match-edit-substitutions.component.html',
  styleUrls: ['./match-edit-substitutions.component.scss']
})
export class MatchEditSubstitutionsComponent implements OnInit {

  @Input() assignedFormation: IFormation;

  public maxSubstitutes: number[];
  public substituteList: IMember[] = [];
  constructor() {
  }

  ngOnInit() {
    this.maxSubstitutes = new Array(this.assignedFormation.maxSubstitutes).fill(0).map((_, i) => i);
  }

}
