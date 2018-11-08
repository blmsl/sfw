import * as firebase from 'firebase';

export interface ISponsor {

  id?: string;
  title: string;
  internalInfo: string;
  description: string;

  externalLink?: string;

  startDate?: firebase.firestore.Timestamp;
  endDate?: firebase.firestore.Timestamp;

  assignedCategories: string[];

  creationAt: any;
  creationBy: string;
}
