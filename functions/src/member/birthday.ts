import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';
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


const birthdayWishes: {
  message: string,
  author: string
}[] = [
    {
      message: 'Ein kluger Mann macht nicht alle Fehler selbst.\n' +
        'Er gibt auch anderen eine Chance.',
      author: 'Winston Churchill'
    },
    {
      message: 'Lebe heute – vergiss die Sorgen der Vergangenheit.',
      author: 'Epikur'
    },
    {
      message: 'Dem Jubilar ein dreifach Hoch zu seinem Wiegenfeste,\n' +
        'wir wünschen Dir, das ist doch klar,\n' +
        'vom Guten nur das Allerbeste!',
      author: 'Volkstümlich'
    },
    {
      message: 'Gott schenkt Dir das Gesicht.\n' +
        'Lächeln musst Du selber.',
      author: 'Spruch aus Irland'
    },
    {
      message: 'Der Mensch lebt nicht vom Brot allein.\n' +
        'Manchmal braucht er einen Drink.',
      author: 'Woody Allen'
    },
    {
      message: 'Man sieht nur mit dem Herzen gut.\n' +
        'Das Wesentliche ist für die Augen unsichtbar.',
      author: 'Antoine de Saint-Exupéry'
    },
    {
      message: 'Das Lächeln, das Du aussendest, kehrt zu Dir zurück.',
      author: 'Sinnspruch aus Indien'
    },
    {
      message: 'Weise ist der Mensch, der nicht den Dingen nachtrauert, die er nicht besitzt, sondern sich der Dinge erfreut, die er hat.',
      author: 'Epiktet'
    },
    {
      message: 'Alter ist eine herrliche Sache, wenn man nicht verlernt hat, was anfangen heißt.',
      author: 'Martin Buber'
    },
    {
      message: 'Man altert nur von fünfundzwanzig bis dreißig.\n' +
        'Was sich bis dahin erhält, wird sich wohl auf immer erhalten.',
      author: 'Friedrich Hebbel'
    },
    {
      message: 'Kannst Du nicht, was Du willst, so wolle, was Du kannst.',
      author: 'Sinnspruch aus Spanien'
    },
    {
      message: 'Nach dem Weg, der vor Dir liegt, frag die, die Dir entgegenkommen.',
      author: 'Sinnspruch aus China'
    },
    {
      message: 'Nur wer für den Augenblick lebt, lebt für die Zukunft.',
      author: 'Heinrich von Kleist'
    },
    {
      message: 'Man kann viel, wenn man sich nur recht viel zutraut.',
      author: 'Wilhelm von Humboldt'
    },
    {
      message: 'Es ist besser, Genossenes zu bereuen,\n' +
        'als zu bereuen, dass man nichts genossen hat.',
      author: 'Giovanni Boccaccio'
    },
    {
      message: 'Liebe, Glück und Sonnenschein\n' +
        'soll\'n im neuen Lebensjahr\n' +
        'stets an Deiner Seite sein.',
      author: 'Unbekannter Verfasser'
    },
    {
      message: 'Möge Gott Dir viele Lebensjahre gewähren, er weiß ganz bestimmt,\n' +
        'dass die Erde zu wenig Engel hat und der Himmel übervoll von ihnen ist.',
      author: 'Irischer Geburtstags- und Segensspruch'
    }
  ];

export const birthdayReminderCron = functions
  .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .pubsub.topic('daily-tick').onPublish(async () => {

    try {
      const applicationsSnapshot = await admin.firestore().collection('applications')
        .where('isCurrentApplication', '==', true)
        .get();
      const currentApp = applicationsSnapshot.docs[0].data();

      const membersSnapshot = await admin.firestore().collection('members')
        .where('mainData.birthday.monthDay', '==', monthDay)
        .get();

      let birthdayList = '<ul>';

      membersSnapshot.docs.forEach(function(doc) {
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

      if (birthdayMailing && birthdayMailing.length > 0) {

        if (membersSnapshot.size > 0 && (!recipients || recipients.length === 0)) {
          console.warn('Es wurden keine Email Adressen der Geburtstagskinder hinterlegt.');
          return true;
        }

        await sgMail.send({
          to: birthdayMailing[0].emails,
          from: 'Geburtstage@sfwinterbach.com',
          subject: 'Geburtstage vom ' + moment().format('LL'),
          templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: '',
            birthdayList: birthdayList,
            dateString: moment().format('LL')
          }
        });

        const bccList: string[] = [];
        for (const recipient of recipients) {

          if (birthdayMailing[0].emails.indexOf(recipient.email) === -1) {
            bccList.push(recipient.email);
          }

          const birthdaySample = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
          const mail = {
            to: recipient.email,
            bcc: bccList,
            from: 'Geburtstage@sfwinterbach.com',
            subject: 'Alles Gute zum Geburtstag!',
            templateId: '780bf24e-b085-4ece-9262-f727c47a3edc',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
              firstName: recipient.firstName,
              lastName: recipient.lastName,
              age: recipient.age,
              message: birthdaySample.message,
              author: birthdaySample.author
            }
          };
          await sgMail.send(mail);
        }
        return true;

      }
      else {
        console.warn('Kein Mail-Verteiler mit dem Namen "Geburtstagsgrüße als Kopie" gefunden.');
        return true;
      }
    }
    catch (e) {
      console.error(e);
      console.log(e.response.body);
      return e;
    }

  });
