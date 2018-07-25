'use strict';
/*
// https://github.com/firebase/functions-samples/tree/master/crashlytics-integration/slack-notifier

import * as functions from 'firebase-functions';
import * as rp from 'request-promise';

// Helper function that posts to Slack about the new issue
const notifySlack = (slackMessage) => {
  // See https://api.slack.com/docs/message-formatting on how
  // to customize the message payload
  return rp({
    method: 'POST',
    uri: functions.config().slack.webhook_url,
    body: {
      text: slackMessage,
    },
    json: true,
  });
};

exports.postOnNewIssue = functions.crashlytics.issue().onNew((issue) => {
  const issueId = issue.issueId;
  const issueTitle = issue.issueTitle;
  const appName = issue.appInfo.appName;
  const appPlatform = issue.appInfo.appPlatform;
  const latestAppVersion = issue.appInfo.latestAppVersion;

  const slackMessage = `<!here|here> There is a new issue - ${issueTitle} (${issueId}) ` +
    `in ${appName}, version ${latestAppVersion} on ${appPlatform}`;

  return notifySlack(slackMessage).then(() => {
    return console.log(`Posted new issue ${issueId} successfully to Slack`);
  });
});

exports.postOnRegressedIssue = functions.crashlytics.issue().onRegressed((issue) => {
  const issueId = issue.issueId;
  const issueTitle = issue.issueTitle;
  const appName = issue.appInfo.appName;
  const appPlatform = issue.appInfo.appPlatform;
  const latestAppVersion = issue.appInfo.latestAppVersion;
  const resolvedTime = issue.resolvedTime;

  const slackMessage = `<!here|here> There is a regressed issue ${issueTitle} (${issueId}) ` +
    `in ${appName}, version ${latestAppVersion} on ${appPlatform}. This issue was previously ` +
    `resolved at ${new Date(resolvedTime).toString()}`;

  return notifySlack(slackMessage).then(() => {
    return console.log(`Posted regressed issue ${issueId} successfully to Slack`);
  });
});

exports.postOnVelocityAlert = functions.crashlytics.issue().onVelocityAlert((issue) => {
  const issueId = issue.issueId;
  const issueTitle = issue.issueTitle;
  const appName = issue.appInfo.appName;
  const appPlatform = issue.appInfo.appPlatform;
  const latestAppVersion = issue.appInfo.latestAppVersion;
  const crashPercentage = issue.velocityAlert.crashPercentage;

  const slackMessage = `<!here|here> There is an issue ${issueTitle} (${issueId}) ` +
    `in ${appName}, version ${latestAppVersion} on ${appPlatform} that is causing ` +
    `${parseFloat(crashPercentage).toFixed(2)}% of all sessions to crash.`;

  return notifySlack(slackMessage).then(() => {
    console.log(`Posted velocity alert ${issueId} successfully to Slack`);
  });
}); */
