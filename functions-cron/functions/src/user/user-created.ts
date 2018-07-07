import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

const firestore = admin.firestore();

export const userCreated = functions.auth.user().onCreate((event: any) => {

  const firebaseUser = event.data;

  const user = {
    id: firebaseUser.uid,
    providerId: firebaseUser.providerId,
    emailVerified: false,
    creation: {
      at: moment().toISOString(),
      from: firebaseUser.uid
    },
    assignedRoles: {
      subscriber: true,
      editor: false,
      admin: false
    }
  };

  firestore.collection(`users`).doc(`${firebaseUser.uid}`).set(user)
    .then(() => {
      // send email
      const msg = {
        to: 'Thomas.handle@gmail.com',
        from: 'admin@sfwinterbach.com',
        subject: 'Neuer Benutzer',
        templateId: '758f452a-aa4d-4664-8088-5a5ce2a814ac',
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          email: firebaseUser.email,
          name: 'Thomas',
          siteName: 'sfwinterbach.com'
        }
      };
      return sgMail.send(msg);
    })
    .then(() => {
      return firebaseUser.sendEmailVerification();
    })
    .then(() => {
      console.log('User Creation successfull');
      return true;
    })
    .catch((error: any) => {
      console.log(error);
    });

});
