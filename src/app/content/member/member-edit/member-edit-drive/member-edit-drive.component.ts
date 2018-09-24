import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MemberStateService } from '../../../../shared/services/member/member-state.service';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'member-edit-drive',
  templateUrl: './member-edit-drive.component.html',
  styleUrls: ['./member-edit-drive.component.scss']
})
export class MemberEditDriveComponent implements OnInit {

  @Input() member: IMember;
  @Input() clubs: IClub[];

  @Output() saveMember: EventEmitter<IMember> = new EventEmitter<IMember>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder,
    public memberStateService: MemberStateService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      ahData: this.initAHData(),
      clubData: this.initClubData(),
      dfbData: this.initDFBData()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMember) => {
      if (this.form.valid) {
        this.saveMember.emit(changes);
      }
    });

    if (this.member.dfbImport) {
      this.form.get('dfbData').disable();
    }

    if (this.member.driveImport) {
      this.form.get('ahData').disable();
      this.form.get('clubData').disable();
    }
  }

  initAHData(): FormGroup {
    return this.fb.group({
      joined: this.member.ahData ? this.member.ahData.joined : '',
      left: this.member.ahData ? this.member.ahData.left : '',
      payment: this.member.ahData ? this.member.ahData.payment : '',
      status: this.member.ahData ? this.member.ahData.status : ''
    });
  }

  initClubData(): FormGroup {
    return this.fb.group({
      assignedClub: this.member.clubData ? this.member.clubData.assignedClub : '',
      joined: this.member.clubData ? this.member.clubData.joined : '',
      left: this.member.clubData ? this.member.clubData.left : '',
      payment: this.member.clubData ? this.member.clubData.payment : '',
      positionsInClub: this.member.clubData ? this.member.clubData.positionsInClub : '',
      status: this.member.clubData ? this.member.clubData.status : ''
    });
  }

  initDFBData(): FormGroup {
    return this.fb.group({
      ageGroup: this.member.dfbData ? this.member.dfbData.ageGroup : '',
      allowedToPlay: this.member.dfbData ? this.member.dfbData.allowedToPlay : '',
      eligibleForFriendlyMatches: this.member.dfbData ? this.member.dfbData.eligibleForFriendlyMatches : '',
      eligibleForOfficialMatches: this.member.dfbData ? this.member.dfbData.eligibleForOfficialMatches : '',
      passNumber: this.member.dfbData ? this.member.dfbData.passNumber : '',
      passPrint: this.member.dfbData ? this.member.dfbData.passPrint : '',
      playerStatus: this.member.dfbData ? this.member.dfbData.playerStatus : '',
      signOut: this.member.dfbData ? this.member.dfbData.signOut : '',
      guestPlayer: this.initGuestPlayer()
    });
  }

  initGuestPlayer(): FormGroup {
    return this.fb.group({
      guestRight: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.guestRight : '',
      season: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.season : '',
      type: this.member.dfbData && this.member.dfbData.guestPlayer ? this.member.dfbData.guestPlayer.type : ''
    });
  }

}
