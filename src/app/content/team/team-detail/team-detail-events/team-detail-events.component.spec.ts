import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailEventsComponent } from './team-detail-events.component';

describe('TeamDetailEventsComponent', () => {
  let component: TeamDetailEventsComponent;
  let fixture: ComponentFixture<TeamDetailEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailEventsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
