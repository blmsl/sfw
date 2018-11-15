import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// const bucket = admin.storage().bucket();

export const deleteMediaItemCron = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 15 })
  .firestore.document('files/{mediaItemId}').onDelete(async (snap) => {

    const data = snap.data() || {};

    console.log(data);

    let path: string = '/';
    if ('assignedObjects' in data) {
      data.assignedObjects.forEach((key: string) => {
        path = path + '/' + key;
      });
    }

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

    const storage = admin.storage();
    console.log(path + data.itemId);
    return storage.bucket().file(path + data.itemId).delete();
  });
