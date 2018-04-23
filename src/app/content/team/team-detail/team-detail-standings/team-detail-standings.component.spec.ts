import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailStandingsComponent } from './team-detail-standings.component';

describe('TeamDetailStandingsComponent', () => {
  let component: TeamDetailStandingsComponent;
  let fixture: ComponentFixture<TeamDetailStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailStandingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
