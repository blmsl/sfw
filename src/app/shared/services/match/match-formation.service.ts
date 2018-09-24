import { Injectable } from '@angular/core';
import { ICoord } from '../../interfaces/match/coord.interface';
import { IFormation } from '../../interfaces/match/formation.interface';

@Injectable()
export class MatchFormationService {

  playerPositions: ICoord[] = [];

  constructor() {
  }

  getFormationPositions(formation: IFormation): ICoord[] {
    for (let i = 0; i < formation.positionList.length; i++) {
      this.playerPositions.push(formation.positionList[i]);
    }
    return this.playerPositions;
  }

  getFormations(): IFormation[] {
    return this.formations;
  }

  private formations: IFormation[] = [
    /*{
     'title': '4-4-2 (2)',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList':
     [
     ]
     },
     {
     'title': '4-4-2 (1)',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList':
     [
     ]
     },
     {
     'title': '4-2-4',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList':
     [
     ]
     },*/
    {
      'title': '3-4-3',
      'mainFormation': 11,
      'maxSubstitutes': 7,
      'positionList': [
        { x: 0, y: 2 },

        { x: 1, y: 0 },
        { x: 1, y: 2 },
        { x: 1, y: 4 },


        { x: 2, y: 1 },
        { x: 2, y: 3 },

        { x: 3, y: 0 },
        // { x: 3, y: 2 },
        { x: 3, y: 4 },

        { x: 5, y: 1 },
        { x: 5, y: 3 }
      ]
    },
    /*
     {
     'title': '4-3-3',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': [
     ]
     },
     {
     'title': '5-3-2',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': [
     ]
     },*/
    {
      'title': '3-5-2',
      'mainFormation': 11,
      'maxSubstitutes': 3,
      'positionList': [
        { x: 0, y: 2 },

        { x: 1, y: 0 },
        { x: 1, y: 2 },
        { x: 1, y: 4 },


        { x: 2, y: 1 },
        { x: 2, y: 3 },

        { x: 3, y: 0 },
        { x: 3, y: 2 },
        { x: 3, y: 4 },

        { x: 5, y: 1 },
        { x: 5, y: 3 }
      ]
    }
    /*{
     'title': '5-4-1',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': [
     ]
     },
     {
     'title': '4-5-1',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': ['']
     },
     {
     'title': '4-2-3-1',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': ['']
     },
     {
     'title': '4-3-2-1',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': ['']
     },
     {
     'title': '4-1-4-1',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': ['']
     },
     {
     'title': '3-3-4',
     'mainFormation': 11,
     'maxSubstitutes': 7,
     'positionList': ['']
     },
     {
     'title': '3-3-1-3',
     'mainFormation': 11,
     'maxSubstitutes': 7, 'positionList': ['']
     },
     {
     'title': '4-2-2-2',
     'mainFormation': 11,
     'maxSubstitutes': 7, 'positionList': ['']
     } */
  ];
}
