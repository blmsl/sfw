import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['sponsors.component.scss']
})
export class SponsorsComponent implements OnDestroy {

  public sponsors$: Observable<ISponsor[]>;
  public categories$: Observable<ICategory[]>;
  public currentFilter: string[];

  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private categoryService: CategoryService,
    private sponsorService: SponsorService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('sponsor.types');
    this.sponsors$ = sponsorService.sponsors$;

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  removeSponsor(sponsor: ISponsor) {
    this.sponsorService.removeSponsor(sponsor).then();
  }

  setFilters(categoryIds: string[]) {
    this.currentFilter = categoryIds;
  }

}
