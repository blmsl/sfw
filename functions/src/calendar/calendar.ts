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
  // .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 10 })
  .https.onRequest(async (request, response) => {

    try {


      const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/calendar'] });

      const appSnapshot = await db.collection('applications').where('isCurrentApplication', '==', true).get();

      const calendarList = appSnapshot.docs[0].data().assignedCalendars.filter(cal => {
        if(cal.isActive) return cal;
      });
      console.log(calendarList);

      /*
      const promises: any[] = [];

      for(const cal of appSnapshot.docs[0].data().assignedCalendars){
        if(cal.isActive) {
          await getCalendarData(cal, auth);
        }
      }

      /*appSnapshot.docs[0].data().assignedCalendars.forEach(cal => {
        if(cal.isActive) {
          console.log(cal.link);
          const p = calendar.events.list({
            auth: auth,
            calendarId: cal.link,
            timeMin: new Date().toISOString(), //timeMin,
            timeMax: timeMax,
            // maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime'
          });
          promises.push(p);
        }
      });

      const results = await Promise.all(promises);
      console.log(results);
      /* const eventList: any[] = [];
      results.forEach(event => {
        const data = snap.data()
        data.city = snap.id
        results.push(data)
      }) */

      response.status(200).send([1,2,3,45]);

      /*
            const eventList: any[] = [];


      for(const cal of calendarList){
        if(cal.isActive) {
          console.log('loading Data for cal ' + cal.title + ' ' + cal.link);
          const calendarData = await calendar.events.list({
            auth: auth,
            calendarId: cal.link,
            timeMin: new Date().toISOString(), //timeMin,
            timeMax: timeMax,
            // maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime'
          });

          const events = calendarData.data.items;
          console.log(events);

          if (events) {
            for (const event of events) {
              eventList.push({
                summary: event.summary,
                description: event.description,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
              });
            }
          }
        }
      }

      // response.send(eventList); */

    } catch (e) {
      console.error(e);
      response.status(e.code).send(e.message);
    }

  });
