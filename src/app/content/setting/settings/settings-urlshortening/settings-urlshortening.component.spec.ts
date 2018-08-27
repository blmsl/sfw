import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUrlshorteningComponent } from './settings-urlshortening.component';

describe('SettingsUrlshorteningComponent', () => {
  let component: SettingsUrlshorteningComponent;
  let fixture: ComponentFixture<SettingsUrlshorteningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsUrlshorteningComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsUrlshorteningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
