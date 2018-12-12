import { Routes } from '@angular/router';
import { UploaderComponent } from './uploader.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { UploaderResolver } from './uploader.resolver';
import { MediaGalleryFormComponent } from '../../shared/components/media/media-gallery-form/media-gallery-form.component';

export const uploaderRoutes: Routes = [
  {
    path: '',
    component: UploaderComponent,
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: GalleryListComponent,
  },
  {
    path: 'create',
    component: GalleryEditComponent,
    resolve: {
      gallery: UploaderResolver
    }
  },
  {
    path: 'edit/:galleryId',
    component: GalleryEditComponent,
    resolve: {
      gallery: UploaderResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
