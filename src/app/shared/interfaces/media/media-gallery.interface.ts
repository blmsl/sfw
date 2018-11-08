export interface IMediaGallery {

  id?: string;
  title: string;
  description?: string;

  assignedItem: string;
  assignedItemType: string;

  assignedMediaItems?: string[];

  creationAt: any;
  creationBy: string;
  publicationAt?: any;
  publicationStatus?: number;
  publicationBy?: string;

}
