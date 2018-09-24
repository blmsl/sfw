import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { IInterview } from '../../../../shared/interfaces/member/interview.interface';

@Component({
  selector: 'member-edit-interviews',
  templateUrl: './member-edit-interviews.component.html',
  styleUrls: ['./member-edit-interviews.component.scss']
})
export class MemberEditInterviewsComponent implements OnInit {

  @Input() articles: IArticle[];
  @Input() member: IMember;
  @Input() showForm: boolean = false;

  @Output() saveMember: EventEmitter<IMember> = new EventEmitter<IMember>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedInterviews: this.initInterviews()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMember) => {
      // this.member = Object.assign({}, this.member, changes);
      if (this.form.valid) {
        this.saveMember.emit(changes);
      }
    });
  }

  // Interviews
  initInterviews(): FormArray {
    const formArray = [];
    if (this.member.assignedInterviews) {
      for (let i = 0; i < this.member.assignedInterviews.length; i++) {
        formArray.push(this.initInterview(this.member.assignedInterviews[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initInterview(interview: IInterview): FormGroup {
    return this.fb.group({
      assignedArticleId: [interview.assignedArticleId ? interview.assignedArticleId : '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  addInterview(): void {
    const control = this.form.controls['assignedInterviews'] as FormArray;
    const interview: IInterview = {
      assignedArticleId: ''
    };
    control.push(this.initInterview(interview));
  }

  removeInterview($event: number): void {
    const control = this.form.controls['assignedInterviews'] as FormArray;
    control.removeAt($event);
  }

}
