import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const memberPath = 'members';

export const dfbMemberWriteCron = functions.database.ref('/dfb-members/{userId}').onWrite((change, context) => {

  const data = change.after.val();

  if (!data) return true;

  console.log(data);
  console.log('write dfb-member');

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
        .then((userSnapshot: FirebaseFirestore.QuerySnapshot) => {

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

          const memberData: any = {
            dfbImport: true,
            mainData: mainData,
            clubData: {
              assignedClub: clubId
            },
            dfbData: dfbData
          };
          if (userSnapshot.empty) {
            memberData.id = db.collection(memberPath).doc().id;
            memberData.creation = {
              from: 'system',
              at: admin.database.ServerValue.TIMESTAMP
            };
            return db.collection(memberPath).doc(data.firstName + '-' + data.lastName + '-' + birthDate).set(memberData);
          }
          else {
            console.log('member is already here');
            console.log(userSnapshot.docs[0].id);
            const doc = userSnapshot.docs[0];
            return doc.ref.set(memberData, { merge: true });
          }
        })
        .catch((error: any) => console.error(error));
    });
});

export const dfbMemberDeleteCron = functions.database.ref('/dfb-members/{userId}').onDelete((snap, context) => {
  const data = snap.val();
  return db.collection(memberPath).doc(data.firstName + '-' + data.lastName + '-' + data.birthday)
    .delete()
    .catch((error: any) => console.error(error));
});

export const dfbMemberUpdateCron = functions.database.ref('/dfb-members/{userId}').onUpdate((change, context) => {

  const data = change.after.val();

  if (!data) return true;

  console.log(data);
  console.log('updated dfb-member');

  return true;
});
