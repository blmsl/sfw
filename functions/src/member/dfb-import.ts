import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const dfbMemberCron = functions.database.ref('/dfb-members/{userId}').onWrite((change, context) => {

  const data = change.after.val();

  if (!data) return true;

  const db = admin.firestore();
  const memberPath = 'members';

  return db.collection('clubs')
    .where('title', '==', data.assignedClub)
    .get()
    .then((values: FirebaseFirestore.QuerySnapshot) => {

      const clubId = values.docs[0].id;

      let birthDate = '';
      if (data.birthday !== '') {
        birthDate = data.birthday.substring(0, 10);
      }

      return db.collection(memberPath)
        .where('mainData.firstName', '==', data.firstName)
        .where('mainData.lastName', '==', data.lastName)
        .where('mainData.birthday', '==', birthDate)
        .get()
        .then((values: FirebaseFirestore.QuerySnapshot) => {

          const mainData = {
            firstName: data.firstName,
            lastName: data.lastName,
            birthday: birthDate,
            gender: data.ageGroup.indexOf('innen') !== -1 ? 'female' : 'male'
          };

          const dfbData = {
            passNumber: data.passNumber ? data.passNumber : '',
            ageGroup: data.ageGroup ? data.ageGroup : '',
            eligibleForOfficialMatches: data.eligibleFriendly,
            eligibleForFriendlyMatches: data.eligibleOfficial,
            signOut: data.signOut,
            playerStatus: data.playerStatus ? data.playerStatus : '',
            guestPlayer: {
              guestRight: data.guestRight,
              season: data.season ? data.season : '',
              type: data.type ? data.type : ''
            },
            passPrint: data.passPrint,
            allowedToPlay: data.allowedToPlay
          };

          let memberData: any = {
            isImported: true,
            mainData: mainData,
            clubData: {
              assignedClub: clubId
            },
            dfbData: dfbData
          };
          if (values.empty) {
            memberData.id = db.collection(memberPath).doc().id;
            memberData.creation = {
              from: 'system',
              at: new Date()
            };
            return db.collection(memberPath).doc(memberData.id).set(memberData);
          }
          else {
            const doc = values.docs[0];
            return doc.ref.set(memberData, { merge: true });
          }
        })
        .catch((error: any) => console.error(error));

    });
});
