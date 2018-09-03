import * as admin     from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment    from 'moment';

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
    },
  ];

export const birthdayReminderCron = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .pubsub.topic('daily-tick').onPublish(() => {

  return admin.firestore()
    .collection('members')
    .get()
    .then((value) => {

      let birthdayList = '<ul>';

      value.forEach(function(doc) {
        const memberData = doc.data();
        if (moment(memberData.mainData.birthday).format("MM-DD") === today) {
          if (memberData.contact && memberData.contact.email) {
            const data = {
              email: memberData.contact.email,
              firstName: memberData.mainData.firstName,
              lastName: memberData.mainData.lastName,
              age: calculateAge(memberData.mainData.birthday)
            };
            recipients.push(data);
          }
          birthdayList += '<li>' + memberData.mainData.firstName + ' ' + memberData.mainData.lastName + ' wird heute ' + calculateAge(memberData.mainData.birthday) + ' Jahre</li>';
        }
      });

      // if no there are no birthdays today
      if (birthdayList === '<ul>') {
        birthdayList = '<li>Heute hat niemand Geburtstag.</li>';
      }

      birthdayList += '</ul>';
      return birthdayList;
    }).then((list) => {
      return sgMail.send({
        to: [
          'thomas.handle@gmail.com',
          'mail@r-klein.com',
          'nathalie.feller@gmx.de',
          'ronnyhassel@gmail.com'
        ],
        from: 'Geburtstage@sfwinterbach.com',
        subject: 'Geburtstage vom ' + moment().format("LL"),
        templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          adminName: '',
          birthdayList: list,
          dateString: moment().format("LL")
        }
      });
    }).then(() => {
      recipients.forEach((recipient: {
        email: string,
        firstName: string,
        lastName: string,
        age: number
      }) => {
        const birthdaySample = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];

        return sgMail.send({
          to: [recipient.email],
          bcc: [
            'thomas.handle@gmail.com',
            'mail@r-klein.com',
            'ronnyhassel@gmail.com'
          ],
          from: 'Geburtstage@sfwinterbach.com',
          subject: 'Geburtstagswünsche',
          templateId: '780bf24e-b085-4ece-9262-f727c47a3edc',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            firstName: recipient.firstName,
            lastName: recipient.lastName,
            age: recipient.age,
            message: birthdaySample.message,
            author: birthdaySample.author
          }
        });
      });
    });
});
