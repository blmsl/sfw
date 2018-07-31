import { Component, Input, OnInit } from '@angular/core';
import { IMember } from "../../../../shared/interfaces/member/member.interface";
import { IMemberOfTheWeek } from "../../../../shared/interfaces/member/member-of-the-week.interface";

@Component({
  selector: 'fame-member-list',
  templateUrl: './fame-member-list.component.html',
  styleUrls: ['./fame-member-list.component.scss']
})
export class FameMemberListComponent implements OnInit {

  @Input() members: IMember[];
  @Input() membersOfTheWeek: IMemberOfTheWeek[];

  constructor() { }

  ngOnInit() {
  }

}
