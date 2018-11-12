import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const userDisabled = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 15 })
  .firestore.document('/users/{userId}').onUpdate((change, context) => {

    // console.log(change.after.data());
    // console.log(context.params.userId);

    const data: any = change.after.data();
    const userId: string = context.params.userId;

    return admin.auth().updateUser(userId, {
      disabled: data.isDisabled
    })

  });
