import { Component, OnInit } from '@angular/core';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { SponsorService } from '../../../shared/services/sponsor/sponsor.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.scss']
})
export class SponsorDetailComponent implements OnInit {

  public sponsor: ISponsor;
  public categories$: Observable<ICategory[]>;
  public sponsorLogo: Observable<IMediaItem>;

  constructor(private route: ActivatedRoute,
    private sponsorService: SponsorService,
    private router: Router,
    private alertService: AlertService,
    private mediaItemService: MediaItemService,
    private categoryService: CategoryService) {
    this.categories$ = categoryService.categories$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { sponsor: ISponsor }) => this.sponsor = data.sponsor);

    if (this.sponsor) {
      if (!this.sponsorLogo) {
        this.sponsorLogo = this.mediaItemService.getCurrentImage(['sponsors', 'profile'], this.sponsor.id);
      }
    }
  }

  removeSponsor(sponsor: ISponsor) {
    this.sponsorService.removeSponsor(sponsor)
      .then(() => this.alertService.showSnackBar('success', 'general.sponsors.list.deleted'))
      .then(() => this.redirectToList())
      .catch((error: any) => this.alertService.showSnackBar('error', error.message));
  }

  redirectToList() {
    this.router.navigate(['/sponsors']).then();
  }
}
