import * as functions from 'firebase-functions';

const cloudrail = require("cloudrail-si");
const CLOUDRAIL_API_KEY = functions.config().cloudrail.key;
cloudrail.Settings.setKey(CLOUDRAIL_API_KEY);

const TWITTER_API = functions.config().twitter;

function redirectReceiver() {
  return 'localhost';
}

const twitter = new cloudrail.services.Twitter(redirectReceiver,
  TWITTER_API.apikey,
  TWITTER_API.apisecret,
  "");

export const publishArticleToTwitter = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 7 })
  .pubsub.topic('article-publish')
  .onPublish(() => {

    try {
      const test = twitter.postUpdate('Hello!', (err, res) => {
        if(err) console.log(err);
        console.log(res);
      });
      console.log(test);
      return test;
    }catch (e) {
      console.log(e);
      return e;
    }

  });
