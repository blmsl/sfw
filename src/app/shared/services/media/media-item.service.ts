import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { AuthService } from '../auth/auth.service';
import { FileType } from '../../interfaces/media/file-type.interface';
import { map } from 'rxjs/operators';

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
    mediaItem.creation = this.authService.getCreation();
    return this.afs.collection(this.path).doc(this.afs.createId()).set(mediaItem, { merge: true });
  }

  removeMediaItem(itemId): Promise<void> {
    return this.afs.collection(this.path).doc(itemId).delete();
  }

  getMediaItems(assignedObjects: any, itemId: string):Observable<IMediaItem[]> {
    return this.afs.collection<IMediaItem>('files', ref => {
      if (!assignedObjects) {
        console.log(itemId);
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
    }).valueChanges();
  }

  getAssignedMedia(assignedObjects: any, itemId: string): Observable<IMediaItem[]> {
    return this.getMediaItems(assignedObjects, itemId).pipe(
      map((mediaItems: IMediaItem[]) => {
        return mediaItems;
      })
    );
  }

  getCurrentImage(assignedObjects: any, itemId: string, placeholderImage: string = ''): Observable<IMediaItem> {
    return this.getMediaItems(assignedObjects, itemId).pipe(
      map((mediaItems: IMediaItem[]) => {
        let foundFile: IMediaItem;
        mediaItems.forEach((mediaItem: IMediaItem) => {
          if (FileType.getMimeClass(mediaItem.file) === 'image') {
            foundFile = mediaItem;
          }
        });
        // set default-Image
        return foundFile ? foundFile : this.getImagePlaceHolder(placeholderImage);
      })
    );
  }

  getImagePlaceHolder(placeholderImage: string): IMediaItem {
    let returnString = '';

    if (placeholderImage === '') {
      returnString += '/assets/sfw/placeholder/no-image-found.jpg';
    } else {
      returnString += placeholderImage;
    }
    return {
      downloadURL: returnString
    };
  }

}
