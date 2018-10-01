import * as admin     from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment    from 'moment';

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
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .pubsub.topic('weekly-tick').onPublish(async () => {

    const ref = db.collection(collectionName).doc();
    console.log(ref.id);

    const memberSnapshot = await db.collection(collectionName).where('id', '>=', ref.id).limit(1).get();

    console.log(memberSnapshot.size);

    if(memberSnapshot.size > 0) {
      console.log(memberSnapshot);

      memberSnapshot.docs.forEach((member) => {
        console.log(member.data().id);
      });

      /*
      const clubList = memberSnapshot.docs.filter((member: any) => {
        return member.clubData && member.clubData.status && member.clubData.status > 0 && member.clubData.status !== 2;
      });
      const clubMember = clubList.length ? clubList[Math.floor(Math.random() * clubList.length)] : null;

      const ahList = memberSnapshot.docs.filter((member: any) => {
        return member.ahData && member.ahData.status && member.ahData.status > 0;
      });
      const ahMember = ahList.length ? ahList[Math.floor(Math.random() * ahList.length)] : null;

      const playerList = memberSnapshot.docs.filter((member: any) => {
        return member.dfbData && member.dfbData.playerStatus;
      });
      const playerMember = playerList.length ? playerList[Math.floor(Math.random() * playerList.length)] : null;

      const honoraryList = memberSnapshot.docs.filter((member: any) => {
        return member.clubData && member.clubData.status && member.clubData.status === 2;
      });
      const honoraryMember = honoraryList.length ? honoraryList[Math.floor(Math.random() * honoraryList.length)] : null;

      const data = {
        ah: {
          id: docId,
          type: 'ah',
          year: now.format('YY'),
          week: now.week(),
          assignedMemberId: ahMember ? ahMember.id : null
        },
        club: {
          id: docId,
          type: 'club',
          year: now.format('YY'),
          week: now.week(),
          assignedMemberId: clubMember ? clubMember.id : null
        },
        player: {
          id: docId,
          type: 'player',
          year: now.format('YY'),
          week: now.week(),
          assignedMemberId: playerMember ? playerMember.id : null
        },
        honorary: {
          id: docId,
          type: 'honorary',
          year: now.format('YY'),
          week: now.week(),
          assignedMemberId: honoraryMember ? honoraryMember.id : null
        }
      };


      if(clubMember && ahMember && playerMember && honoraryMember) {

        await db.collection('member-of-the-week').doc(docId).create(data);

        const msg = {
          to: ['thomas.handle@gmail.com'],
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mitglieder des Monats für die Woche ' + now.week() + '/' + now.format('YY'),
          templateId: 'fc184c8b-b721-450f-add7-69ef4d20fe10',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: 'Thomas',
            clubMember: 'Verein: ' + clubMember['mainData'] ? clubMember['mainData']['firstName'] + ' ' + clubMember['mainData']['lastName'] : ' ???',
            ahMember: 'Alte Herren: ' + ahMember['mainData'] ? ahMember['mainData']['firstName'] + ' ' + ahMember['mainData']['lastName'] : ' ???',
            player: 'Spieler: ' + playerMember['mainData'] ? playerMember['mainData']['firstName'] + ' ' + playerMember['mainData']['lastName'] : ' ???',
            honorary: 'Ehrenmitglied: ' + honoraryMember['mainData'] ? honoraryMember['mainData']['firstName'] + ' ' + honoraryMember['mainData']['lastName'] : ' ???',
            weekString: now.week(),
            dateString: now.format('LL') + ' bis ' + now.add(6, 'days').format('LL')
          }
        };
        return sgMail.send(msg);
      } */

      /* console.log(clubMember);
      console.log(ahMember);
      console.log(playerMember);
      console.log(honoraryMember); */
      return true;
    }
    return true;

  });
