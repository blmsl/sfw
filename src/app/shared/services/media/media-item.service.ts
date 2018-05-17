import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { AngularFireStorage } from 'angularfire2/storage';
import { ICreation } from '../../interfaces/creation.interface';
import { AuthService } from '../auth/auth.service';
import { FileType } from '../../interfaces/media/file-type.interface';

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

  removeMediaItem(itemId): Promise<void> {
    return this.afs.collection(this.path).doc(itemId).delete();
  }

  getMediaItemByIdAndItemId(id: string, itemId?: string): AngularFirestoreCollection<IMediaItem> {
    return this.afs.collection('files', ref => {
      return !itemId ?
        ref.where('id', '==', id)
        :
        ref.where('itemId', '==', itemId).where('id', '==', id);
    });
  }

  getCurrentImage(type: string, id: string, itemId: string): Observable<string> {
    let foundFile: string;
    return this.getMediaItemByIdAndItemId(id, itemId).valueChanges().map((mediaItems: IMediaItem[]) => {
      mediaItems.forEach((mediaItem: IMediaItem) => {
        if (FileType.getMimeClass(mediaItem.file) === 'image') {
          foundFile = mediaItem.downloadURL;
        }
      });
      // set default-Image
      return foundFile ? foundFile : this.getImagePlaceHolder(type);
    });
  }

  getImagePlaceHolder(type: string): string {
    const placeholder: string = '/assets/sfw/placeholder/';
    switch (type) {
      case 'sponsor':
        return placeholder.concat('no-image-found.jpg');
    }
  }

}
