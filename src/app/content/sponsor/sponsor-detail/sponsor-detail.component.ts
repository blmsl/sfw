import { Component, OnInit } from '@angular/core';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.scss']
})
export class SponsorDetailComponent implements OnInit {

  public sponsor: ISponsor;
  public categories$: Observable<ICategory[]>;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {
    this.categories$ = categoryService.categories$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { sponsor: ISponsor }) => this.sponsor = data.sponsor);
  }

}
