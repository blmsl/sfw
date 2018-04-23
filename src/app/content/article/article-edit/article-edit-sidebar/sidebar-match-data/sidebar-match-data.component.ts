import { Component, Input, OnInit } from '@angular/core';
import { IMatch } from '../../../../../shared/interfaces/match.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sidebar-match-data',
  templateUrl: './sidebar-match-data.component.html',
  styleUrls: ['./sidebar-match-data.component.scss']
})
export class SidebarMatchDataComponent implements OnInit {

  @Input() matches: IMatch[];
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
