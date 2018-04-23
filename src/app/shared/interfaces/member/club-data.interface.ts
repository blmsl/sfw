import { IMemberState } from './member-state.interface';

export interface IClubData {
  status?: number | string | IMemberState;   //
  payment?: number;                         //
  joined?: string;                          //
  left?: string;                            //
  assignedClub?: string;                    //
  positionsInClub?: string;                 //
}

// ToDo: Positions in Club
