'use strict';

import * as google from 'googleapis';
import * as functions from 'firebase-functions';

const urlshortener = google.google.urlshortener({
  version: 'v1',
  auth: functions.config().google ? functions.config().google.api_key : undefined,
});

// Shorten URL written to /links/{linkID}.
export const urlShortener = functions.database.ref('/links/{linkID}').onCreate((snap, context) => {
  const originalUrl = snap.val();
  return new Promise((resolve, reject) => {
    urlshortener.url.insert({ resource: { longUrl: originalUrl } }, (err: any, response: any) => {
      if (err) {
        reject(err);
      } else {
        snap.ref.set({
          original: originalUrl,
          short: response.data.id,
        })
          .then(() => resolve())
          .catch((error: any) => reject(error));
      }
    });
  });
});
