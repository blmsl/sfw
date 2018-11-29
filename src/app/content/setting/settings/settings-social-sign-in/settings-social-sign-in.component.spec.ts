import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSocialSignInComponent } from './settings-social-sign-in.component';

describe('SettingsSocialSignInComponent', () => {
  let component: SettingsSocialSignInComponent;
  let fixture: ComponentFixture<SettingsSocialSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSocialSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSocialSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
