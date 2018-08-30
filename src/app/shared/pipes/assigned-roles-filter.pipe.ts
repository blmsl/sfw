import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/user/user.interface';

@Pipe({
  name: 'assignedRolesFilter'
})
export class AssignedRolesFilterPipe implements PipeTransform {

  transform(users: IUser[], roles: string[]): IUser[] {

    if(!roles || roles.length === 0) return users;

    return users.filter((user: IUser) => {
      for(let i = 0; i < roles.length; i++){
        if(user['assignedRoles'][roles[i]]) {
          return user['assignedRoles'][roles[i]];
        }
      }
    });

  }

}
