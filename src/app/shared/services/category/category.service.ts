import { Injectable }          from '@angular/core';
import {
  Observable,
  of
}                              from 'rxjs';
import { ICategory }           from '../../interfaces/category.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
}                              from 'angularfire2/firestore';
import { AuthService }         from '../auth/auth.service';
import { CategoryTypeService } from '../category-type/category-type.service';
import { switchMap }           from 'rxjs/operators';
import { ICategoryType }       from '../../interfaces/category-type.interface';

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
    console.log(category.id);
    return this.afs.collection(this.path).doc(category.id).delete();
  }

  updateCategory(categoryId: string, category: ICategory): Promise<any> {
    return this.afs.collection(this.path).doc(categoryId).update(category);
  }

  getCategoryById(categoryId: string): Observable<ICategory | null> {
    return this.afs.doc<ICategory>(this.path + '/' + categoryId).valueChanges();
  }

  setNewCategory(): Observable<ICategory> {
    return of({
      isImported: false,
      title: '',
      description: ' ',
      assignedCategoryType: '',
      creation: this.authService.getCreation()
    });
  }

  getCategoriesByCategoryType(linkType: string): Observable<ICategory[]> {
    return this.categoryTypeService.getCategoryTypeByLink(linkType).pipe(
      switchMap((categoryType: ICategoryType) => {
        return this.afs.collection<ICategory>(this.path, ref => ref.where('assignedCategoryType', '==', categoryType.id)).valueChanges();
      })
    );
  }
}
