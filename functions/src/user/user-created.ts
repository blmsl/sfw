import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

const firestore = admin.firestore();

export const userCreated = functions.firestore.document('/users/{userId}').onCreate((snap, context) => {

  const userId = snap.id;

  return firestore.collection('users').doc(userId)
    .get()
    .then((doc: any) => {

      const user = doc.data();
      const msg = {
        to: 'Thomas.handle@gmail.com',
        from: 'admin@sfwinterbach.com',
        subject: 'Neuer Benutzer',
        templateId: '758f452a-aa4d-4664-8088-5a5ce2a814ac',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          email: user.email,
          name: 'Thomas',
          siteName: 'sfwinterbach.com'
        }
      };
      return sgMail.send(msg);
    })
    .catch((error: any) => console.log(error));
});
