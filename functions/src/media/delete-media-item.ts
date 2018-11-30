import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import { tmpdir } from 'os';
import { join, dirname } from 'path';

export const deleteMediaItemCron = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 15 })
  .firestore.document('files/{mediaItemId}').onDelete(async (snap) => {

    const data = snap.data() || {};
    const workingDir = join(tmpdir(), 'thumbnails');

    await fs.ensureDir(workingDir);

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
      const newItemList = galleryData.assignedMediaItems.splice(galleryData.assignedMediaItems.indexOf(data.id), 1);
      await doc.ref.update({
        assignedMediaItems: newItemList
      });
    });

    const storage = admin.storage();

    const sizes = [64, 128, 256, 512];

    const deletePromises = sizes.map(async size => {
      const thumbName = `thumb@${size}_${data.itemId}`;
      const thumbPath = join(workingDir, thumbName);
      return storage.bucket().file(thumbPath).delete();
    });

    await Promise.all(deletePromises);
    return storage.bucket().file(path + '/' + data.itemId).delete();

  });
