import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import {
  Observable,
  Subscription
} from 'rxjs';
import { ITask } from '../../../interfaces/task.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../interfaces/user/user.interface';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnDestroy {

  @Input() type = '';

  tasks$: Observable<ITask[]>;
  user: IUser;

  public showForm = false;
  private userSubscription: Subscription;

  constructor(private taskService: TaskService, private authService: AuthService) {
    this.tasks$ = taskService.tasks$;
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe((user: IUser) => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
