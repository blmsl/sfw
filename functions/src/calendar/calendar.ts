import * as functions from 'firebase-functions';
import * as admin     from 'firebase-admin';

const db = admin.firestore();

export const getGoogleCalendarEvents = functions.https.onRequest((req, resp) => {
  return resp.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      12345678910
    </body>
  </html>`);

  /*return db.collection('applications')
    .where('isCurrentApplication', '==', true)
    .get()
    .then((applicationSnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (!applicationSnapshot.empty) {
        console.log(applicationSnapshot.docs[0]);
        // return applicationSnapshot.docs[0];
        return true;
      }
      return false;
    });
  /*.then((calendars: { title: string, link: string }[]) => {
      calendars.forEach((calendar: { title: string, link: string }) => {
        console.log(calendar.title);

        const cal = google.calendar({ version: 'v3'});
        cal.events.list({
          calendarId: calendar.link
        }, (err, res) => {
          if(err){
            return resp.status(400).send(err);
          }

          if(res) {
            const events = res.data.items;
            return resp.status(200).send(events);
          }
          return resp.status(404).send();
        });


      });
    });

  // const calendar = google.google.calendar({ version: 'v3' });
  // console.log(calendar);*/
});


/* If modifying these scopes, delete token.json.
 const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
 const TOKEN_PATH = 'token.json';

 function listEvents(auth) {
 const calendar = google.calendar({version: 'v3', auth});
 calendar.events.list({
 calendarId: 'primary',
 timeMin: (new Date()).toISOString(),
 maxResults: 10,
 singleEvents: true,
 orderBy: 'startTime',
 }, (err, res) => {
 if (err) return console.log('The API returned an error: ' + err);
 const events = res.data.items;
 if (events.length) {
 console.log('Upcoming 10 events:');
 events.map((event, i) => {
 const start = event.start.dateTime || event.start.date;
 console.log(`${start} - ${event.summary}`);
 });
 } else {
 console.log('No upcoming events found.');
 }
 });
 } */
