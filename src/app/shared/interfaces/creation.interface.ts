import * as firebase from 'firebase';

export interface ICreation {
  at: firebase.firestore.Timestamp;
  by: string;
}
