import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../../../interfaces/task.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { TaskService } from '../../../services/task/task.service';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

  @Input() type: string;
  @Input() redirectAfterSave: boolean = true;
  @Output() toggleForm: EventEmitter<boolean> = new EventEmitter(false);

  @ViewChild('description') description: QuillEditorComponent;

  public titleMaxLength: number = 30;
  public form: FormGroup;
  public task: ITask;
  public error: any;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public taskService: TaskService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      description: '',
      type: [this.type, [Validators.required]],
      priority: ''
    });

    this.form.valueChanges.subscribe((changes: ITask) => {
      this.task = {
        title: changes.title,
        type: changes.type,
        description: changes.description,
        priority: changes.priority,
        progress: 0,
        creation: this.authService.getCreation()
      };
    });
  }

  saveTask() {
    this.taskService.createTask(this.task).then(
      () => this.hideAndResetForm(),
      (error: any) => this.error = error
    );
  }

  hideAndResetForm() {
    this.form.patchValue({
      title: '',
      description: '',
      type: this.type,
      priority: ''
    });
    if (this.redirectAfterSave) {
      this.toggleForm.emit();
    }
  }

  cancel() {

  }

}
