import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/index';
import { ILocation } from '../../../../../shared/interfaces/location/location.interface';
import { ITeam } from '../../../../../shared/interfaces/team/team.interface';
import { ICategory } from '../../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../../shared/interfaces/category-type.interface';
import { ISeason } from '../../../../../shared/interfaces/season.interface';
import { MatchService } from '../../../../../shared/services/match/match.service';
import { IMatch } from '../../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'sidebar-links-data',
  templateUrl: './sidebar-links-data.component.html',
  styleUrls: ['./sidebar-links-data.component.scss']
})
export class SidebarLinksDataComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;

  @Input() categories: Observable<ICategory[]>;
  @Input() categoryTypes: Observable<ICategoryType[]>;
  @Input() locations: Observable<ILocation[]>;
  @Input() teams: Observable<ITeam[]>;
  @Input() seasons: Observable<ISeason[]>;

  public matches: IMatch[];
  public matchesListReady: boolean = false;

  private matchSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private matchService: MatchService) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((changes: any) => {
      if (changes.isMatch) {
        if (!this.matches) {
          this.loadMatches();
        } else {
          this.matchesListReady = true;
        }
      } else {
        this.matchesListReady = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.matchSubscription) {
      this.matchSubscription.unsubscribe();
    }
  }

  loadMatches() {
    this.matchSubscription = this.matchService.matches$.subscribe((matches: IMatch[]) => {
      this.matches = matches;
      this.matchesListReady = true;
    });
  }

}
