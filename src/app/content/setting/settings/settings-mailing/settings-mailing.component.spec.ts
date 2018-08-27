import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMailingComponent } from './settings-mailing.component';

describe('SettingsMailingComponent', () => {
  let component: SettingsMailingComponent;
  let fixture: ComponentFixture<SettingsMailingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsMailingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
