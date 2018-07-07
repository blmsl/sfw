import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const deleteMediaItemCron = functions.firestore.document('files/{mediaItemId}').onDelete((snap, context) => {

  const appOptions = JSON.parse(process.env.FIREBASE_CONFIG as any);
  const bucketName: string = appOptions.storageBucket;

  const storage = admin.storage().bucket(bucketName);

  if (snap && snap.get('path')) {
    return storage.file(snap.get('path')).delete();
  }

  return true;

});
