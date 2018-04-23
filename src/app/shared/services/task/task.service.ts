import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { ITask } from '../../interfaces/task.interface';
import { AuthService } from '../auth/auth.service';
import { IPriority } from '../../interfaces/priority.interface';

@Injectable()
export class TaskService {

  private collectionRef: AngularFirestoreCollection<ITask>;
  private path = `tasks`;

  private taskTypes$ = ['application', 'category', 'club', 'dashboard', 'location', 'member', 'season', 'setting', 'sponsor', 'task', 'team', 'user'];

  private priorities$: IPriority[] = [
    {
      title: 'urgent',
      value: 'danger'
    },
    {
      title: 'high',
      value: 'warning'
    },
    {
      title: 'normal',
      value: 'success'
    },
    {
      title: 'low',
      value: 'primary'
    }
  ];

  tasks$: Observable<ITask[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.collectionRef = this.afs.collection<ITask>(this.path);
    this.tasks$ = this.collectionRef.valueChanges();
  }

  createTask(task: ITask): Promise<void> {
    task.id = this.afs.createId();
    return this.afs.collection(this.path).doc(task.id).set(task);
  }

  removeTask(task: ITask): Promise<void> {
    return this.afs.collection(this.path).doc(task.id).delete();
  }

  updateTask(taskId: string, task: ITask): Promise<any> {
    return this.afs.collection(this.path).doc(taskId).update(task);
  }

  getTaskById(taskId: string): Observable<ITask> {
    return this.afs.doc<ITask>(this.path + '/' + taskId).valueChanges();
  }

  getPriorities(): IPriority[] {
    return this.priorities$;
  }

  getTaskTypes(): any {
    return this.taskTypes$;
  }

  setNewTask(): ITask {
    return {
      title: '',
      description: '',
      type: '',
      progress: 0,
      creation: this.authService.getCreation()
    };
  }

}
