import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailPositionsComponent } from './team-detail-positions.component';

describe('TeamDetailPositionsComponent', () => {
  let component: TeamDetailPositionsComponent;
  let fixture: ComponentFixture<TeamDetailPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailPositionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
