import { Injectable } from '@angular/core';
import {
  forkJoin,
  Observable,
  of
} from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { AuthService } from '../auth/auth.service';
import { FileType } from '../../interfaces/media/file-type.interface';
import { map, take } from 'rxjs/operators';

@Injectable()
export class MediaItemService {

  private collectionRef: AngularFirestoreCollection<IMediaItem>;
  private path = `files`;
  public mediaItems$: Observable<IMediaItem[]>;

  constructor(private afs: AngularFirestore,
    private authService: AuthService) {
    this.collectionRef = this.afs.collection<IMediaItem>(this.path);
    this.mediaItems$ = this.collectionRef.valueChanges().pipe(
      map((mediaItems: IMediaItem[]) => {
        mediaItems.sort((a: IMediaItem, b: IMediaItem) => {
          return a.ordering < b.ordering ? 0 : 1;
        });
        return mediaItems;
      })
    );
  }

  createMediaItem(mediaItem: IMediaItem): Promise<void> {
    mediaItem.creation = this.authService.getCreation();
    mediaItem.id = this.afs.createId();
    mediaItem.ordering = 0;
    return this.afs.collection(this.path).doc(mediaItem.id).set(mediaItem, { merge: true });
  }

  removeMediaItem(mediaItemId: string): Promise<void> {
    return this.afs.collection(this.path).doc(mediaItemId).delete();
  }

  getMediaItemById(id: string): Observable<IMediaItem> {
    return this.afs.doc<IMediaItem>(this.path + '/' + id).valueChanges();
  }

  getMediaItemsById(mediaItemIds: string[]): Promise<IMediaItem[]> {
    if (mediaItemIds.length === 0) {
      return of([]).toPromise();
    }
    const items = [];
    for (let i = 0; i < mediaItemIds.length; i++) {
      items.push(this.getMediaItemById(mediaItemIds[i]).pipe(
        take(1)
      ));
    }
    return forkJoin(...items).toPromise();
  }

  updateMediaItems(mediaItems: IMediaItem[]): Promise<any> {
    let updates = [];
    for (let i = 0; i < mediaItems.length; i++) {
      mediaItems[i].ordering = i;
      updates.push(this.updateMediaItem(mediaItems[i]));
    }
    return of(updates).toPromise();
  }

  updateMediaItem(mediaItem: IMediaItem): Promise<void> {
    return this.afs.collection(this.path).doc(mediaItem.id).update(mediaItem);
  }

  getMediaItems(assignedObjects: any, itemId: string): Observable<IMediaItem[]> {
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
