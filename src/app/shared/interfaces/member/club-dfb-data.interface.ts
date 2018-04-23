export interface IClubDFBData {
  passNumber?: string;
  ageGroup?: string;
  eligibleForOfficialMatches?: string;
  eligibleForFriendlyMatches?: string;
  signOut?: string;
  playerStatus?: boolean;
  guestPlayer?: {
    guestRight?: string;
    season: string;
    type: string;
  };
  passPrint?: string;
  allowedToPlay?: string;
}
