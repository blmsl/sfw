'use strict';

// add sendgrid to env: firebase functions:config:set sendgrid.key=KEY
// npm run deploy (update functions)
// firebase login:ci
// add cronJobs via gcloud console:
// gcloud app deploy app.yaml cron.yaml php.yaml --version=1
// https://console.cloud.google.com/logs
// gcloud app browse
// https://console.cloud.google.com/functions/list?project=sf-winterbach
// https://sf-winterbach.appspot.com

import * as admin from 'firebase-admin';

admin.initializeApp({
  storageBucket: "sf-winterbach.appspot.com"
});

import * as calendar from './calendar/index';
import * as match from './match/index';
import * as media from './media/index';
import * as member from './member/index';
import * as team from './team/index';
import * as user from './user/index';

export const googleCalendar = calendar.getGoogleCalendarEvents;
export const matchDeleted = match.matchDeleteCron;
export const removeMediaItem = media.deleteMediaCron;
export const birthdayReminder = member.birthdayReminderCron;
export const memberDeleted = member.memberDeletedCron;
export const memberOfTheWeek = member.memberOfTheWeekCron;
export const teamOfTheMonth = team.teamOfTheMonthCron;
export const teamDeleted = team.teamDeletedCron;
export const newUserCreation = user.userCreated;
export const onUserDelete = user.userDeleted;
export const onUserDisable = user.userDisabled;
