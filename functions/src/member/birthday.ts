import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;

sgMail.setApiKey(SENDGRID_API_KEY);

function calculateAge(birthday: string) {
  const dateOfBirth = new Date(birthday);
  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const today = moment().format("MM-DD");
const recipients: {
  email: string,
  name: string,
  age: number
}[] = [];

export const birthdayReminderCron = functions.pubsub.topic('daily-tick').onPublish((message, context) => {

  let birthdayList = '<ul>';

  return admin.firestore()
    .collection('members')
    .get()
    .then((value) => {
      value.forEach(function(doc) {
        const memberData = doc.data();
        if (moment(memberData.mainData.birthday).format("MM-DD") === today) {
          if (memberData.contact && memberData.contact.email) {
            const data = {
              email: memberData.contact.email,
              name: memberData.mainData.firstName + ' ' + memberData.mainData.lastName,
              age: calculateAge(memberData.mainData.birthday)
            };
            recipients.push(data);
          }
          birthdayList += '<li>' + memberData.mainData.firstName + ' ' + memberData.mainData.lastName + ' wird heute ' + calculateAge(memberData.mainData.birthday) + ' Jahre</li>';
        }
      });
      birthdayList += '</ul>';
      return birthdayList;
    }).then((list) => {

      // if no there are no birthdays today
      if (list === '<ul></ul>') {
        birthdayList += '<li>Heute hat niemand Geburtstag.</li>';
      }

      const welcomeMsg = {
        to: ['thomas.handle@gmail.com', 'mail@r-klein.com', 'ronnyhassel@gmail.com'],
        from: 'Geburtstage@sfwinterbach.com',
        subject: 'Geburtstage vom ' + moment().format("LL"),
        templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          adminName: '',
          birthdayList: birthdayList,
          dateString: moment().format("LL")
        }
      };

      return sgMail.send(welcomeMsg);
    }).then(() => {

      console.log('ToDo: send email to ' + recipients);

      /* recipients.forEach((recipient: {
        email: string,
        name: string,
        age: number
      }) => {
        console.log('ToDo: send email to ' + recipient.email + ' - ' + recipient.name + ' ' + recipient.age);
      }); */

    });

});
