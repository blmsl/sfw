import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const memberDeleted = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 15 })
  .firestore.document('/members/{memberId}').onDelete(async (change, context) => {

    console.log(context.params.memberId);

    const groups = ['ah', 'club', 'honorary', 'player'];

    try {

      for (const group of groups) {
        const motWSnapshot = await admin.firestore().collection('member-of-the-week')
          .where(group + '.assignedMemberId', '==', context.params.memberId)
          .get();

        motWSnapshot.forEach(async (doc) => {
          await admin.firestore().doc('member-of-the-week/' + doc.data().id).delete();
        });
      }

      // als Ehrenmitglied löschen

      // als Vorstandsmitglied löschen

      // als Trainer, Betreuer etc. löschen

      // als Spieler einer Mannschaft löschen
      const teamsSnapshot = await admin.firestore().collection('teams')
        .where('assignedPlayers', 'array-contains', context.params.memberId)
        .get();

      teamsSnapshot.docs.forEach(async (doc) => {
        const data = doc.data();
        console.log(data.assignedPlayers);
        data.assignedPlayers.splice(data.assignedPlayers.indexOf(context.params.memberId), 1);
        console.log(data.assignedPlayers);
        await admin.firestore().doc('teams/' + doc.data().id + '').update(data);
      });


      // in Aufstellungen löschen
      // in Auswechselungen und Kommentaren löschen

    } catch (e) {
      console.log(e);
    }

    return true;

  });
