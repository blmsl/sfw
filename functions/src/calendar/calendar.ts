import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';

const { google } = require('googleapis');

const GOOGLE_API_KEY = functions.config().google.calendar.key;
const calendar = google.calendar({ version: 'v3', auth: GOOGLE_API_KEY });

const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const currentDate = moment();
const timeMin = currentDate.subtract(1, 'month').toISOString();
const timeMax = currentDate.add(2, 'month').toISOString();


export const getGoogleCalendarEvents = functions
  // disables because firebase-functions don´t use it correctly
  // see https://github.com/angular/angularfire2/issues/1874
  // .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .https.onRequest(async (request, response) => {

    try {
      const eventList: any[] = [];

      const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/calendar'] });
      const appSnapshot = await db.collection('applications').where('isCurrentApplication', '==', true).get();

      for (const cal of appSnapshot.docs[0].data().assignedCalendars) {
        if (cal.isActive) {
          const result = await calendar.events.list({
            auth: auth,
            calendarId: cal.link,
            timeMin: timeMin,
            timeMax: timeMax,
            // maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime'
          });
          const events = result.data.items;

          if (events) {
            for (const event of events) {
              eventList.push({
                summary: event.summary,
                description: event.description,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date
              });
            }
          }
        }
      }

      response.status(200).send(eventList);

    }
    catch (e) {
      console.error(e);
      response.status(e.code).send(e.message);
    }

  });
