import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IMatch } from '../../interfaces/match/match.interface';
import { of } from 'rxjs';
import { IMatchEventCategory } from '../../interfaces/match/match-event-category.interface';
import { ILocation } from '../../interfaces/location/location.interface';
import { ITeam } from '../../interfaces/team/team.interface';
import { ICoord } from '../../interfaces/match/coord.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MatchService {

  private collectionRef: AngularFirestoreCollection<IMatch>;
  private path = `matches`;

  matches$: Observable<IMatch[]>;

  constructor(private afs: AngularFirestore,
    private authService: AuthService) {
    this.collectionRef = this.afs.collection<IMatch>(this.path);
    this.matches$ = this.collectionRef.valueChanges();
  }

  createMatch(match: IMatch): Promise<void> {
    match.id = this.afs.createId();
    return this.afs.collection(this.path).doc(match.id).set(match);
  }

  removeMatch(match: IMatch): Promise<void> {
    return this.afs.collection(this.path).doc(match.id).delete();
  }

  updateMatch(matchId: string, data: any): Promise<any> {
    return this.afs.collection(this.path).doc(matchId).update(data);
  }

  getMatchById(matchId: string): Observable<IMatch> {
    return this.afs.doc<IMatch>(this.path + '/' + matchId).valueChanges();
  }

  getMatchesForLocation(location: ILocation): Observable<IMatch[]> {
    return this.afs.collection<IMatch>(this.path, ref => ref.where('assignedLocation', '==', location.id)).valueChanges();
  }

  getMatchesForTeam(team: ITeam): Observable<IMatch[]> {
    return this.afs.collection<IMatch>(this.path, ref => ref.where('assignedTeam', '==', team.id)).valueChanges();
  }

  getUpcomingMatches(timeLimit: Date): Observable<IMatch[]> {
    const now = new Date();
    return this.afs.collection<IMatch>(this.path, ref =>
      ref
        .where('matchEndDate', '>=', now)
        .where('matchEndDate', '<=', timeLimit)
    ).valueChanges();
  }

  getOrderedMatchList(): Observable<IMatch[]> {
    return this.afs.collection<IMatch>(this.path, ref => ref.orderBy('matchStartDate')).valueChanges();
  }

  getPastMatches(timeLimit: Date): Observable<IMatch[]> {
    const now = new Date();
    return this.afs.collection<IMatch>(this.path, ref =>
      ref
        .where('matchEndDate', '<=', now)
        .where('matchEndDate', '>=', timeLimit)
    ).valueChanges();
  }

  getMatchesWithoutResult(): Observable<IMatch[]> {
    const now = new Date();
    return this.afs.collection<IMatch>(this.path, ref =>
      ref
        .where('matchEndDate', '<=', now)
        .where('result', '==', null)
    ).valueChanges();
  }

  getMatchesWithResult(teamId: string): Observable<IMatch[]> {
    return this.afs.collection<IMatch>(this.path, ref =>
      ref.orderBy('result').startAt('!')
        .where('assignedTeam', '==', teamId)
    ).valueChanges();
  }

  getSeriesOfMatches(teamId: string): Observable<IMatch[]> {
    const now = new Date();

    return this.afs.collection<IMatch>(this.path, ref =>
      ref.where('assignedTeam', '==', teamId)
        .where('matchEndDate', '<=', now)
        .orderBy('matchEndDate', 'desc')
        .limit(5)
    ).valueChanges();
  }

  setNewMatch(): Observable<IMatch> {
    return of({
      assignedCategories: [],
      assignedLocation: '',
      assignedTeam: '',
      creationAt: this.authService.getCreationAt(),
      creationBy: this.authService.getCreationBy(),
      homeTeam: {
        title: ''
      },
      guestTeam: {
        title: ''
      },
      isHomeTeam: true,
      isOfficialMatch: true,
      matchStartDate: null,
      matchEndDate: null,
      matchLink: '',
      matchType: '',
      title: ''
    });
  }

  getOtherEventList(): { id: number, title: string }[] {
    return [
      { id: 1, title: 'ohne Wertung' },
      { id: 2, title: 'Abbruch' },
      { id: 3, title: 'Ausfall' },
      { id: 4, title: 'Absetzung' },
      { id: 5, title: 'Annulierung' },
      { id: 6, title: 'Sportgerichtsurteil' },
      { id: 7, title: 'Verwaltungsentscheid' },
      { id: 8, title: 'Nichtantritt Beide' },
      { id: 9, title: 'Nichtantritt Gast' },
      { id: 10, title: 'Nichtantritt Heim' },
      { id: 11, title: 'nach Elfmeterschießen' },
      { id: 12, title: 'nach Verlängerung' },
      { id: 13, title: 'keine Angabe' },
      { id: 14, title: 'ohne Ergebnis' }
    ];
  }

  removePlayerFromStartingElevenAndSubstitutes(memberId: string, match: IMatch) {
    console.log('MemberId:' + memberId + ' MatchId: ' + match.id);
  }

  setPlayerToSubstitute(memberId: string, match: IMatch) {
    console.log('MemberId:' + memberId + ' MatchId: ' + match.id);
  }

  setPlayerToStartingEleven(memberId: string, match: IMatch, position: ICoord) {
    if (!match.startingEleven) match.startingEleven = [];
    match.startingEleven.push({
      position: position,
      memberId: memberId
    });
    return this.updateMatch(match.id, match);
  }

  getMatchEventCategories(): IMatchEventCategory[] {
    return [
      {
        id: 0,
        parentCategory: 'match',
        title: 'startFirstHalf'
      },
      {
        id: 1,
        parentCategory: 'match',
        title: 'endFirstHalf'
      },
      {
        id: 2,
        parentCategory: 'match',
        title: 'startSecondHalf'
      },
      {
        id: 3,
        parentCategory: 'match',
        title: 'endSecondHalf'
      },
      {
        id: 4,
        parentCategory: 'match',
        title: 'startExtraTime'
      },
      {
        id: 5,
        parentCategory: 'match',
        title: 'halfExtraTime'
      },
      {
        id: 6,
        parentCategory: 'match',
        title: 'endExtraTime'
      },
      {
        id: 7,
        parentCategory: 'match',
        title: 'penaltyShootout'
      },
      {
        id: 8,
        parentCategory: 'match',
        title: 'endMatch'
      },
      {
        id: 9,
        parentCategory: 'match',
        title: 'matchAbandoned'
      },
      {
        id: 10,
        parentCategory: 'match',
        title: 'halfTimeConclusion'
      },
      {
        id: 11,
        parentCategory: 'match',
        title: 'conclusion'
      },
      {
        id: 12,
        parentCategory: 'match',
        title: 'additionalTime',
        showTextInput: true,
        inputTitle: 'additionalTime'
      },
      {
        id: 13,
        parentCategory: 'scene',
        title: 'goal',
        playerOneTitle: 'from',
        showPlayerOneInput: true,
        playerTwoTitle: 'assist',
        showPlayerTwoInput: true
      },
      {
        id: 14,
        parentCategory: 'scene',
        title: 'bigChance',
        playerOneTitle: 'from',
        showPlayerOneInput: true,
        playerTwoTitle: 'assist',
        showPlayerTwoInput: true
      },
      {
        id: 15,
        parentCategory: 'scene',
        title: 'substitution',
        playerOneTitle: 'for',
        showPlayerOneInput: true,
        playerTwoTitle: 'new',
        showPlayerTwoInput: true
      },

      {
        id: 16,
        parentCategory: 'punishments',
        title: 'yellowCard',
        playerOneTitle: 'for',
        showPlayerOneInput: true
      },
      {
        id: 17,
        parentCategory: 'punishments',
        title: 'yellowRedCard',
        playerOneTitle: 'for',
        showPlayerOneInput: true
      },
      {
        id: 18,
        parentCategory: 'punishments',
        title: 'redCard',
        playerOneTitle: 'for',
        showPlayerOneInput: true
      },
      {
        id: 19,
        parentCategory: 'punishments',
        title: 'timePunishment',
        playerOneTitle: 'for',
        showPlayerOneInput: true
      },
      {
        id: 20,
        parentCategory: 'match',
        title: 'matchPreview'
      }
    ];
  }
}
