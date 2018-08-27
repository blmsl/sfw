import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCalendarsComponent } from './settings-calendars.component';

describe('SettingsCalendarsComponent', () => {
  let component: SettingsCalendarsComponent;
  let fixture: ComponentFixture<SettingsCalendarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCalendarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
