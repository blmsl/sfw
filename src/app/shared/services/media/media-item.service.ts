import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class MediaItemService {

  private collectionRef: AngularFirestoreCollection<IMediaItem>;
  private path = `files`;
  public mediaItems$: Observable<IMediaItem[]>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.collectionRef = this.afs.collection<IMediaItem>(this.path);
    this.mediaItems$ = this.collectionRef.valueChanges();
  }

  createMediaItem(mediaItem: IMediaItem): Promise<void> {
    console.log(mediaItem);
    return this.afs.collection(this.path).doc(mediaItem.id).set(mediaItem);
  }


  removeMediaItem(mediaItem: IMediaItem): Promise<void> {
    return this.afs.collection(this.path).doc(mediaItem.itemID).delete();
  }

  deleteMediaFileFromStorage(mediaItem) {
    return this.storage.storage.refFromURL(mediaItem.downloadURL).delete();
  }


}
