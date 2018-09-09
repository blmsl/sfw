import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

let data;
const bucket = admin.storage().bucket('sf-winterbach.appspot.com');

export const deleteMediaItemCron = functions
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .firestore.document('files/{mediaItemId}').onDelete((snap) => {
    data = snap.data();
    return bucket.file(data.downloadURL).delete();
  });
