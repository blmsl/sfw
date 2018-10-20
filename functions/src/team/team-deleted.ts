import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const teamDeleted = functions
  .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .firestore.document('/teams/{teamId}').onDelete(async (change, context) => {

    console.log(context.params.teamId);

    try {

      // als Team der Woche Eintrag löschen
      const totWSnapshot = await admin.firestore().collection('team-of-the-month')
        .where('assignedTeamId', '==', context.params.teamId)
        .get();

      totWSnapshot.forEach(async (doc) => {
        await admin.firestore().doc('team-of-the-month/' + doc.data().id).delete();
      });

      // Spiele dieser Mannschaft löschen
      const matchesSnapshot = await admin.firestore().collection('matches')
        .where('assignedTeam', '==', context.params.teamId)
        .get();

      matchesSnapshot.docs.forEach(async (doc) => {
        await admin.firestore().doc('matches/' + doc.data().id).delete();
      });

    } catch (e) {
      console.log(e);
    }

  });
