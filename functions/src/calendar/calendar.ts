import * as functions from 'firebase-functions';
import * as admin     from 'firebase-admin';
import * as moment    from 'moment';
import * as cors      from 'cors';

const corsHandler = cors({ origin: true });
const { google } = require('googleapis');

const GOOGLE_API_KEY = functions.config().google.calendar.key;
const calendar = google.calendar({ version: 'v3', auth: GOOGLE_API_KEY });

const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export const getGoogleCalendarEvents = functions
//.region('europe-west1')
  .runWith({ memory: '1GB', timeoutSeconds: 10 })
  .https.onRequest(async (req, resp) => {

    const currentDate = moment();
    const timeMin = currentDate.subtract(1, 'month').toISOString();
    const timeMax = currentDate.add(2, 'month').toISOString();

    //console.log(data);
    //console.log(context);
    // console.log(timeMin);
    // console.log(timeMax);

    try {
      const eventList: any[] = [];

      const auth = await google.auth.getClient({ scopes: [ 'https://www.googleapis.com/auth/calendar' ] });
      const appSnapshot = await db.collection('applications').where('isCurrentApplication', '==', true).get();

      for (const cal of appSnapshot.docs[ 0 ].data().assignedCalendars) {
        if (cal.isActive) {
          // console.log(cal.link);
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
                // description: event.description,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
                color: cal.cssTitle
              });
            }
          }
        }
      }

      resp.set('Access-Control-Allow-Origin', '*');
      resp.set('Access-Control-Allow-Methods', 'GET');
      resp.set('Access-Control-Allow-Headers', 'application/json');

      return corsHandler(req, resp, () => {
        resp.send({
          data: eventList
        });
      });

    }
    catch (e) {
      console.error(e);
      return resp.send(e.message);
    }

  });
