'use strict';

// add sendgrid to env: firebase functions:config:set sendgrid.key=KEY
// npm run deploy (update functions)
// firebase login:ci
// add cronJobs via gcloud console:
// gcloud app deploy app.yaml cron.yaml php.yaml --version=2
// https://console.cloud.google.com/logs
// gcloud app browse
// https://console.cloud.google.com/functions/list?project=sf-winterbach
// https://sf-winterbach.appspot.com

import * as admin from 'firebase-admin';

admin.initializeApp({
  storageBucket: "sf-winterbach.appspot.com"
});


import * as user from './user/index';
export const newUserCreation = user.userCreated;
export const onUserDelete = user.userDeleted;
export const onUserDisable = user.userDisabled;
// export const userPresence = user.userPresence;

import * as calendar from './calendar/index';
export const googleCalendar = calendar.getGoogleCalendarEvents;

/*
import * as shortener from './url-shortener/index';
export const urlShortener = shortener.shortener;
*/

/*
import * as match from './match/index';
export const sendNotificationNewMatch = match.sendNotificationNewMatch;
*/

import * as media from './media/index';
export const removeMediaItemCron = media.deleteMediaCron;
/*
export const generateThumbnailCron = media.generateThumbnailCron;
*/

import * as member from './member/index';
export const birthdayReminder = member.birthdayReminderCron;
export const memberOfTheWeekCron = member.memberOfTheWeekCron;

/*
export const dfbMemberWriteCron = member.dfbMemberWrite;
export const dfbMemberDeleteCron = member.dfbMemberDelete;
export const dfbMemberUpdateCron = member.dfbMemberUpdate;
export const driveMemberWriteCron = member.driveMemberWrite;
export const driveMemberDeleteCron = member.driveMemberDelete;
export const driveMemberUpdateCron = member.driveMemberUpdate;
*/

import * as team from './team/index';
export const teamOfTheMonthCron = team.teamOfTheMonthCron;
