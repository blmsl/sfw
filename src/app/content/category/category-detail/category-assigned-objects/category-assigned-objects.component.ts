import { Component, Input } from '@angular/core';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'category-assigned-objects',
  templateUrl: './category-assigned-objects.component.html'
})
export class CategoryAssignedObjectsComponent {

  @Input() category: ICategory;
  @Input() categoryTypes: ICategoryType[];
  @Input() showList: boolean = false;
  /*assignedItems: any;

  constructor(
    public articleService: ArticleService,
    public locationService: LocationService,
    public seasonService: SeasonService,
    public sponsorService: SponsorService,
    public teamService: TeamService
  ) { }

  ngOnChanges() {
    // TODO: Idea?
    if (!this.category || !this.categoryTypes) {
      return;
    }

    const selectedCategoryType = this.categoryTypes.filter((categoryType: ICategoryType) => {
      return this.category.assignedCategoryType === categoryType.id;
    })[0].link;

    const _that = this;

    switch (selectedCategoryType) {
      case 'locations':
        this.locationService.locations$.subscribe((locations: ILocation[]) => {
          this.assignedItems = locations.filter((location: ILocation) => {
            return location.assignedCategory === this.category.id;
          });
        });
        break;
      case 'teams':
        this.teamService.teams$.subscribe((teams: ITeam[]) => {
          this.assignedItems = teams.filter((team: ITeam) => {
            return Object.keys(team.assignedCategories).some((key) => {
              return team.assignedCategories[key] === _that.category.id;
            });
          });
        });
        break;
      case 'articles':
        this.articleService.articles$.subscribe((articles: IArticle[]) => {
          this.assignedItems = articles.filter((article: IArticle) => {
            return Object.keys(article.assignedCategories).some((key) => {
              return article.assignedCategories[key] === _that.category.id;
            });
          });
        });
        break;
      case 'sponsors':
        this.sponsorService.sponsors$.subscribe((sponsors: ISponsor[]) => {
          this.assignedItems = sponsors.filter((sponsor: ISponsor) => {
            return Object.keys(sponsor.assignedCategories).some((key) => {
              return sponsor.assignedCategories[key] === _that.category.id;
            });
          });
        });
        break;
    }
  } */

}
