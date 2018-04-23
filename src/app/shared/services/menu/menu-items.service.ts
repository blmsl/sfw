import { Injectable } from '@angular/core';
import { IMenuItem } from '../../interfaces/menu/menu-item.interface';
import { MENUITEMS } from '../../config/menu.config';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

@Injectable()
export class MenuItemsService {

  getAll(): IMenuItem[] {
    return MENUITEMS;
  }

}
