import * as functions from 'firebase-functions';

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

export const userCreated = functions.region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .auth.user()
  .onCreate((event: any) => {

    const firebaseUser = event.data;

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

    return sgMail.send(msg)
      .then(() => {
        return firebaseUser.sendEmailVerification();
      });

  });
