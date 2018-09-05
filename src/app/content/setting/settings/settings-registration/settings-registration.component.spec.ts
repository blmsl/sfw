import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsRegistrationComponent } from './settings-registration.component';

describe('SettingsRegistrationComponent', () => {
  let component: SettingsRegistrationComponent;
  let fixture: ComponentFixture<SettingsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsRegistrationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
