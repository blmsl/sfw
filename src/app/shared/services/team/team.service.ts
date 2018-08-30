import { Injectable } from '@angular/core';
import { ITeam } from '../../interfaces/team/team.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { IMember } from '../../interfaces/member/member.interface';
import { take } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs/index';

@Injectable()
export class TeamService {

  private collectionRef: AngularFirestoreCollection<ITeam>;
  private path = `teams`;

  teams$: Observable<ITeam[]>;

  constructor(private afs: AngularFirestore,
    private authService: AuthService) {
    this.collectionRef = this.afs.collection<ITeam>(this.path);
    this.teams$ = this.collectionRef.valueChanges();
  }

  createTeam(team: ITeam): Promise<void> {
    team.id = this.afs.createId();
    return this.afs.collection(this.path).doc(team.id).set(team);
  }

  removeTeam(team: ITeam): Promise<void> {
    return this.afs.collection(this.path).doc(team.id).delete();
  }

  updateTeam(teamId: string, team: ITeam): Promise<any> {
    return this.afs.collection(this.path).doc(teamId).update(team);
  }

  getTeamById(teamId: string): Observable<ITeam> {
    return this.afs.doc<ITeam>(this.path + '/' + teamId).valueChanges();
  }

  getPlayerStats(assignedPlayers: IMember[]){
    if(!assignedPlayers ||assignedPlayers.length === 0) return of(null);
    let memberObservables: Observable<IMember>[] = [];
    for(let i = 0; i < assignedPlayers.length; i++){
      memberObservables.push(this.getPlayerStatisticById(assignedPlayers[i]).pipe(
        take(1)
      ));
    }
    return forkJoin(memberObservables);
  }

  getPlayerStatisticById(member: IMember){
    console.log(member.id);
    return of(member);
  }

  setNewTeam(): Observable<ITeam> {
    return of({
      title: '',
      subTitle: '',
      isOfficialTeam: true,
      creation: this.authService.getCreation(),
      assignedTeamCategories: [],
      assignedClub: null,
      assignedSeason: null,
      assignedPlayers: [],
      assignedCompetitions: [],
      assignedEvents: [],
      assignedPositions: [],
      assignedTrainings: []
    });
  }

}
