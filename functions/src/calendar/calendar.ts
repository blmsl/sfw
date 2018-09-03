import * as functions from 'firebase-functions';

const { google } = require('googleapis');

const cors = require('cors')({
  origin: true
});

const calendarId = '41q3u1q8pfh26dm1lpkuh7lsrs@group.calendar.google.com';

export const getGoogleCalendarEvents = functions.region('europe-west1')
// .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .https.onRequest((req, resp) => {

    const cal = google.calendar({ version: 'v3' });
    cal.events.list({
      calendarId: '41q3u1q8pfh26dm1lpkuh7lsrs@group.calendar.google.com'
    }, (err, res) => {
      if (err) {
        return res.status(400).send(err);
      }

      if (res) {
        const events = res.data.items;
        return res.status(200).send(events);
      }
      return res.status(404).send();
    });

  });
