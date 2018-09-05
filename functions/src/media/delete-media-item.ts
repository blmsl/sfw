import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

let data;
const bucket = admin.storage().bucket();

export const deleteMediaItemCron = functions.firestore.document('files/{mediaItemId}').onDelete((snap) => {
  data = snap.data();
  return bucket.file(data.downloadURL).delete();
});
