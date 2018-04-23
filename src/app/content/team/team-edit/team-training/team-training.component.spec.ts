import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTrainingComponent } from './team-training.component';

describe('TeamTrainingComponent', () => {
  let component: TeamTrainingComponent;
  let fixture: ComponentFixture<TeamTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamTrainingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
