import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { IArticle } from '../../interfaces/article.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { ILocation } from '../../interfaces/location/location.interface';
import { ITeam } from '../../interfaces/team/team.interface';
import { take, map } from 'rxjs/operators';
import { IInterview } from '../../interfaces/member/interview.interface';
import { IMatch } from '../../interfaces/match/match.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class ArticleService {

  private collectionRef: AngularFirestoreCollection<IArticle>;
  private path = `articles`;

  articles$: Observable<IArticle[]>;

  public publicationStatuses: {
    value: number,
    title: string
  }[] = [
      { value: 0, title: 'all' },
      { value: 1, title: 'published' },
      { value: 2, title: 'scheduled' },
      { value: 3, title: 'draft' },
      { value: 4, title: 'featured' }
    ];

  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService) {
    this.collectionRef = this.afs.collection<IArticle>(this.path);
    this.articles$ = this.collectionRef.valueChanges();
  }

  createArticle(article: IArticle): Promise<void> {
    article.id = this.afs.createId();
    if (article.articleDate) {
      article.articleDate = article.articleDate.toString();
    }
    if (article.publication.dateTime) {
      article.publication.dateTime = article.publication.dateTime.toString();
    }
    return this.afs.collection(this.path).doc(article.id).set(article);
  }

  removeArticle(article: IArticle): Promise<void> {
    return this.afs.collection(this.path).doc(article.id).delete();
  }

  updateArticle(articleId: string, article: IArticle): Promise<any> {
    if (article.articleDate) {
      article.articleDate = article.articleDate.toString();
    }
    if (article.publication.dateTime) {
      article.publication.dateTime = article.publication.dateTime.toString();
    }
    return this.afs.collection(this.path).doc(articleId).update(article);
  }

  getArticleById(articleId: string): Observable<IArticle | null> {
    return this.afs.doc<IArticle>(this.path + '/' + articleId).valueChanges();
  }

  getArticlesForMatch(matchId: string): Observable<IArticle[]> {
    return this.afs.collection<IArticle>(this.path, ref => ref.where('assignedMatches', 'array-contains', matchId)).valueChanges();
  }

  getArticlesForLocation(location: ILocation): Observable<IArticle[]> {
    return this.afs.collection<IArticle>(this.path, ref => ref.where('assignedLocation', '==', location.id)).valueChanges();
  }

  getLatestArticles(limit: number): Observable<IArticle[]> {
    return this.afs.collection<IArticle>(this.path, ref => ref.orderBy('creation.at', 'desc').limit(limit)).valueChanges();
  }

  getArticlesForTeam(team: ITeam): Observable<IArticle[]> {
    return this.afs.collection<IArticle>(this.path, ref => ref.where('assignedTeams', 'array-contains', team.id)).valueChanges();
  }

  getArticlesByInterview(interviews: IInterview[]): Observable<IArticle[]> {
    if (!interviews || interviews.length === 0) {
      return of([]);
    }
    let observables = [];
    for (let i = 0; i < interviews.length; i++) {
      observables.push(this.getArticleById(interviews[i].assignedArticleId).pipe(
        take(1)
      ));
    }
    return forkJoin(...observables);
  }

  getArticlesNotAssignedToMatch(match: IMatch): Observable<IArticle[]> {
    return this.articles$.pipe(
      map((articles: IArticle[]) => {
        return articles.map((article: IArticle) => {
          if (!article.assignedMatches || !article.assignedMatches.includes(match.id)) {
            return article;
          }
        });
      })
    )
  }

  assignMatchToArticles(matchId: string, articles: IArticle[]): Observable<IArticle> {
    if (!matchId || !articles || articles.length === 0) return;

    let observables = [];

    for (let i = 0; i < articles.length; i++) {
      articles[i].assignedMatches ? articles[i].assignedMatches.push(matchId) : articles[i].assignedMatches = [matchId];
      observables.push(this.updateArticle(articles[i].id, articles[i]));
    }
    return forkJoin(...observables);
  }

  setNewArticle(): Observable<IArticle> {
    const article: IArticle = {
      title: '',
      publication: this.authService.getPublication(),
      creation: this.authService.getCreation()
    };
    return of(article);
  }

}
