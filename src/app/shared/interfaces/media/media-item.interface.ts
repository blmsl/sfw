import { ICreation } from '../creation.interface';

export class IMediaItem {

  id: string;

  itemID: string; // id from parent object
  downloadURL: string;

  file: {
    size?: number;
    type?: string;
    name?: string;
  };

  description?: string;
  fileCredits?: string;
  isExternal?: boolean;
  creation?: ICreation;
  assignedItemGallery?: string;
  // publication?: IPublication;
}
