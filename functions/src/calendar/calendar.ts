import * as functions from 'firebase-functions';

const { google } = require('googleapis');

const calendar = google.calendar({ version: 'v3' });
/*
const cors = require('cors')({
  origin: true
});*/

export const getGoogleCalendarEvents = functions.region('europe-west1').https.onRequest((req, resp) => {


  return calendar.events.list({
    calendarId: '41q3u1q8pfh26dm1lpkuh7lsrs@group.calendar.google.com'
  }, (err, res) => {
    if (err)
      return resp.status(401).send(err.message);

    return resp.status(200).send(res.json());
  });

});
