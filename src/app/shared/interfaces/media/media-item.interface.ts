import { ICreation } from '../creation.interface';

export class IMediaItem {

  id: string;

  itemId: string; // id from parent object
  downloadURL: string;

  file: {
    size?: number;
    type?: string;
    name?: string;
  };

  path?: string;

  description?: string;
  fileCredits?: string;
  isExternal?: boolean;
  creation?: ICreation;
  assignedItemGallery?: string;
  // publication?: IPublication;
}
