export interface IClubManagement {
  assignedMember?: string;
  assignedPosition?: string;
  startDate: {
    seconds: number;
    nanoseconds: number;
  };
  endDate?: {
    seconds: number;
    nanoseconds: number;
  };
}
