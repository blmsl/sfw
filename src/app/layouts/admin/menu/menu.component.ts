import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItemsService } from '../../../shared/services/menu/menu-items.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [MenuItemsService]
})
export class MenuComponent {

  constructor(public menuService: MenuItemsService,
    public authService: AuthService,
    public translate: TranslateService) {
  }

}
