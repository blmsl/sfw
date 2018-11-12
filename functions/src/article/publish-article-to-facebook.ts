import * as functions from 'firebase-functions';

const cloudrail = require("cloudrail-si");
const CLOUDRAIL_API_KEY = functions.config().cloudrail.key;
cloudrail.Settings.setKey(CLOUDRAIL_API_KEY);

const FACEBOOK_API = functions.config().facebook;

function redirectReceiver() {
  return null;
}

const social = new cloudrail.services.FacebookPage(
  redirectReceiver,
  FACEBOOK_API.apptitle,
  FACEBOOK_API.appid,
  FACEBOOK_API.appsecret,
  "",
  ""
);


export const publishArticleToFacebook = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 7 })
  .pubsub.topic('article-publish')
  .onPublish(async () => {

    social.postUpdate("Hello from CloudRail", (err) => {
      if (err) throw err;
      console.log("Update posted");
    });

    /* let fileStream = fs.createReadStream("video.mp4");
    let size = fs.statSync("video.mp4").size;
    social.postVideo("This is a test video", fileStream, size, "video/mp4", (err) => {
      if (err) throw err;
      console.log("Video posted");
    }); */

  });
