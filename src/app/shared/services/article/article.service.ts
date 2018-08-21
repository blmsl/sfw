import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { IArticle } from '../../interfaces/article.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/internal/operators';
import { ILocation } from '../../interfaces/location/location.interface';

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

  getArticlesForLocation(location: ILocation) {
    return this.afs.collection<IArticle>(this.path, ref => ref.where('assignedLocation', '==', location.id)).valueChanges();
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
