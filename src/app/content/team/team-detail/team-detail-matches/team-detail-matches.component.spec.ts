import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailMatchesComponent } from './team-detail-matches.component';

describe('TeamDetailMatchesComponent', () => {
  let component: TeamDetailMatchesComponent;
  let fixture: ComponentFixture<TeamDetailMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailMatchesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
