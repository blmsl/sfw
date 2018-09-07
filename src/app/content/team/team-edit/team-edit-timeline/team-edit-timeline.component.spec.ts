import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditTimelineComponent } from './team-edit-timeline.component';

describe('TeamEditTimelineComponent', () => {
  let component: TeamEditTimelineComponent;
  let fixture: ComponentFixture<TeamEditTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamEditTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
