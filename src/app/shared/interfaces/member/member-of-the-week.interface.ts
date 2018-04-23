export interface IMemberOfTheWeek {
  title: {
    type: string;
    assignedMemberId: string;
    week: string;
  }[];
}
