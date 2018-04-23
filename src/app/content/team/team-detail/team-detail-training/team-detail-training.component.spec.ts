import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTrainingComponent } from './team-detail-training.component';

describe('TeamDetailTrainingComponent', () => {
  let component: TeamDetailTrainingComponent;
  let fixture: ComponentFixture<TeamDetailTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailTrainingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
