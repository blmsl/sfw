import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { ICategoryType } from '../../interfaces/category-type.interface';
import { CategoryTypeService } from '../category-type/category-type.service';
import {
  map,
  mergeMap
} from 'rxjs/operators';

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

  setNewCategory(): ICategory {
    return {
      isImported: false,
      title: '',
      description: ' ',
      assignedCategoryType: '',
      creation: this.authService.getCreation()
    };
  }

  getCategoriesByCategoryType(linkType: string): Observable<ICategory[]> {

    return this.categoryTypeService.categoryTypes$.pipe(
      map((categoryTypes: ICategoryType[]) => {
        return categoryTypes.filter((categoryType: ICategoryType) => {
          return categoryType.link === linkType;
        });
      }),
      mergeMap((categoryTypes: ICategoryType[]) => {
        if (categoryTypes.length === 0) {
          return [];
        }
        return this.categories$.pipe(
          map((categories: ICategory[]) => {
            return categories.filter((category: ICategory) => {
              return category.assignedCategoryType === categoryTypes[0].id;
            })
          })
        );
      })
    );

  }
}
