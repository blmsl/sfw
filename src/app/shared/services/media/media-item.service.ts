import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { ICreation } from '../../interfaces/creation.interface';
import { AuthService } from '../auth/auth.service';
import { FileType } from '../../interfaces/media/file-type.interface';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class MediaItemService {

  private collectionRef: AngularFirestoreCollection<IMediaItem>;
  private path = `files`;
  public mediaItems$: Observable<IMediaItem[]>;

  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
    this.collectionRef = this.afs.collection<IMediaItem>(this.path);
    this.mediaItems$ = this.collectionRef.valueChanges();
  }

  createMediaItem(mediaItem: IMediaItem): Promise<void> {
    const creation: ICreation = this.authService.getCreation();
    mediaItem.creation = creation;
    return this.afs.collection(this.path).doc(mediaItem.itemId).set(mediaItem, { merge: true });
  }

  removeMediaItem(itemId): Promise<void> {
    return this.afs.collection(this.path).doc(itemId).delete();
  }

  getMediaItems(assignedObjects: any, itemId: string) {
    return this.afs.collection('files', ref => {
      if (!assignedObjects) {
        return ref
          .where('itemId', '==', itemId);
      }
      if (assignedObjects.length === 1) {
        return ref
          .where('itemId', '==', itemId)
          .where('assignedObjects.' + assignedObjects[0], '==', true);
      } else if (assignedObjects.length === 2) {
        return ref
          .where('itemId', '==', itemId)
          .where('assignedObjects.' + assignedObjects[0], '==', true)
          .where('assignedObjects.' + assignedObjects[1], '==', true);
      } else if (assignedObjects.length === 3) {
        return ref
          .where('itemId', '==', itemId)
          .where('assignedObjects.' + assignedObjects[0], '==', true)
          .where('assignedObjects.' + assignedObjects[1], '==', true)
          .where('assignedObjects.' + assignedObjects[2], '==', true);
      }
    });
  }

  getAssignedMedia(assignedObjects: any, itemId: string): Observable<IMediaItem[]>{
    return this.getMediaItems(assignedObjects, itemId).valueChanges().pipe(
      map((mediaItems: IMediaItem[]) => {
        return mediaItems;
      })
    );
  }

  getCurrentImage(assignedObjects: any, itemId: string): Observable<IMediaItem> {
    return this.getMediaItems(assignedObjects, itemId).valueChanges().pipe(
      map((mediaItems: IMediaItem[]) => {
        console.log(mediaItems);
        let foundFile: IMediaItem;
        mediaItems.forEach((mediaItem: IMediaItem) => {
          if (FileType.getMimeClass(mediaItem.file) === 'image') {
            foundFile = mediaItem;
          }
        });
        // set default-Image
        return foundFile ? foundFile : this.getImagePlaceHolder();
      })
    );
  }

  getImagePlaceHolder(): IMediaItem {
    const mediaItem = {
      downloadURL: '/assets/sfw/placeholder/no-image-found.jpg'
    };
    return mediaItem;
  }

}
