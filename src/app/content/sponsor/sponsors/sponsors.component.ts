import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { MatOption, MatOptionSelectionChange } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  @ViewChild('settings') settings;

  public sidePanelOpened: boolean = false;
  public isSmallDevice: boolean = false;

  public sponsors$: Observable<ISponsor[]>;
  public categories$: Observable<ICategory[]>;
  public categoryFilter: string[];


  constructor(private alertService: AlertService,
    private media: MediaMatcher,
    private categoryService: CategoryService,
    public breakpointObserver: BreakpointObserver,
    private mediaItemService: MediaItemService,
    private sponsorService: SponsorService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('sponsor.types');
    this.sponsors$ = sponsorService.sponsors$;
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: ' + SMALL_WIDTH_BREAKPOINT + 'px)'])
      .subscribe((state: BreakpointState) => {
        this.sidePanelOpened = state.matches;
        this.isSmallDevice = !this.sidePanelOpened;
      });
  }

  removeSponsor(sponsor: ISponsor) {
    console.log(sponsor.id);
    this.sponsorService.removeSponsor(sponsor)
      .then(() => this.mediaItemService.removeMediaItem(sponsor.id))
      .then(() => this.alertService.showSnackBar('success', 'general.sponsors.list.deleted'))
      .catch((error: any) => this.alertService.showSnackBar('error', error.message));
  }

  setFilters(categoryIds: MatOption[]) {
    this.sidePanelOpened = false;
    this.categoryFilter = [];
    categoryIds.forEach((option: MatOption) => {
      this.categoryFilter.push(option.value);
    });
  }


}
