import * as birthday    from './birthday';
import * as motW        from './member-of-the-week';
import * as memberDeleted from './member-deleted';

export const birthdayReminderCron = birthday.birthdayReminderCron;
export const memberOfTheWeekCron = motW.memberOfTheWeekCron;
export const memberDeletedCron = memberDeleted.memberDeleted;
