import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSocialNetworksComponent } from './settings-social-networks.component';

describe('SettingsSocialNetworksComponent', () => {
  let component: SettingsSocialNetworksComponent;
  let fixture: ComponentFixture<SettingsSocialNetworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSocialNetworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSocialNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
