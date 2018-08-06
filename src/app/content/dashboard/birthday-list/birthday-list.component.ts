import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'birthday-list',
  templateUrl: './birthday-list.component.html',
  styleUrls: ['./birthday-list.component.scss']
})
export class BirthdayListComponent implements OnInit, AfterViewChecked {

  @Input() filter: string;
  @Input() members: IMember[];

  public birthdays: number[] = [];
  public assignedObjects: string[] = ['members', 'profile'];

  constructor(private cdRef: ChangeDetectorRef,
    private mediaItemService: MediaItemService,
    private memberService: MemberService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  setAge(member: IMember) {
    this.birthdays[member.id] = this.memberService.calculateAge(member.mainData.birthday);
  }

}
