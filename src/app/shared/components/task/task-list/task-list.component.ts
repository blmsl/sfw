import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { ITask } from '../../../interfaces/task.interface';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: ITask[];
  @Input() type: string;

  public filteredTaskTypes: string[];
  public taskTypes: string[];

  constructor(public taskService: TaskService) {
  }

  ngOnInit() {
    this.taskTypes = this.taskService.getTaskTypes();
    if (this.type) {
      this.filteredTaskTypes = this.taskTypes.filter((taskType: string) => {
        return this.type === taskType;
      });
    }
  }

  completeTask(task: ITask) {
    task.progress = 100;
    this.taskService.updateTask(task.id, task).then(
      () => console.log('task completed'),
      (error: any) => console.log(error)
    );
  }

}
