import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMember } from '../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-media',
  templateUrl: './member-media.component.html',
  styleUrls: ['./member-media.component.scss']
})
export class MemberMediaComponent implements OnInit {

  public id: string;
  public itemType = 'member';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { member: IMember }) => {
      this.id = data.member.id;
    });
  }

}
