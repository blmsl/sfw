import {
  ChangeDetectorRef,
  Component,
  OnDestroy
}                           from '@angular/core';
import { Observable }       from 'rxjs';
import { ISponsor }         from '../../../shared/interfaces/sponsor.interface';
import { CategoryService }  from '../../../shared/services/category/category.service';
import { SponsorService }   from '../../../shared/services/sponsor/sponsor.service';
import { ICategory }        from '../../../shared/interfaces/category.interface';
import { MediaMatcher }     from '@angular/cdk/layout';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { AlertService }     from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: [ 'sponsors.component.scss' ]
})
export class SponsorsComponent implements OnDestroy {

  public sponsors$: Observable<ISponsor[]>;
  public categories$: Observable<ICategory[]>;
  public currentFilter: string[];

  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private alertService: AlertService,
              private media: MediaMatcher,
              private categoryService: CategoryService,
              private mediaItemService: MediaItemService,
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
    console.log(sponsor.id);
    this.sponsorService.removeSponsor(sponsor)
      .then(() => this.mediaItemService.removeMediaItem(sponsor.id))
      .then(() => this.alertService.showSnackBar('success', 'general.sponsors.list.deleted'))
      .catch((error: any) => this.alertService.showSnackBar('error', error.message));
  }

  setFilters(categoryIds: string[]) {
    this.currentFilter = categoryIds;
  }

}
