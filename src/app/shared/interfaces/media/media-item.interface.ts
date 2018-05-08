import { ICreation } from '../creation.interface';

export class IMediaItem {

  itemID: string;
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
