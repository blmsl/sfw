import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditEventsComponent } from './match-edit-events.component';

describe('MatchEditEventsComponent', () => {
  let component: MatchEditEventsComponent;
  let fixture: ComponentFixture<MatchEditEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEditEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
