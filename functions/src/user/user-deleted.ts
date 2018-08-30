import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const userDeleted = functions.firestore.document('/users/{userId}').onDelete((snap) => {

  const userId = snap.id;

  return admin.auth()
    .deleteUser(userId)
    .then(() => console.log('user ', userId, ' deleted'))
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });

});
