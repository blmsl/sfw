'use strict';

// add sendgrid to env: firebase functions:config:set sendgrid.key=KEY
// firebase deploy only-functions
// firebase login:ci
// add cronJobs via gcloud console:
// gcloud app deploy app.yaml cron.yaml php.yaml --version=2
// https://console.cloud.google.com/logs
// gcloud app browse
// https://console.cloud.google.com/functions/list?project=sfw-dev
// dev_appserver.py D:\sfw\functions-cron\appengine\app.yaml D:\sfw\functions-cron\appengine\php.yaml D:\sfw\functions-cron\appengine\dispatch.yaml --port=9090

import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';

admin.initializeApp();

import * as user from './user/index';
export const newUserCreation = user.userCreated;
// export const onUserDelete = user.userDeleted;
// export const userPresence = user.userPresence;

// import * as shortener from './url-shortener/index';
// export const urlShortener = shortener.shortener;

import * as media from './media';
export const removeMediaItemCron = media.deleteMediaCron;

import * as member from './member/index';
export const birthdayReminder = member.birthdayReminderCron;
export const memberOfTheWeekCron = member.memberOfTheWeekCron;
export const dfbMemberCron = member.dfbMemberCron;
export const driveMemberCron = member.driveMemberCron;

// import * as team from './team/index';
// export const spielplanCron = team.spielplanCron;
// export const teamCron = team.teamOfTheMonthCron;
// export const wettbewerbeCron = team.wettbewerbeCron;
// export const deleteMatchCron = team.deleteMatchCron;
