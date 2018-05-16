import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberStateService } from '../../../shared/services/member/member-state.service';
import { IMemberState } from '../../../shared/interfaces/member/member-state.interface';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent implements OnInit {

  @Input() members: IMember[];
  @Output() remove = new EventEmitter(false);

  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];
  public clubMemberStates: IMemberState[];
  public ahMemberStates: IMemberState[];

  constructor(private fb: FormBuilder,
    public memberStateService: MemberStateService) {
    this.clubMemberStates = memberStateService.getMemberStates();
    this.ahMemberStates = memberStateService.getAHStates();
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 25
    });
  }

  removeMember(member: IMember) {
    this.remove.emit(member);
    this.form.controls['searchFor'].reset();
  }

}
