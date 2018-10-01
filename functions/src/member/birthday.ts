import * as admin         from 'firebase-admin';
import * as functions     from 'firebase-functions';
import * as moment        from 'moment';
import { birthdayWishes } from './birthday-wishes';

moment.locale('de');

// Sengrid
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

function calculateAge(year: string, month: string, day: string) {
  const dateOfBirth = new Date(year + '-' + month + '-' + day);
  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const monthDay = moment().format('MM-DD');

const recipients: {
  email: string,
  firstName: string,
  lastName: string,
  age: number
}[] = [];

export const birthdayReminderCron = functions
// .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .https.onRequest(async () => {
    // .pubsub.topic('daily-tick').onPublish(async () => {

    const applicationsSnapshot = await admin.firestore().collection('applications')
      .where('isCurrentApplication', '==', true)
      .get();
    const currentApp = applicationsSnapshot.docs[ 0 ].data();

    const membersSnapshot = await admin.firestore().collection('members')
      .where('mainData.birthday.monthDay', '==', monthDay)
      .get();

    let birthdayList = '<ul>';

    membersSnapshot.docs.forEach(function (doc) {
      const memberData = doc.data();

      const age = calculateAge(memberData.mainData.birthday.year, memberData.mainData.birthday.month, memberData.mainData.birthday.day);

      if (memberData.contact && memberData.contact.email) {
        const data = {
          email: memberData.contact.email,
          firstName: memberData.mainData.firstName,
          lastName: memberData.mainData.lastName,
          age: age
        };
        recipients.push(data);
      }
      birthdayList += '<li>' + memberData.mainData.firstName + ' ' + memberData.mainData.lastName + ' wird heute ' + age + ' Jahre</li>';
    });

    // if no there are no birthdays today
    if (birthdayList === '<ul>') {
      birthdayList = '<li>Heute hat niemand Geburtstag.</li>';
    }

    birthdayList += '</ul>';

    const birthdayMailing = currentApp.mailing.filter(mailing => {
      return mailing.isActive && mailing.title === 'Geburtstagsgrüße als Kopie';
    });

    if (birthdayMailing) {
      await sgMail.send({
        to: birthdayMailing[ 0 ].emails,
        from: 'Geburtstage@sfwinterbach.com',
        subject: 'Geburtstage vom ' + moment().format('LL'),
        templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
        substitutionWrappers: [ '{{', '}}' ],
        substitutions: {
          adminName: '',
          birthdayList: birthdayList,
          dateString: moment().format('LL')
        }
      });
    }

    const promises: any[] = [];

    recipients.forEach(async (recipient: {
      email: string,
      firstName: string,
      lastName: string,
      age: number
    }) => {
      const birthdaySample = birthdayWishes[ Math.floor(Math.random() * birthdayWishes.length) ];
      const p = sgMail.send({
        to: [ recipient.email ],
        bcc: birthdayMailing ? birthdayMailing[ 0 ].emails : [],
        from: 'Geburtstage@sfwinterbach.com',
        subject: 'Geburtstagswünsche',
        templateId: '780bf24e-b085-4ece-9262-f727c47a3edc',
        substitutionWrappers: [ '{{', '}}' ],
        substitutions: {
          firstName: recipient.firstName,
          lastName: recipient.lastName,
          age: recipient.age,
          message: birthdaySample.message,
          author: birthdaySample.author
        }
      });
      promises.push(p);
    });
    return Promise.all(promises);

  });
