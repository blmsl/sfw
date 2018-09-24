'use strict';

// firebase functions:config:set bitly.access_token=XXXXXXXXXXXXX

const functions = require('firebase-functions');
const BitlyClient = require('bitly');

const bitly = BitlyClient(functions.config().bitly.access_token);

// Shorten URL written to /links/{linkID}.
export const urlShortener = functions
  .region('europe-west1')
  .runWith({ memory: '128MB', timeoutSeconds: 5 })
  .database.ref('/links/{linkID}').onCreate(async (snap) => {
    const originalUrl = snap.val();
    const response = await bitly.shorten(originalUrl);
    return snap.ref.set({
      original: originalUrl,
      short: response.data.url,
    })
  });
