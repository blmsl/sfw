import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailCompetitionsComponent } from './team-detail-competitions.component';

describe('TeamDetailCompetitionsComponent', () => {
  let component: TeamDetailCompetitionsComponent;
  let fixture: ComponentFixture<TeamDetailCompetitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailCompetitionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
