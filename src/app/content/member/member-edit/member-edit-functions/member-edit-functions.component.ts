import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITeam} from '../../../../shared/interfaces/team/team.interface';
import {SeasonService} from '../../../../shared/services/season/season.service';
import {Observable} from 'rxjs/Rx';
import {ISeason} from '../../../../shared/interfaces/season.interface';
import {IMember} from '../../../../shared/interfaces/member/member.interface';
import {TeamService} from '../../../../shared/services/team/team.service';
import {AlertService} from '../../../../shared/services/alert/alert.service';
import {IClub} from "../../../../shared/interfaces/club/club.interface";
import {ClubService} from "../../../../shared/services/club/club.service";

@Component({
    selector: 'member-edit-functions',
    templateUrl: './member-edit-functions.component.html',
    styleUrls: ['./member-edit-functions.component.scss']
})
export class MemberEditFunctionsComponent implements OnInit {

    @Input() teams: ITeam[];
    @Input() member: IMember;

    @Output() deleteMemberFromTeam: EventEmitter<{ team: ITeam, member: IMember }> = new EventEmitter<{ team: ITeam, member: IMember }>(false);
    @Output() deleteMemberFromTeamManagement: EventEmitter<{ team: ITeam, member: IMember }> = new EventEmitter<{ team: ITeam, member: IMember }>(false);

    public seasons$: Observable<ISeason[]>;
    public clubs$: Observable<IClub[]>;

    //public positionList: IClubManagement[];

    constructor(private teamService: TeamService,
                private clubService: ClubService,
                private alertService: AlertService,
                private seasonService: SeasonService) {
        this.seasons$ = seasonService.seasons$;
        this.clubs$ = clubService.clubs$;
    }

    ngOnInit() {
    }

    /*getMemberPositionsInClubs(clubs: IClub[]) {
        if(!clubs)
            return;

        if (this.positionList)
            return this.positionList;

        let positionList = [];
        for (let i = 0; i < clubs.length; i++) {
            if (clubs[i].management && clubs[i].management.positions) {
                clubs[i].management.positions.filter((position: IClubManagement) => {
                    return position.assignedMember === this.member.id;
                }).map((position: IClubManagement) => {
                    positionList.push(position);
                });
            }
        }
        this.positionList = positionList;
        return positionList;
    }*/

}
