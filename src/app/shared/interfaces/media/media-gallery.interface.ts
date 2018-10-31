import { ICreation } from '../creation.interface';
import { IPublication } from '../publication.interface';
import { IMediaItem } from './media-item.interface';

export interface IMediaGallery {

  id?: string;
  title: string;

  assignedItem: string;
  assignedItemType: string;

  assignedMediaItems?: IMediaItem[];

  creation: ICreation;
  publication?: IPublication;

}
