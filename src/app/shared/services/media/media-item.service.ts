import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
    this.mediaItems$ = this.collectionRef.valueChanges();
  }

  createMediaItem(mediaItem: IMediaItem): Promise<void> {
    mediaItem.creationAt = this.authService.getCreationAt();
    mediaItem.creationBy = this.authService.getCreationBy();
    mediaItem.id = this.afs.createId();
    mediaItem.ordering = 0;
    return this.afs.collection(this.path).doc(mediaItem.id).set(mediaItem, { merge: true });
  }

  removeMediaItem(mediaItemId: string): Promise<void> {
    return this.afs.collection(this.path).doc(mediaItemId).delete();
  }

  getMediaItemById(mediaItemId: string): Observable<IMediaItem> {
    return this.afs.collection(this.path).doc<IMediaItem>(mediaItemId).valueChanges();
  }

  getMediaItemsById(mediaItemIds: string[]): Observable<IMediaItem[]> {
    if (mediaItemIds.length === 0) {
      return of([]);
    }
    const items = [];
    mediaItemIds.forEach((mediaItemId) => {
      items.push(this.getMediaItemById(mediaItemId).pipe(
        take(1)
      ));
    });
    return forkJoin(...items);
  }

  updateMediaItems(mediaItems: IMediaItem[]): Promise<any> {
    const updates = [];
    for (let i = 0; i < mediaItems.length; i++) {
      mediaItems[i].ordering = i;
      updates.push(this.updateMediaItem(mediaItems[i]));
    }
    return of(updates).toPromise();
  }

  updateMediaItem(mediaItem: IMediaItem): Promise<void> {
    return this.afs.collection(this.path).doc(mediaItem.id).update(mediaItem);
  }

  getMediaItems(assignedObjects: any[], itemId: string): Observable<IMediaItem[]> {
    if (assignedObjects.length === 0 && !itemId) {
      return of([]);
    }
    return this.afs.collection<IMediaItem>('files', ref => {
      if (!assignedObjects || assignedObjects.length === 0) {
        return ref
          .where('itemId', '==', itemId);
      } else {
        return ref
          .where('itemId', '==', itemId)
          .where('assignedObjects', '==', assignedObjects);
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
