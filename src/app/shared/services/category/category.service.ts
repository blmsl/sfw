import { Injectable } from '@angular/core';
import { ICategory } from '../../interfaces/category.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { CategoryTypeService } from '../category-type/category-type.service';
import {
  forkJoin,
  Observable,
  of
} from 'rxjs';
import { ICategoryType } from '../../interfaces/category-type.interface';
import { switchMap } from 'rxjs/operators';
import { take } from 'rxjs/internal/operators';

@Injectable()
export class CategoryService {

  private collectionRef: AngularFirestoreCollection<ICategory>;
  private path = `categories`;

  categories$: Observable<ICategory[]>;

  constructor(private afs: AngularFirestore,
    private authService: AuthService,
    private categoryTypeService: CategoryTypeService) {
    this.collectionRef = this.afs.collection<ICategory>(this.path);
    this.categories$ = this.collectionRef.valueChanges();
  }

  createCategory(category: ICategory): Promise<void> {
    category.id = this.afs.createId();
    return this.afs.collection(this.path).doc(category.id).set(category);
  }

  removeCategory(category: ICategory): Promise<void> {
    return this.afs.collection(this.path).doc(category.id).delete();
  }

  updateCategory(categoryId: string, category: ICategory): Promise<any> {
    return this.afs.collection(this.path).doc(categoryId).update(category);
  }

  getCategoryById(categoryId: string): Observable<ICategory> {
    return this.afs.doc<ICategory>(this.path + '/' + categoryId).valueChanges();
  }

  setNewCategory(): Observable<ICategory> {
    return of({
      isImported: false,
      title: '',
      description: ' ',
      assignedCategoryType: '',
      creationAt: this.authService.getCreationAt(),
      creationBy: this.authService.getCreationBy()
    });
  }

  getCategoriesByCategoryType(linkType: string): Observable<ICategory[]> {
    return this.categoryTypeService.getCategoryTypeByLink(linkType).pipe(
      switchMap((categoryType: ICategoryType) => {
        if (!categoryType) {
          return of([]);
        }
        return this.afs.collection<ICategory>(this.path, ref => ref.where('assignedCategoryType', '==', categoryType.id)).valueChanges();
      })
    );
  }

  getCategoriesByIds(categoryIds: string[]): any {
    if (!categoryIds || categoryIds.length === 0) {
      return of([]);
    }

    const categoryObservables = [];
    for (let i = 0; i < categoryIds.length; i++) {
      categoryObservables.push(this.getCategoryById(categoryIds[i]).pipe(
        take(1)
      ));
    }
    return forkJoin(...categoryObservables);
  }
}
