import { ICreation } from '../creation.interface';

export interface IMediaGallery {
  id?: string;
  title: string;
  assignedItem: string;
  assignedItemType: string;

  assignedMediaItems?: string[];

  creation: ICreation;
  // modification?: IModification[];
  // publication?: IPublication;

}
