// https://github.com/firebase/functions-samples/tree/master/presence-firestore/public

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firestore = admin.firestore();

export const onUserStatusChanged = functions
  .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/status/{uid}').onUpdate((change, context: any) => {

    const eventStatus = change.after.val();

    const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`);

    return change.after.ref.once('value').then((statusSnapshot: any) => {
      const status = statusSnapshot.val();
      console.log(status, eventStatus);
      /*if (status.last_changed <= eventStatus.last_changed) {
        return;
      }*/
      eventStatus.last_changed = new Date(eventStatus.last_changed);
      return userStatusFirestoreRef.set(eventStatus);
    });
  });
