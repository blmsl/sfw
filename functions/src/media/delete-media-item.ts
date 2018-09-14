import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

let data;

const bucket = admin.storage().bucket();

export const deleteMediaItemCron = functions
  .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .firestore.document('files/{mediaItemId}').onDelete((snap) => {
    data = snap.data();

    let path:string = '';
    if('assignedObjects' in data){
      Object.keys(data.assignedObjects).forEach(function (key) {
        path = path + '/' + key;
      });
    }

    return bucket.file(path ? path + '/' + data.itemId : data.itemId).delete();
  });
