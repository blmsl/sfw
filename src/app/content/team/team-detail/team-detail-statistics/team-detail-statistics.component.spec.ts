import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailStatisticsComponent } from './team-detail-statistics.component';

describe('TeamDetailStatisticsComponent', () => {
  let component: TeamDetailStatisticsComponent;
  let fixture: ComponentFixture<TeamDetailStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
