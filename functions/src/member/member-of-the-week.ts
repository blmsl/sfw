import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

const db = admin.firestore();

const now = moment();
const docId: string = now.week() + '-' + now.format('YY');

const collectionName = 'members';

export const memberOfTheWeekCron = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 7 })
  .pubsub.topic('members-of-the-week')
  .onPublish(async () => {

    try {

      const applicationsSnapshot = await admin.firestore().collection('applications')
        .where('isCurrentApplication', '==', true)
        .get();
      const currentApp = applicationsSnapshot.docs[0].data();

      const membersOfTheWeekMailing = currentApp.mailing.filter(mailing => {
        return mailing.isActive && mailing.title === 'Mitglieder der Woche';
      });

      if (membersOfTheWeekMailing && membersOfTheWeekMailing.length > 0) {

        const memberSnapshot = await db.collection(collectionName).get();

        const clubList = memberSnapshot.docs.filter((doc) => {
          const member = doc.data();
          return member.clubData && member.clubData.status && member.clubData.status > 0 && member.clubData.status !== 2;
        });

        const ahList = memberSnapshot.docs.filter((doc) => {
          const member = doc.data();
          return member.ahData && member.ahData.status && member.ahData.status > 0;
        });

        const playerList = memberSnapshot.docs.filter((doc) => {
          const member = doc.data();
          return member.dfbData && member.dfbData.playerStatus;
        });

        const honoraryList = memberSnapshot.docs.filter((doc) => {
          const member = doc.data();
          return member.clubData && member.clubData.status && member.clubData.status === 2;
        });

        if (!clubList && ahList && playerList && honoraryList) {
          console.log({ clubList, ahList, playerList, honoraryList });
          return true;
        }

        const clubMember = clubList[Math.floor(Math.random() * clubList.length)].data();
        const ahMember = ahList[Math.floor(Math.random() * ahList.length)].data();
        const playerMember = playerList[Math.floor(Math.random() * playerList.length)].data();
        const honoraryMember = honoraryList[Math.floor(Math.random() * honoraryList.length)].data();

        const data = {
          ah: {
            id: docId,
            type: 'ah',
            year: now.format('YY'),
            week: now.week(),
            assignedMemberId: ahMember.id
          },
          club: {
            id: docId,
            type: 'club',
            year: now.format('YY'),
            week: now.week(),
            assignedMemberId: clubMember.id
          },
          player: {
            id: docId,
            type: 'player',
            year: now.format('YY'),
            week: now.week(),
            assignedMemberId: playerMember.id
          },
          honorary: {
            id: docId,
            type: 'honorary',
            year: now.format('YY'),
            week: now.week(),
            assignedMemberId: honoraryMember.id
          }
        };

        await db.collection('member-of-the-week').doc(docId).create(data);

        const msg = {
          to: membersOfTheWeekMailing[0].emails,
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mitglieder der Woche ' + now.week() + '/' + now.format('YY'),
          templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: '',
            clubMember: 'Verein: ' + clubMember['mainData'] ? clubMember['mainData']['firstName'] + ' ' + clubMember['mainData']['lastName'] : ' ???',
            ahMember: 'Alte Herren: ' + ahMember['mainData'] ? ahMember['mainData']['firstName'] + ' ' + ahMember['mainData']['lastName'] : ' ???',
            player: 'Spieler: ' + playerMember['mainData'] ? playerMember['mainData']['firstName'] + ' ' + playerMember['mainData']['lastName'] : ' ???',
            honorary: 'Ehrenmitglied: ' + honoraryMember['mainData'] ? honoraryMember['mainData']['firstName'] + ' ' + honoraryMember['mainData']['lastName'] : ' ???',
            weekString: now.week(),
            dateString: now.format('LL') + ' bis ' + now.add(6, 'days').format('LL')
          }
        };
        return sgMail.send(msg);

      } else {
        console.warn('Kein Mail-Verteiler mit dem Namen "Mitglieder der Woche" gefunden');
        return true;
      }
    }
    catch (e) {
      console.error(e);
      return e;
    }

  });
