import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

// const collectionString = 'member-of-the-week';

let data: any = {};

const now = moment();
const docId: string = now.week() + '-' + now.format('YY');

export const memberOfTheWeekCron = functions.pubsub.topic('weekly-tick').onPublish(() => {
    return admin.firestore()
      .collection('members')
      .get()
      .then((values) => {
        const memberList: any = [];

        values.forEach(function (doc) {
          const memberData = doc.data();
          memberList.push(memberData);
        });
        return memberList;
      }).then((memberList) => {
        console.log(memberList);

        if (memberList.length > 0) {

          const clubList = memberList.filter((member: any) => {
            return member.clubData && member.clubData.status && member.clubData.status > 0 && member.clubData.status !== 2;
          });
          console.log('Club ' + clubList.length);
          console.log(clubList[Math.floor(Math.random() * clubList.length)]);

          const ahList = memberList.filter((member: any) => {
            return member.ahData && member.ahData.status && member.ahData.status > 0;
          });
          console.log('AH ' + ahList.length);

          const playerList = memberList.filter((member: any) => {
            return member.dfbData && member.dfbData.playerStatus;
          });
          console.log('Player ' + playerList.length);

          const honoraryList = memberList.filter((member: any) => {
            return member.clubData && member.clubData.status && member.clubData.status === 2;
          });
          console.log('honorary ' + honoraryList.length);

          data[docId] = [
            {
              id: docId,
              type: 'club',
              year: now.format('YY'),
              week: now.week(),
              assignedMemberId: clubList.length ? clubList[Math.floor(Math.random() * clubList.length)].id : '',
            },
            {
              id: docId,
              type: 'ah',
              year: now.format('YY'),
              week: now.week(),
              assignedMemberId: ahList.length ? ahList[Math.floor(Math.random() * ahList.length)].id : '',
            },
            {
              id: docId,
              type: 'player',
              year: now.format('YY'),
              week: now.week(),
              assignedMemberId: playerList.length ? playerList[Math.floor(Math.random() * playerList.length)].id : ''
            },
            {
              id: docId,
              type: 'honorary',
              year: now.format('YY'),
              week: now.week(),
              assignedMemberId: honoraryList.length ? honoraryList[Math.floor(Math.random() * honoraryList.length)].id : ''
            }
          ];
          return data;
        }
      }).then(() => {
        console.log('data:');
        console.log(data);
        return data;
        /*return admin.firestore().collection(collectionString)
          .doc(docId)
          .create(data)
          */
      }).then(() => {
        const msg = {
          to: ['thomas.handle@gmail.com'],
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mitglieder des Monats für die Woche ' + now.week() + '/' + now.format('YY'),
          templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: 'Thomas',
            /* clubMember: 'Verein: ' + data[].mainData.firstName + ' ' + clubSample.mainData.lastName,
            ahMember: 'AH: ' + ahSample.mainData.firstName + ' ' + ahSample.mainData.lastName,
            player: 'Spieler: ' + playerSample.mainData.firstName + ' ' + playerSample.mainData.lastName,
            honorary: 'Ehrenmitglied: ' + honorarySample.mainData.firstName + ' ' + honorarySample.mainData.lastName, */
            weekString: now.week(),
            dateString: now.format('LL') + ' bis ' + now.add(6, 'days').format('LL')
          }
        };
        return sgMail.send(msg);
      });
  }
);
