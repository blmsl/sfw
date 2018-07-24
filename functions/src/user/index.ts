import * as createdUser from './user-created';
export const userCreated = createdUser.userCreated;

import * as deletedUser from './user-deleted';
export const userDeleted = deletedUser.userDeleted;

import * as presenceUser from './user-presence';
export const userPresence = presenceUser.onUserStatusChanged;
