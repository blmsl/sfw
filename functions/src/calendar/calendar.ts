import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';
// import * as cors from 'cors';

// const corsHandler = cors({ origin: true });
const { google } = require('googleapis');

const GOOGLE_API_KEY = functions.config().google.calendar.key;
const calendar = google.calendar({ version: 'v3', auth: GOOGLE_API_KEY });

const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export const getGoogleCalendarEvents = functions
  .region('europe-west1')
  .runWith({ memory: '1GB', timeoutSeconds: 10 })
  .https.onRequest(async (req, res) => {

    res.set('Access-Control-Allow-Origin', 'https://admin.suelzparty.com');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'Authorization, content-type');
      res.header('Access-Control-Max-Age', '7200');
    }

    const currentDate = moment();
    const timeMin = currentDate.subtract(1, 'month').toISOString();
    const timeMax = currentDate.add(2, 'month').toISOString();

    try {
      const eventList: any[] = [];

      const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/calendar'] });
      const appSnapshot = await db.collection('applications').where('isCurrentApplication', '==', true).get();

      if (appSnapshot.size === 0) {

        return res.send({ data: eventList });

      } else {

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
                  title: event.summary,
                  url: '//www.googleapis.com/calendar/v3/calendars/' + cal.link + '/events/' + event.id,
                  start: event.start.dateTime || event.start.date,
                  end: event.end.dateTime || event.end.date,
                  color: cal.cssTitle
                });
              }
            }
          }
        }

        return res.send({
          data: eventList
        });
      }
    }
    catch (e) {
      console.log(e);
      return res.send(e.message);
    }

  });
