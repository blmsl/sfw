import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ILocation } from '../../../../../shared/interfaces/location/location.interface';
import { ITeam } from '../../../../../shared/interfaces/team/team.interface';
import { ICategory }                          from '../../../../../shared/interfaces/category.interface';
import { ICategoryType }                      from '../../../../../shared/interfaces/category-type.interface';
import { ISeason }                            from '../../../../../shared/interfaces/season.interface';
import { MatchService }                       from '../../../../../shared/services/match/match.service';
import { IMatch }                             from '../../../../../shared/interfaces/match/match.interface';
import { IArticle }                           from '../../../../../shared/interfaces/article.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IMediaGallery }                      from '../../../../../shared/interfaces/media/media-gallery.interface';

@Component({
  selector: 'sidebar-links-data',
  templateUrl: './sidebar-links-data.component.html',
  styleUrls: ['./sidebar-links-data.component.scss']
})
export class SidebarLinksDataComponent implements OnInit, OnDestroy {

  @Input() article: IArticle;
  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];
  @Input() locations: ILocation[];
  @Input() teams: ITeam[];
  @Input() seasons: ISeason[];

  @Output() changeArticle: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);

  public matches: IMatch[];
  public matchesListReady: boolean = false;
  public form: FormGroup;

  private matchSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private matchService: MatchService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedLocation: this.article.assignedLocation,
      assignedTeams: [this.article.assignedTeams],
      assignedMatches: [this.article.assignedMatches],
      assignedCategories: [this.article.assignedCategories],
      isMatch: !!this.article.assignedMatches,
      soccerWatchLink: this.article.soccerWatchLink,
    });

    if (this.article.assignedMatches && !this.matches) {
      this.loadMatches();
    }

    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      console.log(changes);
      if (changes.isMatch) {
        if (!this.matches) {
          this.loadMatches();
        } else {
          this.matchesListReady = true;
        }
      } else {
        this.matchesListReady = false;
      }

      if (!changes.isMatch) {
        changes.assignedMatches = null;
      }
      this.changeArticle.emit(changes);
    });
  }

  ngOnDestroy() {
    if (this.matchSubscription) {
      this.matchSubscription.unsubscribe();
    }
  }

  loadMatches() {
    this.matchSubscription = this.matchService.getOrderedMatchList().subscribe((matches: IMatch[]) => {
      this.matches = matches;
      this.matchesListReady = true;
    });
  }

}
