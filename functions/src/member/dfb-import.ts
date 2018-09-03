import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const memberPath = 'members';
const clubPath = 'clubs';

let data;
let fireBaseUserId;

export const dfbMemberWriteCron = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/dfb-members/{userId}').onWrite((change, context) => {

  data = change.after.val();

  if (!data) {
    return true;
  }

  fireBaseUserId = context.params.userId;

  let birthDate = '';
  if (data.birthday !== '') {
    birthDate = data.birthday.substring(0, 10);
  }

  return db.collection('clubs')
    .where('title', '==', data.assignedClub)
    .get()
    .then((clubSnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (clubSnapshot.empty) {
        const clubData = {
          id: db.collection(clubPath).doc().id,
          title: data.assignedClub,
          creation: {
            from: 'system',
            at: admin.database.ServerValue.TIMESTAMP
          }
        };
        return admin.firestore().doc(clubData.id).set(clubData).then(
          () => {
            return db.collection(clubPath).doc().id;
          }
        )
      } else {
        return clubSnapshot.docs[0].id;
      }
    })
    .then((club) => {
      return db.collection(memberPath)
        .where('id', '==', fireBaseUserId)
        //.where('mainData.firstName', '==', data.firstName)
        //.where('mainData.lastName', '==', data.lastName)
        //.where('mainData.birthday', '==', birthDate)
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
              assignedClub: club
            },
            dfbData: dfbData
          };

          if (userSnapshot.empty) {
            console.log('creating new member');
            memberData.id = fireBaseUserId; // db.collection(memberPath).doc().id;
            memberData.creation = {
              from: 'system',
              at: admin.database.ServerValue.TIMESTAMP
            };
            return db.collection(memberPath).doc(fireBaseUserId /*memberData.id*/).set(memberData);
          }
          else {
            console.log('member already exists' + userSnapshot.docs[0].id);
            const doc = userSnapshot.docs[0];
            return doc.ref.set(memberData, { merge: true });
          }
        });
    });
});

export const dfbMemberDeleteCron = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/dfb-members/{userId}').onDelete((snap, context) => {
  fireBaseUserId = context.params.userId;
  return db.collection(memberPath).doc(fireBaseUserId).delete().catch((error: any) => console.error(error));
});

export const dfbMemberUpdateCron = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/dfb-members/{userId}').onUpdate((change) => {
  data = change.after.val();
  if (!data) return true;
  console.log(data);
  console.log('updated dfb-member');
  return true;
});
