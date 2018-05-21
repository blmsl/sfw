import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const memberPath = 'members';

export const driveDeleteDbCron = functions.database.ref('/drive-members').onDelete((change, context) => {
  console.log('delete database driveMembers');
  return true;
});

export const driveMemberWriteCron = functions.database.ref('/drive-members/{userId}').onWrite((change, context) => {

  const data = change.after.val();

  if (!data) return true;

  console.log(data);
  console.log('added');

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
          at: new Date()
        },
        comment: data.comment ? data.comment : ''
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

export const driveMemberDeleteCron = functions.database.ref('/drive-members/{userId}').onDelete((snap, context) => {
  const data = snap.val();
  return db.collection(memberPath).doc(data.firstName + '-' + data.lastName + '-' + data.birthday)
    .delete()
    .catch((error: any) => console.error(error));
});

export const driveMemberUpdateCron = functions.database.ref('/drive-members/{userId}').onUpdate((change, context) => {

  const data = change.after.val();

  if (!data) return true;

  console.log(data);
  console.log('updated dfb-member');

  return true;
});
