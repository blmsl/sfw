import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isMemberInSubstitutesListFilter'
})
export class IsMemberInSubstitutesListFilterPipe implements PipeTransform {

  transform(memberIds: string[], assignedPositions: {
    memberId: string,
  }[]): string[] {

    if (!memberIds && !assignedPositions)
      return;

    if (!assignedPositions)
      return memberIds;

    return memberIds.filter((memberId: string) => {

      let foundMember: boolean = false;

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
