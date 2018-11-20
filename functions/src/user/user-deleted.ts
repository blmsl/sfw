import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const userDeleted = functions
  .region('europe-west1')
  .runWith({ memory: '256MB', timeoutSeconds: 10 })
  .firestore.document('/users/{userId}').onDelete((change, context) => {

    // console.log(change.after.data());
    // console.log(context.params.userId);

    const userId: string = context.params.userId;
    return admin.auth().deleteUser(userId);

  });
