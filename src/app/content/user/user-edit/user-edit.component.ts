import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user: IUser;
  public form: FormGroup;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.users.edit.photoTitle'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['users', 'profile'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: IUser }) => {
      this.user = data.user;
      this.uploaderOptions.itemId = this.user.id;
      this.uploaderConfig.placeHolderImage =
        this.user.gender === 'female'
          ? '/assets/sfw/placeholder/avatar_female.jpg'
          : '/assets/sfw/placeholder/avatar_male.jpg';
    });
  }

  saveUser(changes: IUser) {
    const updatedUser = Object.assign({}, this.user, changes);
    if (JSON.stringify(this.user) !== JSON.stringify(updatedUser)) {
      this.userService.updateUser(this.user.id, updatedUser).then(
        () => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
        (error: any) => this.alertService.showSnackBar('error', error)
      );
    }
  }

  removeUser(user: IUser) {
    this.userService.removeUser(user).then(
      () => this.alertService.success('general.users.edit.deleted', false),
      (error: any) => this.alertService.error(error.message));
  }

  uploadCompleted() {
    this.alertService.showSnackBar('success', 'general.users.edit.photoUploaded');
  }

}
