import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ITeamOfTheMonth } from '../../interfaces/member/team-of-the-month.interface';
import { switchMap } from 'rxjs/operators';
import { TeamService } from './team.service';
import { ITeam } from '../../interfaces/team/team.interface';
import { first, map } from 'rxjs/internal/operators';

@Injectable()
export class TeamOfTheMonthService {

  private collectionRef: AngularFirestoreCollection<ITeamOfTheMonth>;
  private path = `team-of-the-month`;

  teamsOfTheMonth$: Observable<ITeamOfTheMonth[]>;

  constructor(private afs: AngularFirestore,
              private teamService: TeamService) {
    this.collectionRef = this.afs.collection<ITeamOfTheMonth>(this.path);
    this.teamsOfTheMonth$ = this.collectionRef.valueChanges();
  }

  getTeamOfTheMonthByTitle(title: string): Observable<ITeam | ITeam[]> {
    return this.afs.collection<ITeamOfTheMonth>(this.path, ref => ref.where('title', '==', title))
      .valueChanges()
      .pipe(
        switchMap((teamsOfTheMonth: ITeamOfTheMonth[]) => {
          return (!teamsOfTheMonth || teamsOfTheMonth.length === 0)
            ? of(null)
            : this.teamService.getTeamById(teamsOfTheMonth[0].assignedTeamId).pipe(
              first(),
              map((team: ITeam) => {
                return team;
              })
            );
        })
      );
  }
}
