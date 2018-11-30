import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IApplication } from '../../../../shared/interfaces/application.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISocialNetwork } from '../../../../shared/interfaces/social-network.interface';

@Component({
  selector: 'settings-social-networks',
  templateUrl: './settings-social-networks.component.html',
  styleUrls: ['./settings-social-networks.component.scss']
})
export class SettingsSocialNetworksComponent implements OnInit {

  @Input() application: IApplication;
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      socialNetworks: this.initSocialNetworks()
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: ISocialNetwork[]) => {
      if (this.form.valid) {
        this.application = Object.assign({}, this.application, changes);
        this.saveApplication.emit(this.application);
      }
    });
  }

  initSocialNetworks(): FormArray {
    const formArray: FormArray = this.fb.array([]);
    if (this.application.socialNetworks && this.application.socialNetworks.length > 0) {
      this.application.socialNetworks.forEach((socialNetwork: ISocialNetwork) => {
        formArray.push(this.initSocialNetwork(socialNetwork));
      });
    }
    return formArray;
  }

  initSocialNetwork(socialNetwork?: ISocialNetwork): FormGroup {
    return this.fb.group({
      title: [socialNetwork ? socialNetwork.title : '', [Validators.required]],
      isEnabled: [socialNetwork ? socialNetwork.isEnabled : false],
      appId: [socialNetwork ? socialNetwork.appId : '', [Validators.required]],
      apiKey: [socialNetwork ? socialNetwork.apiKey : ''],
      appSecret: [socialNetwork ? socialNetwork.appSecret : '', [Validators.required]],
      accessToken: [socialNetwork ? socialNetwork.accessToken : '', [Validators.required]],
      accessTokenSecret: [socialNetwork ? socialNetwork.accessTokenSecret : '']
    });
  }

  addSocialNetwork(): void {
    const control = this.form.get('socialNetworks') as FormArray;
    control.push(this.initSocialNetwork());
  }

  removeSocialNetwork(i: number): void {
    const control = this.form.get('socialNetworks') as FormArray;
    control.removeAt(i);
  }

}
