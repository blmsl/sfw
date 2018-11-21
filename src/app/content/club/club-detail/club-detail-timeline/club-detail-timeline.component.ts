import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';
import { Observable } from 'rxjs/index';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { ArticleService } from '../../../../shared/services/article/article.service';

@Component({
  selector: 'club-detail-timeline',
  templateUrl: './club-detail-timeline.component.html',
  styleUrls: ['./club-detail-timeline.component.scss']
})
export class ClubDetailTimelineComponent implements OnInit {

  @Input() club: IClub;
  @Input() showLinks = false;

  public form: FormGroup;
  public articles$: Observable<IArticle[]>;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
    this.form = this.fb.group({
      timeLine: this.initClubTimeLine()
    });
  }

  // TimeLine
  initClubTimeLine(): FormArray {
    const formArray = [];
    if (this.club.timeLine) {
      for (let i = 0; i < this.club.timeLine.length; i++) {
        formArray.push(this.initTimeLineEvent(this.club.timeLine[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initTimeLineEvent(event: ITimeLineEvent): FormGroup {
    return this.fb.group({
      title: [event.title, [Validators.required, Validators.maxLength(100)]],
      subTitle: event.subTitle,
      icon: event.icon,
      color: event.color,
      assignedMediaItem: event.assignedMediaItem,
      assignedArticle: event.assignedArticle,
      startDate: [event.startDate ? new Date(event.startDate.seconds * 1000) : new Date()],
      endDate: [event.endDate ? new Date(event.endDate.seconds * 1000) : null]
    });
  }

}
