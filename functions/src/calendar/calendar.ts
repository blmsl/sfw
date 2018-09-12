import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from 'moment';

const { google } = require('googleapis');

const GOOGLE_API_KEY = functions.config().google.calendar.key;
const calendar = google.calendar({ version: 'v3', auth: GOOGLE_API_KEY });

const db = admin.firestore();

const currentDate = moment();
const timeMin = currentDate.subtract(1, 'month').toISOString();
const timeMax = currentDate.add(2, 'month').toISOString();

export const getGoogleCalendarEvents = functions.region('europe-west1').https.onRequest(async (req, resp) => {

  const eventList: Promise<any>[] = [];

  try {
    const applicationRef = db.collection('applications');
    const activeAppRef = await applicationRef.where('isCurrentApplication', '==', true).get();
    if (activeAppRef.size === 0) {
      resp.send('No current Application found');
    }

    const promises: Promise<any>[] = [];
    for (let cal of activeAppRef.docs[0].data().assignedCalendars) {
      promises.push(getEventList(cal.link));
    }

    const snapshots = await Promise.all(promises);

    snapshots.forEach(snap => {
      console.log(snap.data().items);
      eventList.push(snap.data().items);
    });

    return resp.send([]);

  } catch (error) {
    console.log(error);
    return resp.status(500).send(error);
  }

});

function getEventList(cal: string): Promise<any> {
  return calendar.events.list({
    calendarId: cal,
    timeMin: timeMin,
    timeMax: timeMax,
    // maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime'
  });
}
