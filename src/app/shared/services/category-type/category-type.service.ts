import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryType } from '../../interfaces/category-type.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable()
export class CategoryTypeService {

  private collectionRef: AngularFirestoreCollection<ICategoryType>;
  private path = `category-types`;

  categoryTypes$: Observable<ICategoryType[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<ICategoryType>(this.path);
    this.categoryTypes$ = this.collectionRef.valueChanges();
  }

  /*
  createCategoryType(categoryType: ICategoryType): void {
    this.afs.collection(this.path).doc(categoryType.id).set(categoryType);
  }


  removeCategoryType(categoryType: ICategoryType): Promise<any> {
    return this.afs.collection(this.path).doc(categoryType.id).delete();
  }

  updateCategoryType(categoryTypeId: string, categoryType: ICategoryType): Promise<any> {
    return this.afs.collection(this.path).doc(categoryTypeId).update(categoryType);
  }

  getCategoryTypeById(categoryTypeId: string): Observable<ICategoryType> {
    return this.afs.doc<ICategoryType>(this.path + '/' + categoryTypeId).valueChanges();
  }

  setNewCategoryType() {
    const data: ICategoryType = {
      id: this.afs.createId(),
      title: '',
      creation: this.authService.getCreation()
    };
    this.createCategoryType(data);
    return data;
  }
  */
}
