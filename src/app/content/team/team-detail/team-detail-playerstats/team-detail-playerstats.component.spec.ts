import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailPlayerstatsComponent } from './team-detail-playerstats.component';

describe('TeamDetailPlayerstatsComponent', () => {
  let component: TeamDetailPlayerstatsComponent;
  let fixture: ComponentFixture<TeamDetailPlayerstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailPlayerstatsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailPlayerstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
