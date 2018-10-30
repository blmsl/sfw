import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { ICreation } from '../../interfaces/creation.interface';
import { AuthService } from '../auth/auth.service';
import { IMediaGallery } from '../../interfaces/media/media-gallery.interface';

@Injectable()
export class MediaGalleryService {

  private collectionRef: AngularFirestoreCollection<IMediaGallery>;
  private path = `galleries`;
  public mediaGalleries$: Observable<IMediaGallery[]>;

  private galleryTypes: string[] = ['article', 'club', 'location', 'match', 'member', 'sponsor', 'team'];

  constructor(private afs: AngularFirestore,
    private authService: AuthService) {
    this.collectionRef = this.afs.collection<IMediaGallery>(this.path);
    this.mediaGalleries$ = this.collectionRef.valueChanges();
  }

  createMediaGallery(mediaGallery: IMediaGallery): Promise<void> {
    console.log(mediaGallery);
    mediaGallery.id = this.afs.createId();
    const creation: ICreation = this.authService.getCreation();
    mediaGallery.creation = creation;
    return this.afs.collection(this.path).doc(mediaGallery.id).set(mediaGallery);
  }

  removeMediaGallery(mediaGallery: IMediaGallery): Promise<void> {
    return this.afs.collection(this.path).doc(mediaGallery.id).delete();
  }

  updateMediaGallery(mediaGallery: IMediaGallery): Promise<any> {
    return this.afs.collection(this.path).doc(mediaGallery.id).update(mediaGallery);
  }

  getMediaGalleryTypes(): string[] {
    return this.galleryTypes;
  }

}
