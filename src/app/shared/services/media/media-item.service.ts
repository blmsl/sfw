import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { AngularFireStorage } from 'angularfire2/storage';
import { ICreation } from '../../interfaces/creation.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MediaItemService {

  private collectionRef: AngularFirestoreCollection<IMediaItem>;
  private path = `files`;
  public mediaItems$: Observable<IMediaItem[]>;

  constructor(private afs: AngularFirestore,
              private authService: AuthService,
              private storage: AngularFireStorage) {
    this.collectionRef = this.afs.collection<IMediaItem>(this.path);
    this.mediaItems$ = this.collectionRef.valueChanges();
  }

  createMediaItem(mediaItem: IMediaItem): Promise<void> {
    const creation: ICreation = this.authService.getCreation();
    mediaItem.creation = creation;
    return this.afs.collection(this.path).doc(mediaItem.id).set(mediaItem, { merge: true });
  }

  removeMediaItem(mediaItem: IMediaItem): Promise<void> {
    return this.afs.collection(this.path).doc(mediaItem.id).delete();
  }

  deleteMediaFileFromStorage(mediaItem) {
    return this.storage.storage.refFromURL(mediaItem.downloadURL).delete();
  }

  getMediaItemByItemId(itemId: string): Observable<IMediaItem[]>{
    const collection: AngularFirestoreCollection<IMediaItem> = this.afs.collection('files', ref => ref.where('itemId', '==', itemId));
    return collection.valueChanges();
  }

}
