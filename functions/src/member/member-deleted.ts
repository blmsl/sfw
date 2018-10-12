import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const memberDeleted = functions
  .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .firestore.document('/members/{memberId}').onDelete(async (change, context) => {

    console.log(context.params.memberId);

    const groups = ['ah', 'club', 'honorary', 'player'];

    try{

      for(const group of groups){
        const motWSnapshot = await admin.firestore().collection('member-of-the-week')
          .where(group + '.assignedMemberId', '==', context.params.teamId)
          .get();

        motWSnapshot.forEach(async (doc) => {
          await admin.firestore().doc('member-of-the-week/' + doc.data().id).delete();
        });
      }

      // als Vorstandsmitglied löschen
      // als Trainer, Betreuer etc. löschen
      /* als Spieler einer Mannschaft löschen
      const teamsSnapshot = await admin.firestore().collection('teams')
        .where('assignedTeam', '==', context.params.teamId)
        .get();

      matchesSnapshot.docs.forEach(async (doc) => {
        await admin.firestore().doc('matches/' + doc.data().id).delete();
      });*/


      // in Aufstellungen löschen
      // in Auswechselungen und Kommentaren löschen

    }catch (e) {
      console.log(e);
    }

    return true;

  });
