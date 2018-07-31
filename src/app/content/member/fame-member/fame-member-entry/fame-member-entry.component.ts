import { Component, Input, OnInit } from '@angular/core';
import { IMemberOfTheWeek } from "../../../../shared/interfaces/member/member-of-the-week.interface";

@Component({
  selector: 'fame-member-entry',
  templateUrl: './fame-member-entry.component.html',
  styleUrls: ['./fame-member-entry.component.scss']
})
export class FameMemberEntryComponent implements OnInit {

  @Input() memberOfTheWeek: IMemberOfTheWeek;

  constructor() { }

  ngOnInit() {
  }

}
