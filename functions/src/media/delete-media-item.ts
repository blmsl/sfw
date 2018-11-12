import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

let data;

const bucket = admin.storage().bucket();

export const deleteMediaItemCron = functions
  .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .firestore.document('files/{mediaItemId}').onDelete(async (snap) => {
    data = snap.data();

    console.log(data.id);

    let path: string = '/';
    if ('assignedObjects' in data) {
      data.assignedObjects.forEach((key: string) => {
        path = path + '/' + key;
      });
    }
    console.log(path);

    // find galeries where this item is member of
    const galleriesSnapshot = await admin.firestore().collection('galleries')
      .where('assignedMediaItems', 'array-contains', data.id)
      .get();

    galleriesSnapshot.docs.forEach(async (doc) => {
      const galleryData = doc.data();
      console.log('Gal' + galleryData.id);
      const newItemList = galleryData.assignedMediaItems.splice(galleryData.assignedMediaItems.indexOf(data.id), 1);
      await doc.ref.update({
        assignedMediaItems: newItemList
      });
    });

    return await bucket.file(path + '/' + data.itemId).delete();
  });
