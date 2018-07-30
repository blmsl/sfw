import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { Observable } from 'rxjs/Rx';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'dashboard-article-list',
  templateUrl: './dashboard-article-list.component.html',
  styleUrls: ['./dashboard-article-list.component.scss']
})
export class DashboardArticleListComponent implements OnInit {

  @Input() articles$: Observable<IArticle[]>;

  public assignedObjects: string[] = ['articles', 'cover'];
  public users$: Observable<IUser[]>;
  public live: boolean = true;

  constructor(private userService: UserService) {
    this.users$ = userService.users$;
  }

  ngOnInit() {
  }

  show(date: any) {
    console.log(date);
  }

}
