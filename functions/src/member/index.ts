import * as birthday from './birthday';
import * as motW from './member-of-the-week';
import * as dfb from './dfb-import';
import * as drive from './drive-import';

export const birthdayReminderCron = birthday.birthdayReminderCron;
export const memberOfTheWeekCron = motW.memberOfTheWeekCron;

export const dfbMemberWrite = dfb.dfbMemberWriteCron;
export const dfbMemberDelete = dfb.dfbMemberDeleteCron;
export const dfbMemberUpdate = dfb.dfbMemberUpdateCron;

export const driveMemberWrite = drive.driveMemberWriteCron;
export const driveMemberDelete = drive.driveMemberDeleteCron;
export const driveMemberUpdate = drive.driveMemberUpdateCron;
export const driveDeleteDb = drive.driveDeleteDbCron;
