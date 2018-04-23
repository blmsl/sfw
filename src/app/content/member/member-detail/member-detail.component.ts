import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../../shared/services/club/club.service';
import { TeamService } from '../../../shared/services/team/team.service';
import { Observable } from 'rxjs';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  public member: IMember;
  public categories$: Observable<ICategory[]>;
  public clubs$: Observable<IClub[]>;
  public members$: Observable<IMember[]>;
  public teams$: Observable<ITeam[]>;

  constructor(public route: ActivatedRoute,
    private clubService: ClubService,
    private memberService: MemberService,
    private teamService: TeamService,
    private categoryService: CategoryService,
    private router: Router) {
    this.categories$ = categoryService.categories$;
    this.clubs$ = clubService.clubs$;
    this.members$ = this.memberService.members$;
    this.teams$ = teamService.teams$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { member: IMember }) => this.member = data.member);
  }

  removeMember(member: IMember) {
    this.memberService.removeMember(member).then(
      () => this.router.navigate(['/members']).then(),
      (error: any) => console.log(error)
    );
  }
}
