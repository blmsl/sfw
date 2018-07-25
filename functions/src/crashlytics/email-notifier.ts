/*

'use strict';

import * as functions from 'firebase-functions';

let firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || '');
console.log(firebaseConfig);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendOnNewIssue = functions.crashlytics.issue().onNew((issue) => {
  const issueId = issue.issueId;
  const issueTitle = issue.issueTitle;
  const appName = issue.appInfo.appName;
  const appId = issue.appInfo.appId;
  const appPlatform = issue.appInfo.appPlatform;
  const latestAppVersion = issue.appInfo.latestAppVersion;
  const createTime = issue.createTime;

  const emailDetails = {
    to: functions.config().email.destination_email,
    from: functions.config().email.from_email,
    subject: `${appName} on ${appPlatform} has a new issue`,
    html: `<h2>${appName} on ${appPlatform} has a new issue!</h2>
        <p>App Name: ${appName}</p>
        <p>App Id: ${appId}</p>
        <p>Platform: ${appPlatform}</p>
        <p>Version: ${latestAppVersion}</p>
        <p>Issue Id: ${issueId}</p>
        <p>Issue Title: ${issueTitle}</p>
        <p>Creation Time: ${createTime}</p>`,
  };

  return sgMail.send(emailDetails).then(() => {
    return console.log('Successfully sent new issue email');
  }).catch((error) => {
    console.error(error.toString());
  });
});

exports.sendOnRegressedIssue = functions.crashlytics.issue().onRegressed((issue) => {
  const issueId = issue.issueId;
  const issueTitle = issue.issueTitle;
  const appName = issue.appInfo.appName;
  const appId = issue.appInfo.appId;
  const appPlatform = issue.appInfo.appPlatform;
  const latestAppVersion = issue.appInfo.latestAppVersion;
  const createTime = issue.createTime;
  const resolvedTime = issue.resolvedTime;

  const emailDetails = {
    to: functions.config().email.destination_email,
    from: functions.config().email.from_email,
    subject: `${appName} on ${appPlatform} has a regressed issue`,
    html: `<h2>${appName} on ${appPlatform} has a regressed issue!</h2>
        <p>App Name: ${appName}</p>
        <p>App Id: ${appId}</p>
        <p>Platform: ${appPlatform}</p>
        <p>Version: ${latestAppVersion}</p>
        <p>Issue Id: ${issueId}</p>
        <p>Issue Title: ${issueTitle}</p>
        <p>Creation Time: ${createTime}</p>
        <p>Originally Resolved On: ${new Date(resolvedTime).toString()}</p>`,
  };

  return sgMail.send(emailDetails).then(() => {
    return console.log('Successfully sent regressed issue email');
  }).catch((error) => {
    console.error(error.toString());
  });
});

exports.sendOnVelocityAlert = functions.crashlytics.issue().onVelocityAlert((issue) => {
  const issueId = issue.issueId;
  const issueTitle = issue.issueTitle;
  const appName = issue.appInfo.appName;
  const appId = issue.appInfo.appId;
  const appPlatform = issue.appInfo.appPlatform;
  const latestAppVersion = issue.appInfo.latestAppVersion;
  const createTime = issue.createTime;
  const crashPercentage = issue.velocityAlert.crashPercentage;
  const crashes = issue.velocityAlert.crashes;

  const emailDetails = {
    to: functions.config().email.destination_email,
    from: functions.config().email.from_email,
    subject: `${appName} on ${appPlatform} has a velocity alert!`,
    html: `<h2>${appName} on ${appPlatform} has a velocity alert!</h2>
        <h3>This issue is causing ${parseFloat(crashPercentage).toFixed(2)}% of all sessions to crash</h3>
        <p>App Name: ${appName}</p>
        <p>App Id: ${appId}</p>
        <p>Platform: ${appPlatform}</p>
        <p>Version: ${latestAppVersion}</p>
        <p>Issue Id: ${issueId}</p>
        <p>Issue Title: ${issueTitle}</p>
        <p>Creation Time: ${createTime}</p>
        <p># of Total Crashes: ${crashes.toString()}</p>`,
  };

  return sgMail.send(emailDetails).then(() => {
    return console.log('Successfully sent velocity alert email');
  }).catch((error) => {
    console.error(error.toString());
  });
}); */
