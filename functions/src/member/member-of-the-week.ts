import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

const collectionString = 'member-of-the-week';

export const memberOfTheWeekCron = functions.pubsub.topic('weekly-tick').onPublish((message, context) => {

  return admin.firestore()
    .collection('members')
    .get()
    .then((values) => {
      let memberList: any = [];

      values.forEach(function(doc) {
        const memberData = doc.data();
        // if ('profileImageUrl' in memberData && memberData.profileImageUrl !== '') {
        memberList.push(memberData);
        // }
      });

      return memberList;

    }).then((memberList) => {

      let msg: any = '';

      const now = moment();

      // if (memberList.length > 0) {

      let clubList = memberList.filter((member: any) => {
        return member.clubData && member.clubData.status && member.clubData.status > 0 && member.clubData.status !== 2;
      });
      const clubSample = clubList[Math.floor(Math.random() * clubList.length)];

      let ahList = memberList.filter((member: any) => {
        return member.ahData && member.ahData.status && member.ahData.status > 0;
      });
      const ahSample = ahList[Math.floor(Math.random() * ahList.length)];

      let playerList = memberList.filter((member: any) => {
        return member.dfbData;
      });
      const playerSample = playerList[Math.floor(Math.random() * playerList.length)];

      let honoraryList = memberList.filter((member: any) => {
        return member.clubData && member.clubData.status && member.clubData.status === 2;
      });
      const honorarySample = honoraryList[Math.floor(Math.random() * honoraryList.length)];

      const docId: string = now.week() + '-' + now.format('YY');

      let data: any = {};
      data[docId] = [
        {
          type: 'club',
          week: docId,
          assignedMemberId: clubSample.id,
        },
        {
          type: 'ah',
          week: docId,
          assignedMemberId: ahSample.id,
        },
        {
          type: 'player',
          week: docId,
          assignedMemberId: playerSample.id
        },
        {
          type: 'honorary',
          week: docId,
          assignedMemberId: honorarySample.id
        }
      ];


      admin.firestore().collection(collectionString)
        .doc(docId)
        .create(data)
        .then(
          () => {
            /*msg = {
              to: ['thomas.handle@gmail.com'],
              from: 'mitglieder@sfwinterbach.com',
              subject: 'Mitglieder des Monats für die Woche ' + now.week() + '/' + now.format('YY'),
              templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
              substitutionWrappers: ['{{', '}}'],
              substitutions: {
                adminName: 'Thomas',
                clubMember: 'Verein: ' + clubSample.mainData.firstName + ' ' + clubSample.mainData.lastName,
                ahMember: 'AH: ' + ahSample.mainData.firstName + ' ' + ahSample.mainData.lastName,
                player: 'Spieler: ' + playerSample.mainData.firstName + ' ' + playerSample.mainData.lastName,
                honorary: 'Ehrenmitglied: ' + honorarySample.mainData.firstName + ' ' + honorarySample.mainData.lastName,
                weekString: now.week(),
                dateString: now.format('LL') + ' bis ' + now.add(6, 'days').format('LL')
              }
            };
            return sgMail.send(msg);*/
          });
    });
}
);
