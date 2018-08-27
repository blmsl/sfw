import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDowntimeComponent } from './settings-downtime.component';

describe('SettingsDowntimeComponent', () => {
  let component: SettingsDowntimeComponent;
  let fixture: ComponentFixture<SettingsDowntimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDowntimeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDowntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
