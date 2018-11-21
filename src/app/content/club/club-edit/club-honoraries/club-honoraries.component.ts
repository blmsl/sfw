import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { Observable } from 'rxjs/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'club-honoraries',
  templateUrl: './club-honoraries.component.html'
})
export class ClubHonorariesComponent implements OnInit {

  @Input() club: IClub;
  @Input() articles: IArticle;
  @Input() members$: Observable<IMember[]>;

  constructor(private memberService: MemberService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
      this.members$ = this.memberService.getHonoraryList(this.club);
    });
  }

}
