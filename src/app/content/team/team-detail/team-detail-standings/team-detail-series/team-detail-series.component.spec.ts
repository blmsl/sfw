import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSeriesComponent } from './team-detail-series.component';

describe('TeamDetailSeriesComponent', () => {
  let component: TeamDetailSeriesComponent;
  let fixture: ComponentFixture<TeamDetailSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailSeriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
