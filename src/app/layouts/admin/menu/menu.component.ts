import {
  Component,
  Input, OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItemsService } from '../../../shared/services/menu/menu-items.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/index';
import { IUser } from '../../../shared/interfaces/user/user.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [MenuItemsService]
})
export class MenuComponent implements OnInit {

  @Input() options: any;

  public memberImage: Observable<IMediaItem>;
  public user$: Observable<IUser>;

  constructor(public menuService: MenuItemsService,
    public authService: AuthService,
    private mediaItemService: MediaItemService,
    public translate: TranslateService) {
    this.user$ = authService.user$;
  }

  ngOnInit() {
    this.user$.subscribe((user: IUser) => {
      if (!this.memberImage) {
        this.memberImage = this.mediaItemService.getCurrentImage(['users', 'profile'], user.id, '/assets/sfw/placeholder/avatar_male.jpg');
      }
    });
  }

}
