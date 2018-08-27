import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailEventsComponent } from './match-detail-events.component';

describe('MatchDetailEventsComponent', () => {
  let component: MatchDetailEventsComponent;
  let fixture: ComponentFixture<MatchDetailEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchDetailEventsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
