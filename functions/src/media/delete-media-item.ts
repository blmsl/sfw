import * as functions from 'firebase-functions';

export const deleteMediaItemCron = functions.firestore.document('files/{mediaItemId}').onDelete((snap, context) => {

  // let firebaseConfig = JSON.parse(config);
  // console.log(firebaseConfig);

  const storage = functions.storage;
  console.log(storage);
  console.log(storage.object());
  console.log(storage.bucket());

  // const bucket = gcs.bucket(storageBucket + '/' + fileBucket);

  const url = snap.get('path');
  console.log(url);
  return true; // storage().bucket(bucket).file(url).delete();

});
