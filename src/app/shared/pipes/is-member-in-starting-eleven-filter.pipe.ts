import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'isMemberInStartingElevenFilter'
})
export class IsMemberInStartingElevenFilterPipe implements PipeTransform {

  transform(memberIds: string[], assignedPositions: {
    memberId: string,
    position: string
  }[]): string[] {

    if (!memberIds && !assignedPositions) {
      return;
    }

    if (!assignedPositions) {
      return memberIds;
    }

    return memberIds.filter((memberId: string) => {

      let foundMember = false;

      assignedPositions.filter((assignedPosition: {
        memberId: string,
        position: string
      }) => {
        if (assignedPosition.memberId === memberId) {
          foundMember = true;
        }
      });

      if (!foundMember) {
        return memberId;
      }
    });
  }

}
