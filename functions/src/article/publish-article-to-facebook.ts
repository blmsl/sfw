import * as functions from 'firebase-functions';
const request = require('request-promise');

const FACEBOOK_API = functions.config().facebook;

export const publishArticleToFacebook = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 7 })
  .pubsub.topic('article-publish')
  .onPublish(async () => {

    try {
      const postTextOptions = {
        method: 'POST',
        uri: `https://graph.facebook.com/v3.2/sfwinterbach/feed`,
        qs: {
          access_token: FACEBOOK_API.accesstoken,
          message: 'Hello world!',
          scope: 'manage_pages,publish_stream'
        },
      };
      request(postTextOptions, { scope: 'manage_pages,publish_stream' });

    } catch (e) {
      console.log(e);
      return e;
    }

  });
