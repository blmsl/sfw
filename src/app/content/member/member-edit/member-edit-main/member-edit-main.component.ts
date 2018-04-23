import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

@Component({
  selector: 'member-edit-main',
  templateUrl: './member-edit-main.component.html',
  styleUrls: ['./member-edit-main.component.scss']
})
export class MemberEditMainComponent implements OnInit {

  @Input() member: IMember;
  @Input() form: FormGroup;

  @ViewChild('comment') comment: QuillEditorComponent;

  constructor() { }

  ngOnInit() {
  }

}
