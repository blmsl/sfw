import { IBadgeItem } from './badge-item.interface';
import { IChildrenItems } from './children-items.interface';

export interface IMenuItem {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: IBadgeItem[];
  children?: IChildrenItems[];
  minRole?: string;
}
