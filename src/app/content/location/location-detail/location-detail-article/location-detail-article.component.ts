import {
  Component,
  Input,
  OnInit
}                   from '@angular/core';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'location-detail-article',
  templateUrl: './location-detail-article.component.html',
  styleUrls: ['./location-detail-article.component.scss']
})
export class LocationDetailArticleComponent implements OnInit {

  @Input() assignedArticles: IArticle[];

  constructor() { }

  ngOnInit() {
  }

}
