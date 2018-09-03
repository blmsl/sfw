import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const memberPath = 'members';
const clubPath = 'clubs';

let data;
let fireBaseUserId;

export const driveMemberWriteCron = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/drive-members/{userId}').onWrite((change, context) => {

  data = change.after.val();

  if (!data) {
    return true;
  }
  fireBaseUserId = context.params.userId;

  let birthDate = '';
  if (data.birthday && data.birthday.length >= 10 && data.birthday !== '') {
    birthDate = data.birthday.substring(0, 10);
  }

  return db.collection(clubPath)
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
            title: data.title ? data.title : '',
            gender: data.gender.indexOf('innen') !== -1 ? 'female' : 'male',
            firstName: data.firstName,
            lastName: data.lastName,
            birthday: birthDate
          };

          const addressData = (data.street !== '' || data.houseNumber !== '' || data.city !== '' || data.zip !== '') ? {
            streetName: data.street ? data.street : '',
            houseNumber: data.houseNumber ? data.houseNumber : '',
            city: data.city ? data.city : '',
            zip: data.zip ? data.zip : '',
          } : {};

          const contactData = (data.email !== '' || data.phoneHome !== '' || data.phoneMobile !== '') ? {
            email: data.email ? data.email : '',
            phoneHome: data.phoneHome ? data.phoneHome : '',
            phoneMobile: data.phoneMobile ? data.phoneMobile : ''
          } : {};

          const clubData = (data.clubStatus !== '' || data.clubJoined !== '' || data.clubPayment !== '' || data.positionsInClub !== '') ? {
            assignedClub: club,
            status: data.clubStatus ? data.clubStatus : 0,
            joined: data.clubJoined ? data.clubJoined : '',
            left: data.clubLeft ? data.clubLeft : '',
            payment: data.clubPayment ? data.clubPayment : '',
            positionsInClub: data.positionsInClub ? data.positionsInClub : ''
          } : {};

          const ahData = (data.ahStatus !== '' || data.ahJoined !== '' || data.ahLeft !== '' || data.ahPayment !== '') ? {
            status: data.ahStatus ? data.ahStatus : 0,
            joined: data.ahJoined ? data.ahJoined : '',
            left: data.ahLeft ? data.ahLeft : '',
            payment: data.ahPayment ? data.ahPayment : '',
          } : {};

          const memberData: any = {
            driveImport: true,
            mainData: mainData,
            address: addressData,
            contact: contactData,
            clubData: clubData,
            ahData: ahData,
            creation: {
              from: 'system',
              at: admin.database.ServerValue.TIMESTAMP,
            },
            comment: data.comment ? data.comment : ''
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

export const driveMemberDeleteCron = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/drive-members/{userId}').onDelete((snap, context) => {
  fireBaseUserId = context.params.userId;
  return db.collection(memberPath).doc(fireBaseUserId).delete().catch((error: any) => console.error(error));
});

export const driveMemberUpdateCron = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/drive-members/{userId}').onUpdate((change, context) => {
  data = change.after.val();
  if (!data) return true;
  console.log(data);
  console.log(context.params);
  console.log('updated dfb-member');
  return true;
});
