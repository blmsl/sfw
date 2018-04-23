export interface IClubManagement {
  assignedMember?: string;
  assignedPosition?: string;
  // ordering: number;
  startDate: Date;
  endDate?: Date | '';
}
