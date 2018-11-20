import * as functions from 'firebase-functions';
// const request = require('request-promise');

const TWITTER_API = functions.config().twitter;
console.log(TWITTER_API);

export const publishArticleToTwitter = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 7 })
  .pubsub.topic('article-publish')
  .onPublish(async () => {

    try {
      console.log(123);

    } catch (e) {
      console.log(e);
      return e;
    }

  });
