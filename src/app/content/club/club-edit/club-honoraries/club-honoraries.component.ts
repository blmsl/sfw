import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { Observable } from 'rxjs';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-honoraries',
  templateUrl: './club-honoraries.component.html'
})
export class ClubHonorariesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() club: IClub;
  @Input() selectedHonorary: number;
  @Input() members: IMember[];

  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  public step = -1;
  public articles$: Observable<IArticle[]>;

  constructor(private articleService: ArticleService) {
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
  }

  setStep(i: number) {
    this.step = i;
  }

}
